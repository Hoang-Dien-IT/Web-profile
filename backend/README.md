# Portfolio Backend API

A comprehensive REST API for a modern portfolio website built with Node.js, Express.js, and MongoDB.

## Features

### 🚀 Core Features
- **Profile Management**: Complete profile information with avatar and resume upload
- **Project Showcase**: Dynamic project portfolio with image galleries
- **Skills & Technologies**: Categorized skill management with proficiency levels
- **Work Experience**: Professional experience timeline
- **Education History**: Educational background management
- **Contact System**: Advanced contact form with email notifications

### 🔒 Security & Performance
- **Rate Limiting**: Prevents API abuse
- **Data Validation**: Comprehensive input validation with Joi
- **File Upload Security**: Secure file handling with type validation
- **CORS Configuration**: Cross-origin resource sharing setup
- **Compression**: Response compression for better performance
- **Security Headers**: Helmet.js for security headers

### 📧 Email Features
- **Contact Notifications**: Admin email notifications for new messages
- **Auto-replies**: Confirmation emails to users
- **Reply System**: Direct reply to contacts from the API

### 📁 File Management
- **Avatar Upload**: Profile picture management
- **Resume Upload**: CV/Resume file handling
- **Project Images**: Multiple image uploads per project
- **Logo Management**: Company/institution logo uploads

## API Endpoints

### Profile
- `GET /api/profile` - Get profile information
- `POST /api/profile` - Create/Update profile
- `GET /api/profile/stats` - Get profile statistics
- `POST /api/profile/avatar` - Upload avatar
- `POST /api/profile/resume` - Upload resume

### Projects
- `GET /api/projects` - Get all projects (with pagination & filters)
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/images` - Upload project images
- `GET /api/projects/category/:category` - Get projects by category

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/stats` - Get skill statistics
- `GET /api/skills/category/:category` - Get skills by category
- `GET /api/skills/:id` - Get single skill
- `POST /api/skills` - Create new skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

### Experience
- `GET /api/experience` - Get all work experiences
- `GET /api/experience/:id` - Get single experience
- `POST /api/experience` - Create new experience
- `PUT /api/experience/:id` - Update experience
- `DELETE /api/experience/:id` - Delete experience

### Education
- `GET /api/education` - Get all education records
- `GET /api/education/:id` - Get single education record
- `POST /api/education` - Create new education
- `PUT /api/education/:id` - Update education
- `DELETE /api/education/:id` - Delete education

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (Admin)
- `GET /api/contact/stats` - Get contact statistics
- `GET /api/contact/:id` - Get single contact
- `PUT /api/contact/:id/status` - Update contact status
- `POST /api/contact/:id/reply` - Reply to contact
- `PUT /api/contact/:id/spam` - Mark as spam

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Email service credentials (Gmail recommended)

### Environment Variables
Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio

# JWT Configuration (if authentication is added)
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@yourportfolio.com

# File Upload Configuration
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=jpg,jpeg,png,gif,pdf,doc,docx
```

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up MongoDB**
   - Install MongoDB locally or use MongoDB Atlas
   - Update `MONGODB_URI` in `.env`

3. **Configure Email**
   - Set up Gmail App Password or use another SMTP service
   - Update email configuration in `.env`

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Start Production Server**
   ```bash
   npm start
   ```

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database connection
├── controllers/             # Request handlers
│   ├── profileController.js
│   ├── projectController.js
│   ├── skillController.js
│   ├── experienceController.js
│   ├── educationController.js
│   └── contactController.js
├── middleware/             # Custom middleware
│   ├── errorHandler.js
│   ├── notFound.js
│   ├── upload.js
│   └── validation.js
├── models/                 # Database models
│   ├── Profile.js
│   ├── Project.js
│   ├── Skill.js
│   ├── Experience.js
│   ├── Education.js
│   └── Contact.js
├── routes/                 # API routes
│   ├── profile.js
│   ├── projects.js
│   ├── skills.js
│   ├── experience.js
│   ├── education.js
│   └── contact.js
├── uploads/               # File uploads directory
├── utils/                 # Utility functions
│   └── helpers.js
├── src/
│   └── server.js         # Main server file
└── package.json
```

## Data Models

### Profile
- Personal information and bio
- Contact details and location
- Social media links
- Avatar and resume files

### Project
- Project details and descriptions
- Technology stack
- Project images and links
- Category and status
- Featured project flag

### Skill
- Skill name and category
- Proficiency level (1-100)
- Years of experience
- Visual customization (icon, color)

### Experience
- Company and position details
- Employment type and duration
- Achievements and technologies used
- Company logo and website

### Education
- Institution and degree information
- Field of study and duration
- GPA and achievements
- Relevant coursework

### Contact
- Contact form submissions
- Project requirements and budget
- Status tracking and spam detection
- Admin management features

## Usage Examples

### Get Featured Projects
```javascript
fetch('/api/projects/featured')
  .then(response => response.json())
  .then(data => console.log(data.data));
```

### Submit Contact Form
```javascript
const contactData = {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Web Development Project',
  message: 'I need a website for my business...',
  projectType: 'web-development',
  budget: '5k-10k',
  timeline: '1-3months'
};

fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(contactData)
})
.then(response => response.json())
.then(result => console.log(result));
```

## Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "details": []  // For validation errors
  }
}
```

## Success Response Format

```json
{
  "success": true,
  "data": {},  // Response data
  "pagination": {}  // For paginated responses
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details