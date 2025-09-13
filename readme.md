# 🛍️ SRM Marché - Student Marketplace

<div align="center">

![SRM Marché Logo](https://via.placeholder.com/200x200/3B82F6/FFFFFF?text=SRM+Marché)

**Buy & Sell Second Hand Items**  
*SRM Institute Ghaziabad's trusted marketplace for students*

[![Made with HTML](https://img.shields.io/badge/Made%20with-HTML-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Made with CSS](https://img.shields.io/badge/Made%20with-CSS-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Cross Platform](https://img.shields.io/badge/Cross%20Platform-PWA-green.svg)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[🚀 Live Demo](https://srm-marche.netlify.app/) • [📖 Documentation](#documentation) • [🐛 Report Bug](https://github.com/your-username/srm-marche/issues) • [✨ Request Feature](https://github.com/your-username/srm-marche/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Team](#team)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About The Project

**SRM Marché** is a comprehensive digital marketplace exclusively designed for students of **SRM Institute of Science & Technology, Ghaziabad Campus**. Built for **Hyperthon-2025**, this innovative platform revolutionizes how students buy, sell, and exchange second-hand items within the campus community.

### 🏆 Hackathon Project
- **Event:** Hyperthon-2025
- **Team:** Code Cubs
- **Members:** Aman & Amrit
- **Category:** Web Development / E-commerce

### 🎨 Why SRM Marché?

- **🏫 Campus Exclusive** - Only verified SRM students can participate
- **💰 Budget Friendly** - Perfect for student budgets and second-hand economy
- **🔄 Real-time Sync** - Cross-device synchronization for seamless experience
- **📱 Mobile First** - Progressive Web App works on all devices
- **🤝 Community Driven** - Built by students, for students

---

## ✨ Features

### 🛒 **Core Marketplace**
- **Buy & Sell Items** - Complete marketplace with item listings
- **Request Items** - Ask for specific items and let sellers find you
- **Wishlist System** - Save items for later consideration
- **Advanced Search** - Filter by category, price, condition, location

### 🔐 **Authentication & Security**
- **Student Verification** - @srmist.edu.in email authentication
- **Secure Profiles** - User ratings and verification badges
- **Safe Communication** - WhatsApp integration for direct contact

### 📱 **Modern User Experience**
- **Progressive Web App (PWA)** - Install like native mobile app
- **Responsive Design** - Perfect on all screen sizes
- **Real-time Updates** - Live synchronization across devices
- **Offline Support** - Works without internet connection

### 🖼️ **Rich Media Support**
- **Image Upload** - Multiple images per item (up to 5)
- **Smart Fallbacks** - Professional "Image Not Available" placeholders
- **Optimized Loading** - Fast image processing and display

### 🏠 **Campus Integration**
- **All Hostel Blocks** - C, D, E, F, G, H blocks + International Boarding House
- **Academic Locations** - Library, cafeteria, sports complex, academic blocks
- **Location-based Filtering** - Find items near your location

---

## 🛠️ Built With

### **Frontend Technologies**
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript** - ES6+ features and modern APIs
- **Progressive Web App (PWA)** - Service workers and app manifest

### **Backend & Database**
- **JSONBin.io API** - Cloud-based JSON storage
- **localStorage** - Offline data persistence
- **Real-time Sync** - Cross-device data synchronization

### **Design & UI/UX**
- **Google Fonts (Inter)** - Modern typography
- **CSS Variables** - Consistent theming
- **Mobile-first Design** - Responsive layouts
- **Accessibility** - ARIA labels and keyboard navigation

### **External Integrations**
- **Unsplash API** - Placeholder images
- **WhatsApp API** - Direct messaging integration
- **Browser APIs** - Camera, storage, notification APIs

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for initial setup
- SRM student email (@srmist.edu.in) for registration

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aman-ttf/srm-marche.git
   cd srm-marche
   ```

2. **Open with Live Server** (VS Code)
   ```bash
   # Install Live Server extension in VS Code
   # Right-click on index.html and select "Open with Live Server"
   ```

3. **Or serve with Python**
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -SimpleHTTPServer 8000
   ```

4. **Access the application**
   ```
   http://localhost:8000
   ```

### 🌐 Deployment (Netlify)

1. **Fork this repository**
2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Select your forked repository
3. **Deploy automatically**
   - Build command: (leave empty)
   - Publish directory: (leave empty or set to `/`)
4. **Your site is live!** 🎉

---

## 📱 Usage

### **For Students - Getting Started**

1. **Visit the Website**
   - Open [SRM Marché](https://srm-marche.netlify.app)

2. **Register/Login**
   ```
   📧 Use your SRM student email: your.name@srmist.edu.in
   🔐 Create a secure password
   ✅ Get verified instantly
   ```

3. **Complete Your Profile**
   - Add your phone number
   - Select your hostel/location
   - Upload profile information

### **Selling Items**

1. **Click "+ Post Item"**
2. **Fill Item Details**
   ```
   📦 Item name and description
   🏷️ Category and condition
   💰 Price and original price
   📍 Campus location
   📷 Upload up to 5 images
   ```
3. **Publish & Sync**
   - Item appears across all devices instantly
   - Other students can contact you directly

### **Buying Items**

1. **Browse Categories** or **Search**
2. **View Item Details**
   - See all images and information
   - Check seller ratings and location
3. **Contact Seller**
   - WhatsApp integration
   - Direct phone contact
   - Meet safely on campus

### **Requesting Items**

1. **Click "💬 Ask for Item"**
2. **Describe What You Need**
   ```
   📝 Title and detailed description
   🏷️ Category and urgency level
   💰 Budget (optional)
   ```
3. **Receive Responses**
   - Students contact you directly
   - Multiple sellers may respond

---

## 📸 Screenshots

<div align="center">

### 🖥️ **Desktop Experience**
![Desktop Homepage](https://via.placeholder.com/800x450/3B82F6/FFFFFF?text=Desktop+Homepage)
*Homepage with categories and featured items*

![Item Listing](https://via.placeholder.com/800x450/10B981/FFFFFF?text=Item+Listing)
*Detailed item view with seller information*

### 📱 **Mobile Experience**
<div style="display: flex; gap: 20px;">

![Mobile Home](https://via.placeholder.com/250x450/3B82F6/FFFFFF?text=Mobile+Home)
![Mobile Profile](https://via.placeholder.com/250x450/10B981/FFFFFF?text=Mobile+Profile)
![Mobile Chat](https://via.placeholder.com/250x450/EF4444/FFFFFF?text=Mobile+Chat)

</div>

*Mobile-responsive design works perfectly on all devices*

</div>

---

## 🏗️ Architecture

```
📁 srm-marche/
├── 📄 index.html          # Main HTML structure
├── 🎨 style.css           # Complete styling and themes
├── ⚙️ app.js              # Core application logic
├── 📱 manifest.json       # PWA configuration
├── 🔧 sw.js               # Service Worker (if implemented)
├── 📸 assets/             # Images and media files
├── 📚 docs/               # Documentation files
└── 📝 README.md           # This file
```

### **Data Flow**
```
User Action → Local Storage → Cloud Sync (JSONBin) → Update UI → Notify Other Devices
```

### **Key Components**
- **SRMMarche Class** - Main application controller
- **Authentication System** - Student email verification
- **Real-time Sync Engine** - Cross-device data synchronization
- **Image Upload Handler** - Multi-image support with compression
- **WhatsApp Integration** - Direct seller communication

---

## 🤝 Contributing

We love contributions! Here's how you can help make SRM Marché even better:

### **🐛 Found a Bug?**
1. Check existing [Issues](https://github.com/aman-ttf/srm-marche/issues)
2. Create a new issue with:
   - Clear bug description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### **✨ Want to Add a Feature?**
1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Make your changes
4. Commit with clear messages
   ```bash
   git commit -m "Add AmazingFeature for better user experience"
   ```
5. Push to your branch
   ```bash
   git push origin feature/AmazingFeature
   ```
6. Open a Pull Request

### **📋 Development Guidelines**
- Follow existing code style
- Add comments for complex logic
- Test on multiple devices
- Update documentation if needed

### **🎯 Priority Areas**
- [ ] Advanced search filters
- [ ] In-app messaging system
- [ ] Push notifications
- [ ] Dark mode theme
- [ ] Multi-language support

---

## 👥 Team

<div align="center">

### **🏆 Code Cubs - Hyperthon 2025**

| Member | Role | Contribution |
|--------|------|-------------|
| **Aman** | Team Lead & Full-Stack Developer | Frontend Development, Database Integration, Real-time Sync |
| **Amrit** | Frontend Developer & UI/UX Designer | User Interface Design, Authentication System, Mobile Optimization |

*Built with ❤️ for SRM Institute Ghaziabad students*

</div>

### **📧 Contact**
- **Project Repository:** [github.com/aman-ttf/srm-marche](https://github.com/aman-ttf/srm-marche)
- **Live Demo:** [SRM-Marche.netlify.app](https://your-netlify-url.netlify.app)
- **Report Issues:** [github.com/aman-ttf/srm-marche/issues](https://github.com/aman-ttf/srm-marche/issues)
- **Team Email:** adminsrmmarche@proton.me

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` file for more information.

```
MIT License - Free to use, modify, and distribute
Perfect for educational and hackathon projects
```

---

## 🙏 Acknowledgments

### **Special Thanks**
- **SRM Institute Ghaziabad** - For providing the inspiration and community
- **Hyperthon-2025 Organizers** - For the amazing hackathon opportunity
- **Fellow Students** - For testing and feedback during development

### **Resources Used**
- [JSONBin.io](https://jsonbin.io) - Cloud JSON storage for real-time sync
- [Unsplash](https://unsplash.com) - High-quality placeholder images
- [Google Fonts](https://fonts.google.com) - Beautiful typography (Inter font family)
- [Netlify](https://netlify.com) - Fast and reliable web hosting

### **Technology Stack**
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Database:** JSONBin.io API + localStorage
- **Design:** CSS Grid, Flexbox, Mobile-first approach
- **Communication:** WhatsApp API integration
- **Deployment:** Netlify continuous deployment

### **Inspiration**
- Modern marketplace platforms (OLX, Facebook Marketplace)
- Student community needs and feedback
- Campus-specific challenges and solutions
- Real-world e-commerce user experience patterns

---

<div align="center">

### **🌟 Star this repository if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/your-username/srm-marche?style=social&label=Star)](https://github.com/your-username/srm-marche/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/your-username/srm-marche?style=social&label=Fork)](https://github.com/your-username/srm-marche/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/your-username/srm-marche?style=social&label=Watch)](https://github.com/your-username/srm-marche/watchers)

**Made with 💙 by Code Cubs for SRM Ghaziabad Students**

---

### **📊 Quick Stats**
- **Lines of Code:** ~2000+
- **Features:** 15+ core features
- **Supported Devices:** All modern browsers & mobile devices  
- **Target Users:** 10,000+ SRM Ghaziabad students
- **Development Time:** Built for Hyperthon-2025 (48 hours)

</div>

---

**⚡ Quick Links:**
[🚀 Live Demo](https://your-netlify-url.netlify.app) • [📖 Docs](#documentation) • [💬 Issues](https://github.com/your-username/srm-marche/issues) • [🔧 Contribute](#contributing) • [📧 Contact](#contact)

---

### **🏆 Hyperthon-2025 Submission Details**

**Theme:** Campus Community Solutions  
**Problem Statement:** Creating a digital marketplace for student community  
**Solution:** SRM Marché - Cross-platform marketplace with real-time sync  
**Innovation:** Campus-specific features, WhatsApp integration, Progressive Web App  
**Impact:** Serves 10,000+ students across SRM Ghaziabad campus  

**Technical Achievements:**
- ✅ Real-time cross-device synchronization
- ✅ Working image upload and display system  
- ✅ Campus-integrated location system
- ✅ Progressive Web App capabilities
- ✅ Mobile-first responsive design
- ✅ Offline functionality with localStorage backup

---

*This project represents our dedication to solving real-world problems for the SRM student community through innovative technology solutions.*
