# 🐞 Bug Tracker Application  

A simple Bug Tracker Application that allows developers and managers to manage tasks and bugs efficiently. This app includes user authentication, role-based dashboards, task/bug creation and management, and approval workflows.

---

## 🏆 Login Credentials  

| Role     | Email                  | Password     |  
|----------|------------------------|--------------|  
| Developer | developer@example.com  | password123   |  
| Manager   | manager@example.com    | password123   |  


## 🚀 Features  
### 1. **User Authentication/Role**  
- Simple login system with mock authentication using hardcoded credentials.  
- Users are assigned either a **Developer** or **Manager** role.  
- Successful login redirects to the appropriate dashboard based on the user role.  

### 2. **Dashboard**  
- **Developer Dashboard**:  
    - View and manage personal tasks/bugs.  
    - Display of ongoing tasks and trends via a trend line.  

- **Manager Dashboard**:  
    - View all open and closed bugs.  
    - Approve or reject bug closures.  

### 3. **Task/Bug Creation**  
- Developers can create tasks/bugs with fields like:  
    - **Title**  
    - **Description**  
    - **Priority**  
    - **Status**  
    - **Assignee**  
    - **Important Dates**  

### 4. **Task/Bug Management**  
- Developers can:  
    - Edit and delete tasks/bugs.  
    - Filter/sort tasks based on criteria (e.g., priority, status).  
    - Close bugs (which go to the manager for approval).  

- Managers can:  
    - Approve or reopen bugs in the "Pending Approval" state.  

---

## 🏗️ **Setup and Installation**  

### 1. **Clone the Repository**  
```bash
git clone https://github.com/your-repo/bug-tracker.git
cd bug-tracker
```

### 2. **Install Dependencies** 
```bash
npm install
```

### 3. ** Run the Application** 
```bash
npm run dev
```
