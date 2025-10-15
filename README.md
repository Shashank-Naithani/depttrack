# 🏢 DeptTrack — Department Task Tracker

DeptTrack is a **production-ready full stack application** built using **React, Redux Toolkit, and Firebase**.  
It helps organizations efficiently manage departmental tasks by allowing admins or department members to create, assign, and track tasks in real-time.

---

## 🚀 Tech Stack

**Frontend:**

- ⚛️ React (Vite)
- 🧭 React Router
- 🧠 Redux Toolkit (for state management)
- 🎨 Tailwind CSS (for UI styling)

**Backend & Database:**

- 🔥 Firebase Authentication
- 🔐 Firestore Database
- ☁️

---

## ✨ Features

✅ Modern React architecture using **functional components** and **Redux Toolkit slices**  
✅ Integrated **Firebase Authentication** for secure user management  
✅ Real-time data using **Cloud Firestore**  
✅ Department-wise **task tracking** and **status updates**  
✅ **Optimized folder structure** following best React + Redux practices  
✅ Environment variables managed via `.env` file  
✅ **Scalable and production-ready** configuration

---

## 🗂️ Firestore Collections Schema

### 1. `departments`

| Field  | Type   | Description          |
| ------ | ------ | -------------------- |
| `id`   | string | Unique department ID |
| `name` | string | Department name      |

### 2. `users`

| Field        | Type      | Description                               |
| ------------ | --------- | ----------------------------------------- |
| `id`         | string    | User ID                                   |
| `name`       | string    | Full name of the user                     |
| `email`      | string    | User email address                        |
| `department` | reference | Reference to the `departments` collection |

### 3. `tasks`

| Field         | Type      | Description                                         |
| ------------- | --------- | --------------------------------------------------- |
| `id`          | string    | Task ID                                             |
| `title`       | string    | Task title                                          |
| `description` | string    | Task details                                        |
| `department`  | string    | Department name or ID                               |
| `status`      | string    | Task status (e.g., pending, in-progress, completed) |
| `dueDate`     | timestamp | Task deadline                                       |

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```
