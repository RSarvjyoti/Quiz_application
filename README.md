# Quiz Application

## Live Links
- **Frontend:** [https://quiz-application-seven-beta.vercel.app/](https://quiz-application-seven-beta.vercel.app/)  
- **Backend:** [https://quiz-application-9suo.onrender.com/](https://quiz-application-9suo.onrender.com/)  

---

## Tech Stack

### Frontend
- React.js  
- Tailwind CSS  

### Backend
- Node.js  
- Express.js  
- MongoDB  

### Cloud Storage
- MongoDB Atlas  
- Cloudinary  

### Deployment
- Frontend: Vercel  
- Backend: Render  

---

## Features
- User Authentication (Signup/Login)  
- Quiz Creation & Participation  
- Score Tracking & Progress Management  
- Responsive Design for Mobile & Desktop  
- Admin Panel for Managing Users & Questions  

---

## API Endpoints

### **User Authentication**
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/auth/signup` | POST | Register a new user with optional photo upload | Public |
| `/api/auth/signin` | POST | Login existing user | Public |
| `/api/auth/logout` | POST | Logout user | Authenticated |
| `/api/auth/me` | GET | Get logged-in user details | Authenticated |
| `/api/auth/users` | GET | Get all users (Admin only) | Admin |

**Validation Rules for Signup**
- `name`: 2-20 characters  
- `email`: valid email format  
- `password`: 8-16 characters  
- `address` (optional): max 400 characters  

---

### **Quiz Questions**
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/question/add-question` | POST | Add a new quiz question | Admin |
| `/api/question/categories` | GET | Get all question categories | Authenticated |
| `/api/question/questions` | GET | Get all questions | Authenticated |
| `/api/question/questions/:category` | GET | Get questions filtered by category | Authenticated |

---

### **Progress**
| Endpoint | Method | Description | Access |
|----------|--------|-------------|--------|
| `/api/progress/save` | POST | Save user progress & scores | Authenticated |
| `/api/progress/get` | GET | Get user progress | Authenticated |

---

## Screenshots

- Sign Up page
- Sign In page
- Home Page
- Questions Page
- Progress Track Page
- Admin Panel / Dashboard
- Users Page

---

## Notes
- **Authentication:** JWT-based; access to private routes requires a valid token.  
- **Admin Panel:** Admin can manage users and add questions.  
- **Responsive Design:** Works on both mobile and desktop screens.  
- **Cloud Storage:** User profile photos are stored in Cloudinary.  

## Connect with me : 
<a href="https://www.linkedin.com/in/sarvjyoti05/">LinkedIn</a>