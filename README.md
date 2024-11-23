# To-Do Application API

This project is a To-Do Application API built with **Node.js**, **Express.js**, and **MongoDB**. It provides features like user authentication, profile management, CRUD operations for to-do items, and additional features like category management, due date reminders, and search functionality.

---

## **Features**
1. **User Authentication (JWT-based)**
   - Sign-up, Login, Logout functionalities.
   - Token-based authentication for secure API access.

2. **User Profile Management**
   - Endpoints to view and update user profile details.

3. **CRUD Operations for To-Dos**
   - **Create:** Add new to-do items with title, description, due date, priority, and status.
   - **Read:** Retrieve existing to-do items with filtering, sorting, and pagination.
   - **Update:** Modify to-do items, including status and priority updates.
   - **Delete:** Soft delete or permanently delete a to-do item.

4. **Additional Features**
   - **Category Management:** Assign categories/tags to to-do items.
   - **Due Date Reminders:** Fetch items nearing their due date (e.g., within the next 3 days).
   - **Search Functionality:** Search to-do items by keywords in the title or description.

---

## **Setup Instructions**

### **Prerequisites**
- **Node.js** (v18.16.1)
- **npm** (v6+)
- **MongoDB Atlas** (or a local MongoDB instance)
- **Postman** (optional for testing APIs)

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/Ritwikdevil/To-Do-Application-Backend-Development.git

2. Install dependencies:
   ```bash
   npm i

3. Create a .env file in the root directory and add the following environment variables:
```bash
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key


***Start the server:***
npm start

The server will run at http://localhost:5000.


## **API Endpoints**

### **User Authentication**
| Method | Endpoint          | Description                 | Authorization |
|--------|-------------------|-----------------------------|---------------|
| POST   | `/api/auth/signup` | Create a new user.          | No            |
| POST   | `/api/auth/login`  | Login and get a token.      | No            |
| POST   | `/api/auth/logout` | Logout and invalidate token.| Yes           |

---

### **User Profile Management**
| Method | Endpoint           | Description             | Authorization |
|--------|--------------------|-------------------------|---------------|
| GET    | `/api/user/profile` | Get user profile.       | Yes           |
| PUT    | `/api/user/profile` | Update user profile.    | Yes           |

---

### **To-Do Management**
| Method | Endpoint                     | Description                                        | Authorization |
|--------|------------------------------|----------------------------------------------------|---------------|
| POST   | `/api/todos`                 | Create a new to-do item.                          | Yes           |
| GET    | `/api/todos`                 | Get all to-dos with filtering, sorting, and pagination.| Yes       |
| GET    | `/api/todos/:id`             | Get a specific to-do item.                        | Yes           |
| PUT    | `/api/todos/:id`             | Update a to-do item.                              | Yes           |
| DELETE | `/api/todos/:id`             | Soft delete a to-do item.                         | Yes           |
| DELETE | `/api/todos/permanent/:id`   | Permanently delete a to-do item.                  | Yes           |

---

### **Additional Features**
| Method | Endpoint                   | Description                                  | Authorization |
|--------|----------------------------|----------------------------------------------|---------------|
| PUT    | `/api/todos/assign-category/:id` | Assign a category to a to-do item.         | Yes           |
| GET    | `/api/todos/due-reminders` | Get to-do items nearing their due date.      | Yes           |
| GET    | `/api/todos/search`        | Search to-dos by title or description.       | Yes           |


  
