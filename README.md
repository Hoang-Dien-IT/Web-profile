# 🌟 Modern Web Portfolio

A modern, responsive web portfolio built with **Node.js** backend and **React TypeScript** frontend, featuring stunning animations and glassmorphism UI design.

![Portfolio Preview](https://via.placeholder.com/1200x600/1a1a1a/ffffff?text=Modern+Web+Portfolio)

## 🚀 Features

### Frontend
- ✅ **React 18** with TypeScript for type safety
- ✅ **Framer Motion** for smooth animations  
- ✅ **Tailwind CSS** for modern styling
- ✅ **Glassmorphism** design effects
- ✅ **Responsive** design for all devices
- ✅ **Interactive particles** background
- ✅ **Smooth scrolling** and transitions
- ✅ **Modern gradient** effects and animations

### Backend
- ✅ **Node.js** with Express.js framework
- ✅ **MongoDB** database with Mongoose ODM
- ✅ **JWT Authentication** for secure access
- ✅ **File upload** with Multer
- ✅ **Email service** with Nodemailer
- ✅ **Input validation** with Joi
- ✅ **Rate limiting** for API protection
- ✅ **CORS** enabled for cross-origin requests

## 📁 Project Structure

```
Web-profile/
├── backend/                 # Node.js Backend API
│   ├── config/             # Database configuration
│   ├── controllers/        # API route handlers
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── uploads/           # File upload directory
│   └── src/
│       └── server.js      # Main server file
├── frontend/              # React TypeScript Frontend
│   ├── public/           # Static assets
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Page components
│       ├── hooks/        # Custom React hooks
│       ├── services/     # API service functions
│       ├── types/        # TypeScript type definitions
│       └── utils/        # Utility functions
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Build Tool**: Create React App
- **Icons**: Material-UI Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Email**: Nodemailer
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/web-profile.git
   cd web-profile
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` file in the backend directory:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database
   MONGODB_URI=mongodb://localhost:27017/web-portfolio
   
   # JWT Secret
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   
   # Email Configuration (Optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

### 🏃‍♂️ Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run at: http://localhost:5000

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run at: http://localhost:3000

## 📡 API Endpoints

### Profile Management
- `GET /api/profile` - Get profile information
- `PUT /api/profile` - Update profile information
- `POST /api/profile/upload` - Upload profile image

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Add new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Experience
- `GET /api/experience` - Get work experience
- `POST /api/experience` - Add new experience
- `PUT /api/experience/:id` - Update experience
- `DELETE /api/experience/:id` - Delete experience

### Contact
- `POST /api/contact` - Send contact message

## 🎨 UI Components

### Custom Components
- **Navbar** - Responsive navigation with glassmorphism
- **ParticlesBackground** - Interactive floating animations
- **ScrollToTop** - Smooth scroll to top functionality
- **Home** - Hero section with typing animation
- **About** - Professional information display
- **Projects** - Portfolio showcase with filters
- **Skills** - Animated skill bars and categories
- **Experience** - Timeline-based work history
- **Contact** - Contact form with validation

## 🔧 Build & Deployment

### Development Build
```bash
# Frontend
cd frontend
npm start

# Backend  
cd backend
npm run dev
```

### Production Build
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

### Deployment Options
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Backend**: Heroku, Railway, DigitalOcean
- **Database**: MongoDB Atlas (recommended)

## 📱 Responsive Design

- ✅ **Mobile First** approach
- ✅ **Tablet** optimized layouts
- ✅ **Desktop** enhanced experience
- ✅ **4K displays** support

## 🎭 Animation Features

- ✅ **Page transitions** with Framer Motion
- ✅ **Scroll animations** with AOS library
- ✅ **Hover effects** on interactive elements
- ✅ **Loading animations** for better UX
- ✅ **Gradient animations** for visual appeal

## 🔒 Security Features

- ✅ **JWT Authentication** for secure API access
- ✅ **Input validation** to prevent injection attacks
- ✅ **Rate limiting** to prevent spam
- ✅ **CORS protection** for cross-origin requests
- ✅ **Helmet.js** for security headers

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)  
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/your-profile)
- Email: your.email@example.com

## 🙏 Acknowledgments

- [React](https://reactjs.org/) for the amazing frontend framework
- [Framer Motion](https://framer.com/motion/) for beautiful animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Express.js](https://expressjs.com/) for the robust backend framework
- [MongoDB](https://mongodb.com/) for the flexible database

---

⭐ **Don't forget to star this repo if you found it helpful!**