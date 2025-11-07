---

# Employee Management System (Spring Boot + React + JWT)

This is a full-stack employee management system developed using **Spring Boot (Java)** for the backend and **React.js** for the frontend.
The project implements **JWT-based authentication**, **role-based authorization**, and **audit logging** for login and logout activities.

---

## Project Overview

This application allows users to:

* Register and log in securely using JWT authentication.
* Add, view, and delete employee records.
* View and search employee details.
* Automatically record login and logout times.
* Track failed login attempts and lock accounts after multiple failures.
* Manage access based on user roles (`USER` or `ADMIN`).

---

## Tech Stack

### Backend

* Java 17
* Spring Boot 3
* Spring Security 6
* JWT (JSON Web Token)
* PostgreSQL
* Maven

### Frontend

* React.js (Vite)
* HTML, CSS, JavaScript (Fetch API)

---

## Database Details

### Database Used:

**PostgreSQL**

### Tables:

#### 1. users

Stores all registered users, including their authentication details and activity timestamps.

| Column Name      | Data Type                   | Description                                |
| ---------------- | --------------------------- | ------------------------------------------ |
| id               | bigint (Primary Key)        | Unique user ID                             |
| username         | varchar                     | User's name                                |
| password         | varchar                     | Encrypted password                         |
| role             | varchar                     | Role of the user (ADMIN/USER)              |
| failed_attempt   | integer                     | Number of failed login attempts            |
| account_locked   | boolean                     | True if account is locked after 3 failures |
| last_login_time  | timestamp without time zone | Last login time                            |
| last_logout_time | timestamp without time zone | Last logout time                           |

---

#### 2. login_audit

Tracks each user’s login and logout activities.

| Column Name | Data Type                   | Description      |
| ----------- | --------------------------- | ---------------- |
| id          | bigint (Primary Key)        | Unique record ID |
| username    | varchar                     | Name of the user |
| login_time  | timestamp without time zone | Time of login    |
| logout_time | timestamp without time zone | Time of logout   |

---

#### 3. registration_entity

Stores all employee registration details.

| Column Name  | Data Type            | Description   |
| ------------ | -------------------- | ------------- |
| id           | bigint (Primary Key) | Employee ID   |
| name         | varchar              | Employee name |
| email        | varchar              | Email address |
| mobilenumber | double precision     | Mobile number |
| address      | varchar              | Address       |
| dob          | date                 | Date of birth |

---

## API Endpoints

| Method | Endpoint                | Description                           | Access        |
| ------ | ----------------------- | ------------------------------------- | ------------- |
| POST   |  /auth/register         | Register a new user                   | Public        |
| POST   |  /auth/login            | Authenticate user and issue JWT token | Public        |
| POST   |  /auth/logout           | Record user logout activity           | Authenticated |
| POST   |  /api/employees/create  | Add a new employee                    | USER / ADMIN  |
| GET    |  /api/employees/get     | Retrieve all employees                | USER / ADMIN  |
| DELETE |  /api/employees/{id}    | Delete employee by ID                 | ADMIN only    |

---

  
<img width="936" height="306" alt="{8ADA23C9-6A3D-470B-AAC6-E2F441AD4B3B}" src="https://github.com/user-attachments/assets/36d1d773-b3c9-4607-8f09-bbb438b2ea43" />
<img width="704" height="353" alt="{9B347873-FC57-4BF2-9FE5-8CA15ABB4C06}" src="https://github.com/user-attachments/assets/9d0dcda2-016c-4a21-bbbe-4f09d93f9be5" />
<img width="932" height="228" alt="{BA81ED66-7306-4535-8FD4-39E835C50B18}" src="https://github.com/user-attachments/assets/2c035497-01a2-4124-95bd-a4d061e4228a" />

<img width="501" height="386" alt="{4BD06F46-A3B4-405E-855C-9F92C0B3870E}" src="https://github.com/user-attachments/assets/6ce22d54-85f2-47e1-8410-dba2008f2496" />

<img width="523" height="321" alt="{0A68300E-F346-4BBC-B7D0-4757B9E55DD5}" src="https://github.com/user-attachments/assets/e9a929bd-5a62-4825-ae20-0e49576a4649" />

<img width="483" height="182" alt="{63A6C083-B220-46E3-A969-D26D4CCA1C8F}" src="https://github.com/user-attachments/assets/55c72dcc-1c95-49d6-a965-3fc9b8ea4204" />

<img width="467" height="426" alt="{EF1B394C-A39E-4BEA-A6AC-A76D575821B6}" src="https://github.com/user-attachments/assets/debe99fd-c75c-49d2-bb25-24ae98794de3" />

<img width="501" height="372" alt="{9ACF45E9-E3F8-430F-8A7F-860A50A1AC94}" src="https://github.com/user-attachments/assets/973d9111-1c52-4a2d-a94b-cb8e9345e9f9" />

