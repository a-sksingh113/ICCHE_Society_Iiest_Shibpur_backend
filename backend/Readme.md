# ICCHE Society Backend

## Overview
The backend for the **ICCHE Society** website is built using **Node.js, Express.js, MongoDB , Cloudinary , Nodemailer**. This project manages students, volunteers, alumni, events, donations, and activities while ensuring authentication and authorization.

## Features
- **Authentication:** Admin sign-in and sign-up with JWT-based authentication.
- **Role-Based Access:**  PIC (Professor-In-Charge), Volunteer as Admin.
- **Event & Activity Management:** CRUD operations for events, donations, and activities.
- **User Management:** Handles students, volunteers, and alumni.
- **Media Uploads:** Cloudinary integration for image and video uploads.

---

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 16.x)
- **MongoDB**
- **Cloudinary Account** (for media uploads)

### Steps to Run Locally
```bash
# Clone the repository
git clone https://github.com/a-sksingh113/Icche_Society_Iiest_Shibpur.git
cd backend

# Install dependencies
npm install

# Setup environment variables (Create a .env file and configure as per .env.example)
PORT = <your port>
JWT_SECRET = <your jwt secret>
MONGO_URI = <your mongo uri>
CLOUDINARY_CLOUD_NAME=<your cloudinary cloud name>
CLOUDINARY_API_KEY=<your cloudinary api key>
CLOUDINARY_API_SECRET=<your cloudinary api secret>
EMAIL = <your email>
EMAIL_PASSWORD =<your email password>
ADMIN_EMAIL = <your admin email>
FRONTEND_URL = <your frontend url>


# Run the server
npm start 
or 
npm run dev
```

---

## API Routes

### **Authentication Routes for Admin ** (`/api/admin`)
| Method | Endpoint       | Description              | Access  |
|--------|---------------|--------------------------|---------|
| POST   | `/signup`      | Register as a admin      | Private  |
| POST   | `/signin`       | Authenticate admin        | Private |
| POST   | `/logout`      | Logout user              | Private  |
| GET    | `/profile`     | Get admin profile         | Authenticated |

### **students , alumni , volunteer  Management** (`/api/users`)
For example : this is for students similary for alumni and volunteer 
| Method | Endpoint      | Description             | Access |
|--------|--------------|-------------------------|--------|
| GET    | `/students`  | Get all students        | Public |
| GET    | `/students/:id` | Get student by ID | Public |
| POST   | `/students/add-students` | Add new student | Admin/PIC |
| PUT    | `/students/:id` | Update student | Admin/PIC |
| DELETE | `/students/:id` | Delete student | Admin/PIC |

### **Volunteers & Alumni** (`/api/volunteers`, `/api/alumni`)
Similar to student routes.

### **Event Routes** (`/api/events`)
for example : this is for sports day which is comes under activities
| Method | Endpoint        | Description                | Access  |
|--------|----------------|----------------------------|---------|
| GET    | `/events/activities`      | Get all events             | Public  |
| GET    | `/events/activities/:id`  | Get event details          | Public  |
| POST   | `/events/activities/add-activities`  | Add new event              | Admin/PIC |
| PUT    | `/events/:activities/id`  | Update event details       | Admin/PIC |
| DELETE | `/events/activities/:id`  | Delete an event            | Admin/PIC |

### **Donations** (`/api/donations`)
| Method | Endpoint      | Description             | Access  |
|--------|--------------|-------------------------|---------|
| GET    | `/cloth-donations`  | Get all donations        | Public  |
| POST   | `/cloth-donations/add` | Add a donation        | PIC/Volunteer |
| PUT    | `/cloth-donations/:id` | Update donation       | PIC/Volunteer |
| DELETE | `/cloth-donations/:id` | Delete donation       | PIC/Volunteer |


---

## Authentication & Roles
- **JWT-based authentication** ensures secure access.
- **Role-based access control (RBAC):**
 
  - **PIC and Volunteer as Admin** Can manage students, volunteers, events, and donations.
 

---

## Contributions
We welcome contributions! Follow these steps:
1. **Fork the repository**
2. **Create a feature branch**
3. **Make necessary changes and commit**
4. **Open a Pull Request (PR)**

---
## License
@Satish_Kumar_Singh, 2025. All rights reserved.
This project is licensed under the MIT License.

---

## Contact
For any queries or contributions, contact **[i.sksingh113@gmail.com]**.

