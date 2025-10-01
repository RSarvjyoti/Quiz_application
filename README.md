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
  ---
  <img width="1366" height="892" alt="Signup" src="https://github.com/user-attachments/assets/d6803cbd-4160-4862-9008-8e08433a8640" />

- Sign In page
  ---
  <img width="1366" height="892" alt="Signin" src="https://github.com/user-attachments/assets/7b10c346-f183-4cc6-bf1d-05514fcdcca7" />

- Home Page
  ---
  <img width="1366" height="892" alt="Home" src="https://github.com/user-attachments/assets/4c3e1037-ed1f-4d0b-a96c-001b0e3f91c1" />

- Questions Page
  ---
  <img width="1366" height="973" alt="Questions" src="https://github.com/user-attachments/assets/9b1c67c2-3349-4dc1-84da-1cc8c4a82e14" />

- Progress Track Page
  ---
  <img width="1366" height="892" alt="Progress Track" src="https://github.com/user-attachments/assets/07198ab2-9c03-4808-bdf9-cab14b8031d6" />

- Admin Panel / Dashboard
  ---
  <img width="1366" height="892" alt="Dashboard" src="https://github.com/user-attachments/assets/e062f6ea-ed26-445f-ba97-96a9a6022a39" />

- Users Page
  ---
  <img width="1366" height="892" alt="Users" src="https://github.com/user-attachments/assets/cc5283b7-fec3-4193-8815-5bb90c7729f2" />

---

## Notes
- **Authentication:** JWT-based; access to private routes requires a valid token.  
- **Admin Panel:** Admin can manage users and add questions.  
- **Responsive Design:** Works on both mobile and desktop screens.  
- **Cloud Storage:** User profile photos are stored in Cloudinary.  

## Connect with me : 
<a href="https://www.linkedin.com/in/sarvjyoti05/">LinkedIn</a>
