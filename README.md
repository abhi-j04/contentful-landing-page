# 🚀 Contentful Landing Page

A modern, enterprise-grade landing page built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Contentful CMS**. This project demonstrates advanced web development practices, scalable architecture, and professional content management implementation.

> **🌐 Live Demo:** [https://contentful-landing-page-r23h76yri-abhisheks-projects-f82e1975.vercel.app](https://contentful-landing-page-r23h76yri-abhisheks-projects-f82e1975.vercel.app)

## ✨ Key Features

### 🎯 **Core Technologies**
- **Next.js 14** with App Router and Server Components
- **TypeScript** for type safety and enhanced developer experience
- **Tailwind CSS** for responsive, utility-first styling
- **Contentful CMS** for headless content management
- **Vercel** deployment with optimized performance

### 🏗️ **Architecture Highlights**
- **🔧 Programmatic Content Model Management** - Complete CMS setup via code, no manual configuration
- **📱 Mobile-First Responsive Design** - Adaptive layouts and content for all devices
- **⚡ Performance Optimized** - Image preloading, lazy loading, and optimized bundle sizes
- **🎨 Component-Based CMS Architecture** - Reusable content types and modular design
- **🔍 SEO & Accessibility Ready** - Semantic HTML, meta tags, and WCAG compliance

### 🖼️ **Landing Page Sections**
- **🎪 Hero Section** - Dynamic background images, dual CTAs, trust indicators
- **🎠 Carousel Section** - Interactive content slider with auto-advance and thumbnails
- **⚙️ Services Section** - Rich content showcase with multiple layout options
- **🧭 Navigation** - Multi-level dropdown menus with responsive design
- **📄 Footer** - Comprehensive company info, links, and social media integration

## 🎨 Content Models Architecture

This project features a sophisticated **15-model content architecture** with hierarchical dependencies:

### **🏗️ Foundation Models**
| Model | Purpose | Key Features |
|-------|---------|--------------|
| **Dropdown Item** | Navigation sub-items | URL validation, ordering |
| **CTA Button** | Reusable call-to-action components | Style variants, link behavior |
| **Company Logo** | Trust indicators & partnerships | Image constraints, alt text |
| **Carousel Slide** | Individual slider content | Rich media, optional links |
| **Service Item** | Service showcase items | Rich text, featured flags |
| **Footer Link** | Footer navigation items | Flexible URL support |
| **Social Link** | Social media profiles | Platform icons, HTTPS validation |

### **🔗 Composite Models**
| Model | Dependencies | Purpose |
|-------|--------------|---------|
| **Menu Item** | Dropdown Item | Navigation with conditional dropdowns |
| **Footer Link Group** | Footer Link | Organized footer sections |

### **📄 Section Models**
| Model | Dependencies | Features |
|-------|--------------|----------|
| **Navigation** | Menu Item | Logo, responsive menus, header CTA |
| **Hero Section** | CTA Button, Company Logo | Responsive images/text, dual CTAs |
| **Carousel Section** | Carousel Slide | Auto-advance, thumbnails, indicators |
| **Services Section** | Service Item | Multiple layouts, background themes |
| **Footer Section** | Footer Link Group, Social Link | Complete footer configuration |

### **🎯 Content Management Features**
- **📏 Smart Validations** - Size limits, regex patterns, file constraints
- **🖼️ Image Optimization** - Fixed aspect ratios, size limits, responsive variants
- **🔄 Dependency Management** - Automated creation order, referential integrity
- **✍️ Editor Experience** - Help tooltips, predefined options, visual feedback

## 📋 Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Contentful Account** (free tier available)
- **Vercel Account** (for deployment)

## 🛠️ Installation & Setup

### 1. **Clone & Install**
```bash
git clone https://github.com/abhi-j04/contentful-landing-page.git
cd contentful-landing-page
npm install
```

### 2. **Environment Configuration**
```bash
cp .env.example .env.local
```

Add your Contentful credentials to `.env.local`:
```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
CONTENTFUL_MANAGEMENT_TOKEN=your_management_token
CONTENTFUL_ENVIRONMENT=master
```

### 3. **Automated Content Model Setup**
```bash
npm run contentful:setup
```
This command will:
- Create all 15 content models in correct dependency order
- Set up validations and constraints
- Publish models for immediate use

### 4. **Development**
```bash
npm run dev
```
Visit `http://localhost:3000` to see your landing page.

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run type-check` | TypeScript type checking |
| `npm run contentful:setup` | Create Contentful content models |
| `npm run contentful:export` | Export existing content models |

## 📁 Project Structure

```
contentful-landing-page/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes for data fetching
│   │   ├── layout.tsx         # Root layout with footer
│   │   └── page.tsx           # Homepage with sections
│   ├── components/
│   │   ├── layout/            # Navigation, Footer, Layout
│   │   ├── sections/          # Hero, Carousel, Services
│   │   └── ui/                # Reusable UI components
│   ├── lib/                   # Contentful API & utilities
│   ├── types/                 # TypeScript definitions
│   ├── hooks/                 # Custom React hooks
│   └── utils/                 # Helper functions
├── contentful/
│   └── models/                # Content model definitions
├── scripts/
│   └── contentful/            # Setup & management scripts
└── public/
    └── images/                # Static images & assets
```

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### **Environment Variables for Production**
```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_production_token
CONTENTFUL_ENVIRONMENT=master
```

## 🎯 Technical Highlights

### **Performance Optimizations**
- **Image Preloading** - Critical hero images loaded with `<link rel="preload">`
- **Responsive Images** - Separate mobile/desktop assets with media queries
- **Bundle Optimization** - Tree-shaking and code splitting
- **Server-Side Rendering** - Fast initial page loads

### **Developer Experience**
- **Type Safety** - Full TypeScript coverage with Contentful types
- **Code Quality** - ESLint, Prettier, and strict type checking
- **Scalable Architecture** - Modular components and clear separation of concerns
- **Documentation** - Comprehensive inline comments and README

### **Content Management**
- **Code-First Approach** - No manual Contentful web UI configuration needed
- **Validation & Constraints** - Robust content validation rules
- **Dependency Management** - Smart model creation order
- **Editor-Friendly** - Clear field descriptions and help text

## 🔄 Content Workflow

1. **Setup Models** - Run `npm run contentful:setup`
2. **Create Content** - Add entries in Contentful web app
3. **Preview** - Content appears automatically on your site
4. **Deploy** - Push to GitHub for automatic Vercel deployment

## 🌟 Key Achievements

- ✅ **15 Interconnected Content Models** with smart dependencies
- ✅ **Fully Responsive Design** with mobile-first approach
- ✅ **Enterprise-Grade Architecture** suitable for large-scale projects
- ✅ **Performance Optimized** with preloading and image optimization
- ✅ **Type-Safe Development** with comprehensive TypeScript integration
- ✅ **Automated Setup** requiring zero manual CMS configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using modern web technologies and best practices.**