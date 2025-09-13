// SRM Marché Application with Working Image Upload
// Made by Code Cubs - Aman & Amrit for Hyperthon-2025

class SRMMarche {
    constructor() {
        this.currentUser = null;
        this.allItems = [];
        this.allAsks = [];
        this.users = [];
        this.wishlist = [];
        this.categories = [];
        this.campusLocations = [];
        this.uploadedImages = []; // FIXED: Initialize uploaded images array

        // Using your working JSONBin credentials
        this.API_CONFIG = {
            baseUrl: 'https://api.jsonbin.io/v3/b',
            binId: '68c5d34443b1c97be9420e0d',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': '$2a$10$adLFIO2OD6shTDxOobR5ueuH0H/an/DtKfwcQ8skaLVkpY.VNPXPK'
            }
        };

        this.STORAGE_KEYS = {
            items: 'srm_marche_items',
            asks: 'srm_marche_asks',
            users: 'srm_marche_users'
        };

        this.isOnline = navigator.onLine;
        this.syncInProgress = false;
        this.lastSyncTime = 0;

        this.init();
    }

    init() {
        console.log('🚀 Initializing SRM Marché with Working Image Upload...');
        this.loadInitialData();
        this.setupNetworkListener();
        this.loadData();
        this.checkAuthState();
        this.setupEventListeners();
        this.setupAutoSync();
        console.log('✅ SRM Marché initialized successfully');
    }

    loadInitialData() {
        this.categories = [
            { id: 'books', name: 'Books', icon: '📚', count: 0 },
            { id: 'electronics', name: 'Electronics', icon: '💻', count: 0 },
            { id: 'furniture', name: 'Furniture', icon: '🪑', count: 0 },
            { id: 'hostel-items', name: 'Hostel Items', icon: '🏠', count: 0 },
            { id: 'bicycles', name: 'Bicycles', icon: '🚲', count: 0 },
            { id: 'study-materials', name: 'Study Materials', icon: '📝', count: 0 },
            { id: 'others', name: 'Others', icon: '📦', count: 0 }
        ];

        this.campusLocations = [
            'Academic Block',
            'Block - C Rani Lakshmi Bai',
            'Block - D Chandra Shekhar Azad',
            'Block - E Captain Lakshmi Sahgal',
            'Block - F Bhikaiji Cama',
            'Block - G Maharana Pratap',
            'Block - H Veer Savarkar',
            'Netaji Subhash Chandra Bose International Boarding House',
            'Library',
            'Cafeteria',
            'Sports Complex',
            'Main Gate Area',
            'Parking Area'
        ];

        this.populateSelectOptions();
    }

    setupNetworkListener() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            console.log('📡 Back online - syncing data...');
            this.loadData();
            this.showMessage('Back online! Syncing latest data...', 'info');
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            console.log('📴 Offline mode - will sync when back online');
        });
    }

    async loadData() {
        if (this.syncInProgress) return;

        this.syncInProgress = true;
        this.showSyncIndicator(true);

        try {
            this.loadFromLocalStorage();

            if (this.isOnline) {
                console.log('🌍 Loading data from cloud...');

                const response = await fetch(`${this.API_CONFIG.baseUrl}/${this.API_CONFIG.binId}/latest`, {
                    method: 'GET',
                    headers: this.API_CONFIG.headers
                });

                if (response.ok) {
                    const data = await response.json();
                    const cloudData = data.record;

                    if (cloudData && typeof cloudData === 'object' && cloudData.items) {
                        this.allItems = cloudData.items || this.allItems;
                        this.allAsks = cloudData.asks || this.allAsks;
                        this.users = cloudData.users || this.users;

                        this.saveToLocalStorage();
                        this.lastSyncTime = Date.now();

                        console.log(`📥 Synced from cloud: ${this.allItems.length} items, ${this.allAsks.length} asks, ${this.users.length} users`);
                    } else {
                        await this.initializeCloudData();
                    }
                } else {
                    console.warn(`API response not OK: ${response.status}`);
                    if (this.allItems.length === 0) {
                        this.initializeDemoData();
                    }
                }
            } else {
                if (this.allItems.length === 0) {
                    this.initializeDemoData();
                }
            }

            this.updateStats();
            this.renderCategories();
            this.renderItems();
            this.renderAsks();

        } catch (error) {
            console.error('❌ Cloud sync failed:', error);

            if (this.allItems.length === 0) {
                this.initializeDemoData();
                this.updateStats();
                this.renderCategories(); 
                this.renderItems();
                this.renderAsks();
            }
        } finally {
            this.syncInProgress = false;
            this.showSyncIndicator(false);
        }
    }

    initializeDemoData() {
        console.log('🔧 Initializing demo data...');

        this.users = [
            {
                id: 'demo_user_1',
                name: 'Aman',
                email: 'aman@srmist.edu.in',
                phone: '+91 9876543210',
                hostel: 'Block - C Rani Lakshmi Bai',
                verified: true,
                joinDate: '2024-09-12',
                rating: 4.8
            },
            {
                id: 'demo_user_2', 
                name: 'Amrit',
                email: 'amrit@srmist.edu.in',
                phone: '+91 9876543211',
                hostel: 'Block - D Chandra Shekhar Azad',
                verified: true,
                joinDate: '2024-09-12',
                rating: 4.9
            }
        ];

        this.allItems = [
            {
                id: 'demo_item_1',
                title: 'Data Structures & Algorithms Textbook',
                category: 'Books',
                price: 450,
                originalPrice: 799,
                condition: 'Good',
                location: 'Library',
                description: 'Perfect for CSE students preparing for exams and interviews. All chapters covered with examples.',
                images: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop&crop=face'],
                sellerId: 'demo_user_1',
                status: 'available',
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                views: 23
            },
            {
                id: 'demo_item_2',
                title: 'Study Table with Storage',
                category: 'Furniture',
                price: 2500,
                originalPrice: 4500,
                condition: 'Like New',
                location: 'Block - C Rani Lakshmi Bai',
                description: 'Wooden study table with 2 drawers. Perfect condition, selling due to room change.',
                images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'],
                sellerId: 'demo_user_2',
                status: 'available',
                createdAt: new Date(Date.now() - 172800000).toISOString(),
                views: 15
            },
            {
                id: 'demo_item_3',
                title: 'Engineering Calculator',
                category: 'Electronics',
                price: 800,
                originalPrice: 1200,
                condition: 'Good',
                location: 'Academic Block',
                description: 'Scientific calculator with all engineering functions. Battery included.',
                images: ['https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300&h=200&fit=crop'],
                sellerId: 'demo_user_1',
                status: 'available',
                createdAt: new Date(Date.now() - 259200000).toISOString(),
                views: 8
            }
        ];

        this.allAsks = [
            {
                id: 'demo_ask_1',
                title: 'Engineering Mathematics Textbook needed',
                category: 'Books',
                budget: 400,
                urgency: 'High',
                description: 'Need for upcoming semester exams. Preferably latest edition with solution manual.',
                askerId: 'demo_user_2',
                status: 'active',
                createdAt: new Date(Date.now() - 43200000).toISOString(),
                responses: []
            }
        ];

        this.saveToLocalStorage();
    }

    async initializeCloudData() {
        this.initializeDemoData();
        await this.saveData();
    }

    async saveData() {
        this.saveToLocalStorage();

        if (!this.isOnline) {
            console.log('💾 Offline - data saved locally, will sync when online');
            return false;
        }

        try {
            const dataToSave = {
                items: this.allItems,
                asks: this.allAsks,
                users: this.users,
                lastUpdated: new Date().toISOString(),
                version: Date.now()
            };

            console.log('🌍 Saving data to cloud...', dataToSave);

            const response = await fetch(`${this.API_CONFIG.baseUrl}/${this.API_CONFIG.binId}`, {
                method: 'PUT',
                headers: this.API_CONFIG.headers,
                body: JSON.stringify(dataToSave)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('✅ Data saved to cloud successfully:', responseData);
                this.lastSyncTime = Date.now();
                return true;
            } else {
                const errorText = await response.text();
                console.error(`Cloud save failed: HTTP ${response.status} - ${errorText}`);
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

        } catch (error) {
            console.error('❌ Cloud save failed:', error);
            return false;
        }
    }

    loadFromLocalStorage() {
        try {
            const savedItems = localStorage.getItem(this.STORAGE_KEYS.items);
            if (savedItems) {
                this.allItems = JSON.parse(savedItems);
                console.log(`📱 Loaded ${this.allItems.length} items from localStorage`);
            }

            const savedAsks = localStorage.getItem(this.STORAGE_KEYS.asks);
            if (savedAsks) {
                this.allAsks = JSON.parse(savedAsks);
                console.log(`📱 Loaded ${this.allAsks.length} asks from localStorage`);
            }

            const savedUsers = localStorage.getItem(this.STORAGE_KEYS.users);
            if (savedUsers) {
                this.users = JSON.parse(savedUsers);
                console.log(`📱 Loaded ${this.users.length} users from localStorage`);
            }

        } catch (error) {
            console.error('❌ Error loading from localStorage:', error);
        }
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem(this.STORAGE_KEYS.items, JSON.stringify(this.allItems));
            localStorage.setItem(this.STORAGE_KEYS.asks, JSON.stringify(this.allAsks));
            localStorage.setItem(this.STORAGE_KEYS.users, JSON.stringify(this.users));
            console.log('💾 Data saved to localStorage successfully');
        } catch (error) {
            console.error('❌ Error saving to localStorage:', error);
        }
    }

    setupAutoSync() {
        setInterval(() => {
            if (this.isOnline && !this.syncInProgress && (Date.now() - this.lastSyncTime > 10000)) {
                this.loadData();
            }
        }, 15000);

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.isOnline && !this.syncInProgress) {
                this.loadData();
            }
        });

        window.addEventListener('beforeunload', () => {
            this.saveToLocalStorage();
        });
    }

    showSyncIndicator(show) {
        const indicator = document.getElementById('syncIndicator') || this.createSyncIndicator();
        if (show) {
            indicator.classList.remove('hidden');
            indicator.innerHTML = '🔄 Syncing...';
        } else {
            indicator.classList.add('hidden');
        }
    }

    createSyncIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'syncIndicator';
        indicator.className = 'sync-indicator hidden';
        indicator.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            background: #3B82F6;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        document.body.appendChild(indicator);
        return indicator;
    }

    populateSelectOptions() {
        const categorySelects = ['itemCategory', 'askCategory', 'categoryFilter'];
        categorySelects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                while (select.children.length > 1) {
                    select.removeChild(select.lastChild);
                }

                this.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.name;
                    option.textContent = `${category.icon} ${category.name}`;
                    select.appendChild(option);
                });
            }
        });

        const locationSelects = ['itemLocation', 'registerHostel'];
        locationSelects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                while (select.children.length > 1) {
                    select.removeChild(select.lastChild);
                }

                this.campusLocations.forEach(location => {
                    const option = document.createElement('option');
                    option.value = location;
                    option.textContent = location;
                    select.appendChild(option);
                });
            }
        });
    }

    setupEventListeners() {
        // Main navigation buttons
        const loginBtn = document.getElementById('loginBtn');
        const postItemBtn = document.getElementById('postItemBtn');
        const askItemBtn = document.getElementById('askItemBtn');

        if (loginBtn) loginBtn.addEventListener('click', () => this.showModal('loginModal'));
        if (postItemBtn) postItemBtn.addEventListener('click', () => this.handlePostItem());
        if (askItemBtn) askItemBtn.addEventListener('click', () => this.handleAskItem());

        // Auth form switching
        const switchToRegister = document.getElementById('switchToRegister');
        const switchToLogin = document.getElementById('switchToLogin');

        if (switchToRegister) {
            switchToRegister.addEventListener('click', (e) => {
                e.preventDefault();
                this.showRegister();
            });
        }

        if (switchToLogin) {
            switchToLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLogin();
            });
        }

        // Tab switching
        const itemsTab = document.getElementById('itemsTab');
        const asksTab = document.getElementById('asksTab');

        if (itemsTab) itemsTab.addEventListener('click', () => this.switchTab('items'));
        if (asksTab) asksTab.addEventListener('click', () => this.switchTab('asks'));

        // Form submissions
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        const postItemForm = document.getElementById('postItemForm');
        const askItemForm = document.getElementById('askItemForm');

        if (loginForm) loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        if (registerForm) registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        if (postItemForm) postItemForm.addEventListener('submit', (e) => this.handlePostItemSubmit(e));
        if (askItemForm) askItemForm.addEventListener('submit', (e) => this.handleAskItemSubmit(e));

        // Search and filters
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const conditionFilter = document.getElementById('conditionFilter');
        const priceFilter = document.getElementById('priceFilter');
        const sortFilter = document.getElementById('sortFilter');

        if (searchInput) searchInput.addEventListener('input', () => this.filterAndRenderItems());
        if (categoryFilter) categoryFilter.addEventListener('change', () => this.filterAndRenderItems());
        if (conditionFilter) conditionFilter.addEventListener('change', () => this.filterAndRenderItems());
        if (priceFilter) priceFilter.addEventListener('change', () => this.filterAndRenderItems());
        if (sortFilter) sortFilter.addEventListener('change', () => this.filterAndRenderItems());

        // User menu and profile actions
        const userMenuBtn = document.getElementById('userMenuBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const profileBtn = document.getElementById('profileBtn');
        const myItemsBtn = document.getElementById('myItemsBtn');
        const myAsksBtn = document.getElementById('myAsksBtn');
        const wishlistBtn = document.getElementById('wishlistBtn');

        if (userMenuBtn) userMenuBtn.addEventListener('click', () => this.toggleUserMenu());
        if (logoutBtn) logoutBtn.addEventListener('click', () => this.handleLogout());

        if (profileBtn) profileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showProfile();
        });

        if (myItemsBtn) myItemsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showMyItems();
        });

        if (myAsksBtn) myAsksBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showMyAsks();
        });

        if (wishlistBtn) wishlistBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.showWishlist();
        });

        // Modal close handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeAllModals();
            }
        });

        // FIXED: Image upload with proper event handling
        const itemImages = document.getElementById('itemImages');
        if (itemImages) {
            itemImages.addEventListener('change', (e) => this.handleImageUpload(e));
        }

        // FIXED: Image upload area click handler
        const imageUploadArea = document.querySelector('.image-upload-area');
        if (imageUploadArea) {
            imageUploadArea.addEventListener('click', () => {
                const fileInput = document.getElementById('itemImages');
                if (fileInput) {
                    fileInput.click();
                }
            });
        }

        // Message close
        const messageClose = document.getElementById('messageClose');
        if (messageClose) {
            messageClose.addEventListener('click', () => {
                const container = document.getElementById('messageContainer');
                if (container) container.classList.add('hidden');
            });
        }
    }

    // FIXED: Working image upload function
    handleImageUpload(e) {
        const files = e.target.files;
        const preview = document.getElementById('imagePreview');

        if (!files || files.length === 0) {
            console.log('No files selected');
            return;
        }

        if (!preview) {
            console.error('Image preview container not found');
            return;
        }

        console.log(`Processing ${files.length} files...`);

        // Clear previous uploads
        preview.innerHTML = '';
        this.uploadedImages = [];

        // Process each file (limit to 5 images)
        Array.from(files).forEach((file, index) => {
            if (index >= 5) return; // Limit to 5 images

            if (!file.type.startsWith('image/')) {
                console.warn(`File ${file.name} is not an image`);
                return;
            }

            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                console.warn(`File ${file.name} is too large (>5MB)`);
                this.showMessage(`Image ${file.name} is too large. Please use images under 5MB.`, 'warning');
                return;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                const imageDataUrl = e.target.result;
                this.uploadedImages.push(imageDataUrl);

                console.log(`Image ${index + 1} processed successfully`);

                // Create preview element
                const previewDiv = document.createElement('div');
                previewDiv.className = 'preview-item';
                previewDiv.innerHTML = `
                    <img src="${imageDataUrl}" alt="Preview ${index + 1}" class="preview-image">
                    <button type="button" class="remove-preview" onclick="marketplace.removeImage(${index})">×</button>
                `;

                preview.appendChild(previewDiv);

                // Show success message for first image
                if (index === 0) {
                    this.showMessage('✅ Images uploaded successfully!', 'success');
                }
            };

            reader.onerror = (error) => {
                console.error('Error reading file:', error);
                this.showMessage('Error reading image file. Please try again.', 'error');
            };

            reader.readAsDataURL(file);
        });
    }

    // FIXED: Remove image function
    removeImage(index) {
        if (this.uploadedImages && this.uploadedImages[index]) {
            this.uploadedImages.splice(index, 1);

            // Refresh preview
            const preview = document.getElementById('imagePreview');
            if (preview) {
                preview.innerHTML = '';

                this.uploadedImages.forEach((imageData, i) => {
                    const previewDiv = document.createElement('div');
                    previewDiv.className = 'preview-item';
                    previewDiv.innerHTML = `
                        <img src="${imageData}" alt="Preview ${i + 1}" class="preview-image">
                        <button type="button" class="remove-preview" onclick="marketplace.removeImage(${i})">×</button>
                    `;
                    preview.appendChild(previewDiv);
                });
            }

            this.showMessage('Image removed', 'info');
        }
    }

    // FIXED: Helper function to get image URL with fallback
    getImageUrl(item, size = 'medium') {
        // Check if item has uploaded images
        if (item.images && item.images.length > 0) {
            const image = item.images[0];

            // If it's a data URL (uploaded image), return as is
            if (image.startsWith('data:image/')) {
                return image;
            }

            // If it's a URL, return as is
            if (image.startsWith('http')) {
                return image;
            }
        }

        // Return fallback image with "Image Not Available" text
        const width = size === 'large' ? 400 : size === 'small' ? 200 : 300;
        const height = size === 'large' ? 300 : size === 'small' ? 120 : 200;

        return `https://via.placeholder.com/${width}x${height}/E5E7EB/6B7280?text=Image+Not+Available`;
    }

    // Profile display with centered avatar above name
    showProfile() {
        if (!this.currentUser) {
            this.showMessage('Please login to view profile', 'error');
            return;
        }

        const modalBody = document.getElementById('profileBody');
        if (modalBody) {
            modalBody.innerHTML = `
                <div class="profile-content">
                    <div class="profile-header-centered">
                        <div class="profile-avatar-center">
                            <div class="avatar-circle-large">
                                ${this.currentUser.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div class="profile-info-center">
                            <h3>${this.currentUser.name} ${this.currentUser.verified ? '✅' : ''}</h3>
                            <p class="profile-email">${this.currentUser.email}</p>
                            <div class="profile-stats">
                                <div class="stat">
                                    <span class="stat-number">${this.getUserItems().length}</span>
                                    <span class="stat-label">Items Listed</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-number">${this.getUserAsks().length}</span>
                                    <span class="stat-label">Requests Made</span>
                                </div>
                                <div class="stat">
                                    <span class="stat-number">${this.wishlist.length}</span>
                                    <span class="stat-label">Wishlist Items</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="profile-details">
                        <div class="detail-section">
                            <h4>Contact Information</h4>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <strong>Phone:</strong>
                                    <span>${this.currentUser.phone}</span>
                                </div>
                                <div class="detail-item">
                                    <strong>Location:</strong>
                                    <span>${this.currentUser.hostel}</span>
                                </div>
                                <div class="detail-item">
                                    <strong>Rating:</strong>
                                    <span>⭐ ${this.currentUser.rating}/5.0</span>
                                </div>
                                <div class="detail-item">
                                    <strong>Member Since:</strong>
                                    <span>${this.formatDate(this.currentUser.joinDate)}</span>
                                </div>
                            </div>
                        </div>

                        <div class="profile-actions">
                            <button class="btn btn--primary" onclick="marketplace.showMyItems()">
                                📦 View My Items
                            </button>
                            <button class="btn btn--secondary" onclick="marketplace.showMyAsks()">
                                💬 View My Requests
                            </button>
                            <button class="btn btn--outline" onclick="marketplace.showWishlist()">
                                ❤️ View Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }

        this.showModal('profileModal');
    }

    showMyItems() {
        if (!this.currentUser) {
            this.showMessage('Please login to view your items', 'error');
            return;
        }

        const userItems = this.getUserItems();
        const modalBody = document.getElementById('myItemsBody');

        if (modalBody) {
            if (userItems.length === 0) {
                modalBody.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">📦</div>
                        <h3>No Items Posted Yet</h3>
                        <p>Start selling by posting your first item!</p>
                        <button class="btn btn--primary" onclick="marketplace.closeAllModals(); marketplace.handlePostItem();">
                            Post Your First Item
                        </button>
                    </div>
                `;
            } else {
                modalBody.innerHTML = `
                    <div class="my-items-grid">
                        ${userItems.map(item => `
                            <div class="my-item-card">
                                <div class="item-image-small">
                                    <img src="${this.getImageUrl(item, 'small')}" 
                                         alt="${item.title}" 
                                         onload="console.log('Image loaded successfully')"
                                         onerror="console.log('Image failed to load')">
                                    ${item.status === 'sold' ? '<div class="sold-badge-small">SOLD</div>' : ''}
                                </div>
                                <div class="item-info">
                                    <h4>${item.title}</h4>
                                    <p class="item-price-small">₹${item.price}</p>
                                    <p class="item-meta-small">${item.condition} • ${item.views || 0} views</p>
                                    <p class="item-date-small">Posted ${this.formatDate(item.createdAt)}</p>
                                </div>
                                <div class="item-actions">
                                    <button class="btn btn--sm btn--outline" onclick="marketplace.showItemDetail('${item.id}')">
                                        View
                                    </button>
                                    ${item.status === 'available' ? 
                                        `<button class="btn btn--sm btn--warning" onclick="marketplace.markAsSold('${item.id}')">
                                            Mark Sold
                                        </button>` :
                                        `<button class="btn btn--sm btn--success" onclick="marketplace.markAsSold('${item.id}')">
                                            Mark Available
                                        </button>`
                                    }
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        }

        this.showModal('myItemsModal');
    }

    showMyAsks() {
        if (!this.currentUser) {
            this.showMessage('Please login to view your requests', 'error');
            return;
        }

        const userAsks = this.getUserAsks();
        const modalBody = document.getElementById('myAsksBody');

        if (modalBody) {
            if (userAsks.length === 0) {
                modalBody.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">💬</div>
                        <h3>No Requests Posted Yet</h3>
                        <p>Ask for items you need and let others help you find them!</p>
                        <button class="btn btn--primary" onclick="marketplace.closeAllModals(); marketplace.handleAskItem();">
                            Post Your First Request
                        </button>
                    </div>
                `;
            } else {
                modalBody.innerHTML = `
                    <div class="my-asks-grid">
                        ${userAsks.map(ask => `
                            <div class="my-ask-card">
                                <div class="ask-info">
                                    <div class="ask-header-small">
                                        <h4>${ask.title}</h4>
                                        <span class="urgency-badge urgency-${ask.urgency.toLowerCase()}">${ask.urgency}</span>
                                    </div>
                                    ${ask.budget ? `<p class="ask-budget-small">Budget: ₹${ask.budget}</p>` : ''}
                                    <p class="ask-category-small">${ask.category}</p>
                                    <p class="ask-description-small">${ask.description}</p>
                                    <p class="ask-date-small">Posted ${this.formatDate(ask.createdAt)}</p>
                                </div>
                                <div class="ask-actions">
                                    <button class="btn btn--sm btn--outline" onclick="marketplace.showAskDetail('${ask.id}')">
                                        View Details
                                    </button>
                                    <button class="btn btn--sm btn--danger" onclick="marketplace.deleteAsk('${ask.id}')">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
        }

        this.showModal('myAsksModal');
    }

    showWishlist() {
        if (!this.currentUser) {
            this.showMessage('Please login to view your wishlist', 'error');
            return;
        }

        const wishlistItems = this.allItems.filter(item => this.wishlist.includes(item.id));
        const modalBody = document.getElementById('wishlistBody');

        if (modalBody) {
            if (wishlistItems.length === 0) {
                modalBody.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">❤️</div>
                        <h3>Your Wishlist is Empty</h3>
                        <p>Add items to your wishlist by clicking the heart icon on items you like!</p>
                        <button class="btn btn--primary" onclick="marketplace.closeAllModals(); marketplace.switchTab('items');">
                            Browse Items
                        </button>
                    </div>
                `;
            } else {
                modalBody.innerHTML = `
                    <div class="wishlist-grid">
                        ${wishlistItems.map(item => {
                            const seller = this.users.find(u => u.id === item.sellerId);
                            return `
                                <div class="wishlist-item-card">
                                    <div class="item-image-small">
                                        <img src="${this.getImageUrl(item, 'small')}" 
                                             alt="${item.title}">
                                        ${item.status === 'sold' ? '<div class="sold-badge-small">SOLD</div>' : ''}
                                    </div>
                                    <div class="item-info">
                                        <h4>${item.title}</h4>
                                        <p class="item-price-small">₹${item.price}</p>
                                        <p class="item-seller-small">By ${seller ? seller.name : 'Unknown'}</p>
                                        <p class="item-condition-small">${item.condition} • ${item.location}</p>
                                    </div>
                                    <div class="item-actions">
                                        <button class="btn btn--sm btn--primary" onclick="marketplace.showItemDetail('${item.id}')">
                                            View Item
                                        </button>
                                        <button class="btn btn--sm btn--outline" onclick="marketplace.toggleWishlist('${item.id}')">
                                            💔 Remove
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
            }
        }

        this.showModal('wishlistModal');
    }

    getUserItems() {
        if (!this.currentUser) return [];
        return this.allItems.filter(item => item.sellerId === this.currentUser.id);
    }

    getUserAsks() {
        if (!this.currentUser) return [];
        return this.allAsks.filter(ask => ask.askerId === this.currentUser.id);
    }

    async deleteAsk(askId) {
        if (!this.currentUser) return;

        const ask = this.allAsks.find(a => a.id === askId);
        if (!ask) return;

        if (ask.askerId !== this.currentUser.id) {
            this.showMessage('You can only delete your own requests', 'error');
            return;
        }

        if (confirm('Are you sure you want to delete this request?')) {
            this.allAsks = this.allAsks.filter(a => a.id !== askId);

            const saved = await this.saveData();

            this.showMessage('Request deleted successfully', 'success');
            this.renderAsks();
            this.updateStats();
            this.showMyAsks();
        }
    }

    showAskDetail(askId) {
        const ask = this.allAsks.find(a => a.id === askId);
        if (!ask) {
            this.showMessage('Request not found', 'error');
            return;
        }

        const asker = this.users.find(u => u.id === ask.askerId);
        const isOwnAsk = this.currentUser && this.currentUser.id === ask.askerId;
        const urgencyClass = `urgency-${ask.urgency.toLowerCase()}`;

        const modalBody = document.getElementById('askDetailBody');
        const modalTitle = document.getElementById('askDetailTitle');

        if (modalTitle) modalTitle.textContent = ask.title;

        if (modalBody) {
            modalBody.innerHTML = `
                <div class="ask-detail">
                    <div class="ask-detail-content">
                        <div class="ask-detail-header">
                            <h3>${ask.title}</h3>
                            <span class="urgency-badge ${urgencyClass}">${ask.urgency}</span>
                        </div>

                        ${ask.budget ? `
                            <div class="ask-budget-display">
                                <strong>Budget:</strong> ₹${ask.budget}
                            </div>
                        ` : ''}

                        <div class="ask-details">
                            <div class="detail-row">
                                <strong>Category:</strong> <span>${ask.category}</span>
                            </div>
                            <div class="detail-row">
                                <strong>Urgency:</strong> <span>${ask.urgency}</span>
                            </div>
                            <div class="detail-row">
                                <strong>Posted:</strong> <span>${this.formatDate(ask.createdAt)}</span>
                            </div>
                            <div class="detail-row">
                                <strong>Status:</strong> <span>${ask.status}</span>
                            </div>
                        </div>

                        <div class="ask-description-detail">
                            <strong>Description:</strong>
                            <p>${ask.description}</p>
                        </div>

                        <div class="asker-info">
                            <h4>Requested by</h4>
                            <div class="asker-card">
                                <div class="asker-name">
                                    ${asker ? asker.name : 'Unknown User'}
                                    ${asker && asker.verified ? '✅ Verified Student' : ''}
                                </div>
                                ${asker ? `
                                    <div class="asker-contact">📞 Phone: ${asker.phone}</div>
                                    <div class="asker-rating">⭐ ${asker.rating}/5.0</div>
                                    <div class="asker-hostel">📍 ${asker.hostel}</div>
                                    <div class="asker-joined">Joined ${this.formatDate(asker.joinDate)}</div>
                                ` : ''}
                            </div>
                        </div>

                        <div class="ask-actions-detail">
                            ${!isOwnAsk && this.currentUser ? `
                                <button class="btn btn--primary btn--large" onclick="marketplace.respondToAsk('${ask.id}')">
                                    💬 I Can Help
                                </button>
                                <button class="btn btn--outline" onclick="marketplace.contactAsker('${ask.id}')">
                                    📞 Contact Requester
                                </button>
                            ` : ''}

                            ${isOwnAsk ? `
                                <button class="btn btn--danger" onclick="marketplace.deleteAsk('${ask.id}'); marketplace.closeModal('askDetailModal');">
                                    🗑️ Delete Request
                                </button>
                            ` : ''}

                            ${!this.currentUser ? `
                                <div class="login-required">Please login to respond to this request</div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }

        this.showModal('askDetailModal');
    }

    respondToAsk(askId) {
        if (!this.currentUser) {
            this.showMessage('Please login to respond to requests', 'error');
            this.showModal('loginModal');
            return;
        }

        const ask = this.allAsks.find(a => a.id === askId);
        if (!ask) {
            this.showMessage('Request not found', 'error');
            return;
        }

        if (this.currentUser.id === ask.askerId) {
            this.showMessage('You cannot respond to your own request', 'error');
            return;
        }

        const asker = this.users.find(u => u.id === ask.askerId);
        if (!asker) {
            this.showMessage('Requester information not available', 'error');
            return;
        }

        const responseMessage = prompt(`You're about to respond to "${ask.title}"\n\nWhat can you offer? (Enter your message):`);

        if (responseMessage && responseMessage.trim()) {
            if (!ask.responses) ask.responses = [];

            const response = {
                id: Date.now().toString(),
                responderId: this.currentUser.id,
                responderName: this.currentUser.name,
                message: responseMessage.trim(),
                createdAt: new Date().toISOString()
            };

            ask.responses.push(response);

            this.saveData().then(saved => {
                this.showMessage('✅ Response sent successfully!', 'success');

                setTimeout(() => {
                    this.contactAsker(askId);
                }, 1500);
            });
        }
    }

    contactAsker(askId) {
        const ask = this.allAsks.find(a => a.id === askId);
        const asker = this.users.find(u => u.id === ask.askerId);

        if (!ask || !asker) {
            this.showMessage('Requester information not available', 'error');
            return;
        }

        const whatsappNumber = asker.phone.replace(/[^0-9]/g, '');
        const whatsappUrl = `https://wa.me/91${whatsappNumber.slice(-10)}?text=Hi! I saw your request for "${ask.title}" on SRM Marché. I might be able to help you with this. Let me know if you're still looking!`;

        const contactInfo = `
💬 REQUESTER CONTACT INFORMATION

👤 Name: ${asker.name} ${asker.verified ? '✅ Verified' : ''}
📱 Phone: ${asker.phone}
📧 Email: ${asker.email}
📍 Location: ${asker.hostel}
⭐ Rating: ${asker.rating}/5.0

📝 Request: ${ask.title}
${ask.budget ? `💰 Budget: ₹${ask.budget}` : ''}
⚡ Urgency: ${ask.urgency}

🔗 Quick Actions:
• WhatsApp: Click to message directly
• Call: ${asker.phone}

Ready to help ${asker.name.split(' ')[0]}?
        `;

        if (confirm(contactInfo + "\n\nClick OK to open WhatsApp, Cancel to copy phone number")) {
            window.open(whatsappUrl, '_blank');
        } else {
            navigator.clipboard.writeText(asker.phone).then(() => {
                this.showMessage(`📋 Phone number copied: ${asker.phone}`, 'info');
            });
        }
    }

    showRegister() {
        this.closeAllModals();
        this.showModal('registerModal');
    }

    showLogin() {
        this.closeAllModals();
        this.showModal('loginModal');
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    checkAuthState() {
        const storedUser = localStorage.getItem('srmMarcheUser');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.updateAuthUI();

            const storedWishlist = localStorage.getItem(`srmMarcheWishlist_${this.currentUser.id}`);
            if (storedWishlist) {
                this.wishlist = JSON.parse(storedWishlist);
            }
        }
    }

    updateAuthUI() {
        const loginBtn = document.getElementById('loginBtn');
        const userMenu = document.getElementById('userMenu');
        const userName = document.getElementById('userName');

        if (this.currentUser) {
            if (loginBtn) loginBtn.classList.add('hidden');
            if (userMenu) userMenu.classList.remove('hidden');
            if (userName) userName.textContent = this.currentUser.name.split(' ')[0];
        } else {
            if (loginBtn) loginBtn.classList.remove('hidden');
            if (userMenu) userMenu.classList.add('hidden');
        }
    }

    updateStats() {
        const activeItems = this.allItems.filter(item => item.status !== 'sold').length;
        const activeAsks = this.allAsks.length;
        const activeUsers = this.users.length;

        const registeredUsersEl = document.getElementById('registeredUsers');
        const totalItemsEl = document.getElementById('totalItems');
        const totalAsksEl = document.getElementById('totalAsks');

        if (registeredUsersEl) registeredUsersEl.textContent = activeUsers;
        if (totalItemsEl) totalItemsEl.textContent = activeItems;
        if (totalAsksEl) totalAsksEl.textContent = activeAsks;

        this.categories.forEach(category => {
            category.count = this.allItems.filter(item => 
                item.category === category.name && item.status !== 'sold'
            ).length;
        });
    }

    renderCategories() {
        const container = document.getElementById('categoriesContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="categories-header">
                <h2>Browse Categories</h2>
                <p class="sync-status">🌍 Cross-device sync • ${this.isOnline ? '🟢 Online' : '🔴 Offline'} • ${this.allItems.length} items total</p>
            </div>
            <div class="categories-grid">
                ${this.categories.map(category => `
                    <div class="category-card" onclick="marketplace.filterByCategory('${category.name}')">
                        <div class="category-icon">${category.icon}</div>
                        <div class="category-name">${category.name}</div>
                        <div class="category-count">${category.count} items</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderItems() {
        const itemsGrid = document.getElementById('itemsGrid');
        if (!itemsGrid) return;

        if (this.syncInProgress) {
            itemsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔄</div>
                    <h3>Loading latest items...</h3>
                    <p>Syncing across all devices</p>
                </div>
            `;
            return;
        }

        if (this.allItems.length === 0) {
            itemsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📦</div>
                    <h3>No items listed yet</h3>
                    <p>Be the first to post an item for sale!</p>
                    <button class="btn btn--primary" onclick="marketplace.handlePostItem()">Post First Item</button>
                </div>
            `;
            return;
        }

        const filteredItems = this.getFilteredItems();

        if (filteredItems.length === 0) {
            itemsGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3>No items found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            `;
            return;
        }

        itemsGrid.innerHTML = filteredItems.map(item => this.createItemCard(item)).join('');
    }

    renderAsks() {
        const asksGrid = document.getElementById('asksGrid');
        if (!asksGrid) return;

        if (this.allAsks.length === 0) {
            asksGrid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">💬</div>
                    <h3>No requests posted yet</h3>
                    <p>Be the first to ask for an item you need!</p>
                    <button class="btn btn--primary" onclick="marketplace.handleAskItem()">Post First Request</button>
                </div>
            `;
            return;
        }

        asksGrid.innerHTML = this.allAsks.map(ask => this.createAskCard(ask)).join('');
    }

    createItemCard(item) {
        const seller = this.users.find(u => u.id === item.sellerId);
        const isSold = item.status === 'sold';

        return `
            <div class="item-card ${isSold ? 'item-sold' : ''}" onclick="marketplace.showItemDetail('${item.id}')">
                ${isSold ? '<div class="sold-badge">SOLD</div>' : ''}
                <div class="item-image">
                    <img src="${this.getImageUrl(item)}" 
                         alt="${item.title}" 
                         loading="lazy">
                </div>
                <div class="item-content">
                    <div class="item-header">
                        <h3 class="item-title">${item.title}</h3>
                        <button class="wishlist-btn ${this.isInWishlist(item.id) ? 'active' : ''}" 
                                onclick="event.stopPropagation(); marketplace.toggleWishlist('${item.id}')">
                            ❤️
                        </button>
                    </div>

                    <div class="item-price">
                        <span class="current-price">₹${item.price}</span>
                        ${item.originalPrice ? `<span class="original-price">₹${item.originalPrice}</span>` : ''}
                    </div>

                    <div class="item-meta">
                        <span class="item-category">${item.category}</span>
                        <span class="item-condition">${item.condition}</span>
                    </div>

                    <div class="item-location">📍 ${item.location}</div>

                    <div class="item-seller">
                        By ${seller ? seller.name : 'Unknown'}
                        ${seller && seller.verified ? '✅' : ''}
                    </div>
                </div>
            </div>
        `;
    }

    createAskCard(ask) {
        const asker = this.users.find(u => u.id === ask.askerId);
        const urgencyClass = `urgency-${ask.urgency.toLowerCase()}`;

        return `
            <div class="ask-card" onclick="marketplace.showAskDetail('${ask.id}')">
                <div class="ask-content">
                    <div class="ask-header">
                        <h3 class="ask-title">${ask.title}</h3>
                        <span class="urgency-badge ${urgencyClass}">${ask.urgency}</span>
                    </div>

                    ${ask.budget ? `<div class="ask-budget">Budget: ₹${ask.budget}</div>` : ''}

                    <div class="ask-meta">
                        <span class="ask-category">${ask.category}</span>
                        <span class="ask-date">${this.formatDate(ask.createdAt)}</span>
                    </div>

                    <div class="ask-description">${ask.description}</div>

                    <div class="ask-footer">
                        <div class="ask-user">
                            Asked by ${asker ? asker.name : 'Unknown'}
                            ${asker && asker.verified ? '✅' : ''}
                        </div>
                        <button class="btn btn--sm btn--outline" onclick="event.stopPropagation(); marketplace.respondToAsk('${ask.id}')">
                            Reply
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    async showItemDetail(itemId) {
        const item = this.allItems.find(i => i.id === itemId);
        if (!item) {
            this.showMessage('Item not found', 'error');
            return;
        }

        item.views = (item.views || 0) + 1;
        await this.saveData();

        const seller = this.users.find(u => u.id === item.sellerId);
        const isSold = item.status === 'sold';
        const isOwnItem = this.currentUser && this.currentUser.id === item.sellerId;

        const modalBody = document.getElementById('itemDetailBody');
        const modalTitle = document.getElementById('itemDetailTitle');

        if (modalTitle) modalTitle.textContent = item.title;

        if (modalBody) {
            modalBody.innerHTML = `
                <div class="item-detail">
                    ${isSold ? '<div class="sold-notice">⚠️ This item has been sold</div>' : ''}

                    <div class="item-detail-content">
                        <div class="item-detail-left">
                            <div class="item-images">
                                <img src="${this.getImageUrl(item, 'large')}" 
                                     alt="${item.title}" 
                                     class="main-image">
                            </div>
                        </div>

                        <div class="item-detail-right">
                            <div class="price-section">
                                <span class="current-price">₹${item.price}</span>
                                ${item.originalPrice ? `<span class="original-price">₹${item.originalPrice}</span>` : ''}
                                ${item.originalPrice ? `<span class="discount">${Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off</span>` : ''}
                            </div>

                            <div class="item-details">
                                <div class="detail-row">
                                    <strong>Category:</strong> <span>${item.category}</span>
                                </div>
                                <div class="detail-row">
                                    <strong>Condition:</strong> <span>${item.condition}</span>
                                </div>
                                <div class="detail-row">
                                    <strong>Location:</strong> <span>📍 ${item.location}</span>
                                </div>
                                <div class="detail-row">
                                    <strong>Views:</strong> <span>${item.views || 0}</span>
                                </div>
                                <div class="detail-row">
                                    <strong>Posted:</strong> <span>${this.formatDate(item.createdAt)}</span>
                                </div>
                            </div>

                            <div class="description">
                                <strong>Description:</strong>
                                <p>${item.description}</p>
                            </div>

                            <div class="seller-info">
                                <h4>Seller Information</h4>
                                <div class="seller-card">
                                    <div class="seller-name">
                                        ${seller ? seller.name : 'Unknown Seller'}
                                        ${seller && seller.verified ? '✅ Verified Student' : ''}
                                    </div>
                                    ${seller ? `
                                        <div class="seller-contact-number">📞 Phone: ${seller.phone}</div>
                                        <div class="seller-rating">⭐ ${seller.rating}/5.0</div>
                                        <div class="seller-hostel">📍 ${seller.hostel}</div>
                                        <div class="seller-joined">Joined ${this.formatDate(seller.joinDate)}</div>
                                    ` : ''}
                                </div>
                            </div>

                            <div class="action-buttons">
                                ${!isSold && !isOwnItem ? `
                                    <button class="btn btn--primary btn--large" onclick="marketplace.initiateBuy('${item.id}')">
                                        🛒 Buy Now
                                    </button>
                                    <button class="btn btn--outline" onclick="marketplace.contactSeller('${item.id}')">
                                        📞 Contact Seller
                                    </button>
                                ` : ''}

                                ${!isSold && isOwnItem ? `
                                    <button class="btn btn--warning" onclick="marketplace.markAsSold('${item.id}')">
                                        ✅ Mark as Sold
                                    </button>
                                ` : ''}

                                ${isSold && isOwnItem ? `
                                    <button class="btn btn--outline" onclick="marketplace.markAsSold('${item.id}')">
                                        ↩️ Mark as Available
                                    </button>
                                ` : ''}

                                ${isSold && !isOwnItem ? `
                                    <div class="sold-message">This item is no longer available</div>
                                ` : ''}

                                <button class="btn btn--outline btn--sm" onclick="marketplace.toggleWishlist('${item.id}')">
                                    ${this.isInWishlist(item.id) ? '💔 Remove from Wishlist' : '❤️ Add to Wishlist'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        this.showModal('itemDetailModal');
    }

    initiateBuy(itemId) {
        if (!this.currentUser) {
            this.showMessage('Please login to buy items', 'error');
            this.showModal('loginModal');
            return;
        }

        const item = this.allItems.find(i => i.id === itemId);
        const seller = this.users.find(u => u.id === item.sellerId);

        if (!item || !seller) {
            this.showMessage('Item or seller not found', 'error');
            return;
        }

        if (this.currentUser.id === item.sellerId) {
            this.showMessage('You cannot buy your own item', 'error');
            return;
        }

        const confirmPurchase = confirm(`Are you sure you want to buy "${item.title}" for ₹${item.price}?\n\nThis will connect you with the seller directly.`);

        if (confirmPurchase) {
            this.showMessage('✅ Connecting you with the seller...', 'success');

            setTimeout(() => {
                this.showSellerContact(item.id);
            }, 1500);
        }
    }

    showSellerContact(itemId) {
        const item = this.allItems.find(i => i.id === itemId);
        const seller = this.users.find(u => u.id === item.sellerId);

        if (!seller) {
            this.showMessage('Seller information not available', 'error');
            return;
        }

        const whatsappNumber = seller.phone.replace(/[^0-9]/g, '');
        const whatsappUrl = `https://wa.me/91${whatsappNumber.slice(-10)}?text=Hi! I'm interested in buying your "${item.title}" listed for ₹${item.price} on SRM Marché. Is it still available?`;

        const contactInfo = `
📞 SELLER CONTACT INFORMATION

👤 Name: ${seller.name} ${seller.verified ? '✅ Verified' : ''}
📱 Phone: ${seller.phone}
📧 Email: ${seller.email}
📍 Location: ${seller.hostel}
⭐ Rating: ${seller.rating}/5.0

🔗 Quick Actions:
• WhatsApp: Click to message directly
• Call: ${seller.phone}

⚠️ SAFETY GUIDELINES:
• Meet in public campus areas
• Verify item condition before payment
• Use campus-safe payment methods

Ready to connect with ${seller.name.split(' ')[0]}?
        `;

        if (confirm(contactInfo + "\n\nClick OK to open WhatsApp, Cancel to copy phone number")) {
            window.open(whatsappUrl, '_blank');
        } else {
            navigator.clipboard.writeText(seller.phone).then(() => {
                this.showMessage(`📋 Phone number copied: ${seller.phone}`, 'info');
            });
        }
    }

    contactSeller(itemId) {
        this.showSellerContact(itemId);
    }

    async markAsSold(itemId) {
        const item = this.allItems.find(i => i.id === itemId);
        if (!item) return;

        if (!this.currentUser || this.currentUser.id !== item.sellerId) {
            this.showMessage('You can only mark your own items as sold', 'error');
            return;
        }

        const newStatus = item.status === 'sold' ? 'available' : 'sold';
        item.status = newStatus;

        const saved = await this.saveData();

        if (newStatus === 'sold') {
            this.showMessage(saved ? '🎉 Item marked as sold and synced across devices!' : '🎉 Item marked as sold!', 'success');
        } else {
            this.showMessage(saved ? 'Item marked as available and synced across devices!' : 'Item marked as available!', 'success');
        }

        this.updateStats();
        this.renderCategories();
        this.renderItems();
        this.closeAllModals();
    }

    async handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail')?.value;

        if (email && email.includes('@srmist.edu.in')) {
            let user = this.users.find(u => u.email === email);

            if (!user) {
                user = {
                    id: Date.now().toString(),
                    name: email.split('@')[0].replace(/\./g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase(),
                    email: email,
                    phone: '+91 9876543210',
                    hostel: 'Block - C Rani Lakshmi Bai',
                    verified: true,
                    joinDate: new Date().toISOString().split('T')[0],
                    rating: 4.5
                };

                this.users.push(user);
                await this.saveData();
            }

            this.currentUser = user;
            localStorage.setItem('srmMarcheUser', JSON.stringify(user));
            this.updateAuthUI();
            this.updateStats();
            this.closeAllModals();
            this.showMessage('✅ Login successful!', 'success');
        } else {
            this.showMessage('Please use your SRM student email (@srmist.edu.in)', 'error');
        }
    }

    async handleRegister(e) {
        e.preventDefault();

        const email = document.getElementById('registerEmail')?.value;
        if (!email || !email.includes('@srmist.edu.in')) {
            this.showMessage('Please use your SRM student email (@srmist.edu.in)', 'error');
            return;
        }

        if (this.users.find(u => u.email === email)) {
            this.showMessage('User with this email already exists. Please login instead.', 'error');
            return;
        }

        const user = {
            id: Date.now().toString(),
            name: document.getElementById('registerName')?.value,
            email: email,
            phone: document.getElementById('registerPhone')?.value,
            hostel: document.getElementById('registerHostel')?.value,
            verified: true,
            joinDate: new Date().toISOString().split('T')[0],
            rating: 5.0
        };

        this.users.push(user);
        this.currentUser = user;

        const saved = await this.saveData();

        localStorage.setItem('srmMarcheUser', JSON.stringify(user));
        this.updateAuthUI();
        this.updateStats();
        this.closeAllModals();
        this.showMessage(saved ? '🎉 Registration successful and synced!' : '🎉 Registration successful!', 'success');

        document.getElementById('registerForm')?.reset();
    }

    handlePostItem() {
        if (!this.currentUser) {
            this.showMessage('Please login to post an item', 'error');
            this.showModal('loginModal');
            return;
        }
        this.showModal('postItemModal');
    }

    handleAskItem() {
        if (!this.currentUser) {
            this.showMessage('Please login to ask for an item', 'error');
            this.showModal('loginModal');
            return;
        }
        this.showModal('askItemModal');
    }

    async handlePostItemSubmit(e) {
        e.preventDefault();

        // FIXED: Ensure uploaded images are included
        const item = {
            id: Date.now().toString(),
            title: document.getElementById('itemTitle')?.value,
            category: document.getElementById('itemCategory')?.value,
            price: parseInt(document.getElementById('itemPrice')?.value),
            originalPrice: document.getElementById('itemOriginalPrice')?.value ? 
                         parseInt(document.getElementById('itemOriginalPrice')?.value) : null,
            condition: document.getElementById('itemCondition')?.value,
            location: document.getElementById('itemLocation')?.value,
            description: document.getElementById('itemDescription')?.value,
            images: this.uploadedImages && this.uploadedImages.length > 0 ? [...this.uploadedImages] : [],
            sellerId: this.currentUser.id,
            status: 'available',
            createdAt: new Date().toISOString(),
            views: 0
        };

        console.log('Posting item with images:', item.images.length);

        this.allItems.push(item);

        const saved = await this.saveData();

        this.updateStats();
        this.renderCategories();
        this.renderItems();
        this.closeAllModals();

        // FIXED: Reset form and images properly
        document.getElementById('postItemForm')?.reset();
        const preview = document.getElementById('imagePreview');
        if (preview) preview.innerHTML = '';
        this.uploadedImages = [];

        if (saved) {
            this.showMessage('🎉 Item posted with images and synced across all devices!', 'success');
        } else {
            this.showMessage('🎉 Item posted with images successfully!', 'success');
        }
    }

    async handleAskItemSubmit(e) {
        e.preventDefault();

        const ask = {
            id: Date.now().toString(),
            title: document.getElementById('askTitle')?.value,
            category: document.getElementById('askCategory')?.value,
            budget: document.getElementById('askBudget')?.value ? 
                   parseInt(document.getElementById('askBudget')?.value) : null,
            urgency: document.getElementById('askUrgency')?.value,
            description: document.getElementById('askDescription')?.value,
            askerId: this.currentUser.id,
            status: 'active',
            createdAt: new Date().toISOString(),
            responses: []
        };

        this.allAsks.push(ask);

        const saved = await this.saveData();

        this.updateStats();
        this.renderAsks();
        this.closeAllModals();

        document.getElementById('askItemForm')?.reset();

        this.showMessage(saved ? '🎉 Request posted and synced across all devices!' : '🎉 Request posted successfully!', 'success');
    }

    getFilteredItems() {
        let filtered = this.allItems.filter(item => item.status !== 'sold');

        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(item => 
                item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)
            );
        }

        const categoryFilter = document.getElementById('categoryFilter')?.value;
        if (categoryFilter) {
            filtered = filtered.filter(item => item.category === categoryFilter);
        }

        const conditionFilter = document.getElementById('conditionFilter')?.value;
        if (conditionFilter) {
            filtered = filtered.filter(item => item.condition === conditionFilter);
        }

        const priceFilter = document.getElementById('priceFilter')?.value;
        if (priceFilter) {
            const [min, max] = priceFilter.split('-').map(Number);
            filtered = filtered.filter(item => {
                if (max) {
                    return item.price >= min && item.price <= max;
                } else {
                    return item.price >= min;
                }
            });
        }

        const sortBy = document.getElementById('sortFilter')?.value || 'newest';
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price-low': return a.price - b.price;
                case 'price-high': return b.price - a.price;
                case 'popular': return (b.views || 0) - (a.views || 0);
                case 'newest':
                default: return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

        return filtered;
    }

    filterAndRenderItems() {
        this.renderItems();
    }

    filterByCategory(categoryName) {
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.value = categoryName;
            this.filterAndRenderItems();
        }
    }

    switchTab(tab) {
        const itemsTab = document.getElementById('itemsTab');
        const asksTab = document.getElementById('asksTab');
        const itemsSection = document.getElementById('itemsSection');
        const asksSection = document.getElementById('asksSection');

        if (tab === 'items') {
            itemsTab?.classList.add('tab-btn--active');
            asksTab?.classList.remove('tab-btn--active');
            itemsSection?.classList.remove('hidden');
            asksSection?.classList.add('hidden');
            this.renderItems();
        } else {
            asksTab?.classList.add('tab-btn--active');
            itemsTab?.classList.remove('tab-btn--active');
            asksSection?.classList.remove('hidden');
            itemsSection?.classList.add('hidden');
            this.renderAsks();
        }
    }

    toggleWishlist(itemId) {
        if (!this.currentUser) {
            this.showMessage('Please login to use wishlist', 'error');
            return;
        }

        const index = this.wishlist.indexOf(itemId);
        if (index > -1) {
            this.wishlist.splice(index, 1);
            this.showMessage('Removed from wishlist', 'info');
        } else {
            this.wishlist.push(itemId);
            this.showMessage('Added to wishlist', 'success');
        }

        this.renderItems();
        localStorage.setItem(`srmMarcheWishlist_${this.currentUser.id}`, JSON.stringify(this.wishlist));
    }

    isInWishlist(itemId) {
        return this.wishlist.includes(itemId);
    }

    handleLogout() {
        this.currentUser = null;
        this.wishlist = [];
        localStorage.removeItem('srmMarcheUser');

        this.updateAuthUI();
        this.updateStats();
        this.renderItems();
        this.showMessage('Logged out successfully', 'info');
        this.closeAllModals();
    }

    toggleUserMenu() {
        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }

    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });
        document.body.style.overflow = 'auto';

        const dropdown = document.getElementById('userDropdown');
        if (dropdown) {
            dropdown.classList.add('hidden');
        }
    }

    showMessage(text, type = 'info') {
        const container = document.getElementById('messageContainer');
        const content = document.getElementById('messageContent');
        const textEl = document.getElementById('messageText');

        if (!container || !content || !textEl) {
            alert(text);
            return;
        }

        textEl.textContent = text;
        content.className = `message message--${type}`;
        container.classList.remove('hidden');

        setTimeout(() => {
            container.classList.add('hidden');
        }, 5000);
    }

    formatDate(dateString) {
        if (!dateString) return 'Unknown';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }
}

// Initialize marketplace when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.marketplace = new SRMMarche();
});

console.log('🌍 SRM Marché with Working Image Upload by Code Cubs - Aman & Amrit for Hyperthon-2025');