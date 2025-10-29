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

### Cloud-hosted database
- MongoDB Atlas
### Cloud Storage for Media
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
### Folder Structure 
- Client
  ---
  <img width="260" height="508" alt="Screenshot (1183)" src="https://github.com/user-attachments/assets/155455b7-43f7-49dd-995f-e9728f388748" />
- Server
  ---
  <img width="248" height="455" alt="Screenshot (1184)" src="https://github.com/user-attachments/assets/a4a1d6c4-55bb-4dc1-b7cd-b415c8c707e0" />
  <img width="243" height="317" alt="Screenshot (1185)" src="https://github.com/user-attachments/assets/0496f7e5-8738-4404-99fd-169a79b15fa7" />

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
  <img width="1366" height="892" alt="Signup" src="https://github.com/user-attachments/assets/52c61f02-74de-4520-bdc2-2933c7b2169a" />


- Sign In page
  ---
  <img width="1366" height="892" alt="Signin" src="https://github.com/user-attachments/assets/288f1c45-5d76-423e-b817-712e8f066b55" />


- Home Page
  ---
  <img width="1366" height="892" alt="home" src="https://github.com/user-attachments/assets/6a6c5a07-19b3-4c15-bf56-1c2680dada42" />


- Questions Page
  ---
  <img width="1366" height="1033" alt="screencapture-quiz-application-seven-beta-vercel-app-questions-2025-10-03-19_06_31" src="https://github.com/user-attachments/assets/bc3230a5-97c6-4dac-927a-4ce990415fe1" />

<img width="1366" height="1153" alt="screencapture-quiz-application-seven-beta-vercel-app-questions-2025-10-03-19_09_19" src="https://github.com/user-attachments/assets/44ba3b0b-1d05-40ad-a44c-04a32abb5d25" />

- Progress Track Page
  ---
 <img width="1366" height="892" alt="progress Track" src="https://github.com/user-attachments/assets/27d7afd2-2c55-44b0-8982-bd0beb312aef" />


- Admin Panel / Dashboard
  ---
  <img width="1366" height="892" alt="Dashboard" src="https://github.com/user-attachments/assets/f17b915f-761b-497d-9aeb-ebe07a498348" />
  - Add Questions
    ---
    <img width="1366" height="892" alt="screencapture-quiz-application-seven-beta-vercel-app-add-quetions-2025-10-05-13_18_27" src="https://github.com/user-attachments/assets/9abbf176-2c63-45f2-b34b-3f7930adec5f" />

    

- Users Page
  ---
  <img width="1366" height="892" alt="screencapture-quiz-application-seven-beta-vercel-app-users-2025-10-03-17_57_58" src="https://github.com/user-attachments/assets/f5f84127-a4cf-4cb6-bcc8-feef82bc878e" />


---

## Notes
- **Authentication:** JWT-based; access to private routes requires a valid token.  
- **Admin Panel:** Admin can manage users and add questions.  
- **Responsive Design:** Works on both mobile and desktop screens.  
- **Cloud Storage:** User profile photos are stored in Cloudinary.  

## How will you access project on your local system
```
git clone https://github.com/RSarvjyoti/Quiz_application.git
// access client code
cd client
npm npm i
npm run dev

// access backend code
cd server
npm i
npm start

// access env go to .env.example file
// access admin dashboard with this: email => sarvjyoti@gmail.com, password : 12345678

```

## Connect with me : 
<a href="https://www.linkedin.com/in/sarvjyoti05/">LinkedIn</a>
