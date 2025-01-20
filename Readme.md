# Gym Class Scheduling and Membership Management System

## Project Overview

The Gym Class Scheduling and Membership Management System is designed to streamline gym operations by efficiently managing roles, schedules, and memberships. This system includes three roles:

1. **Admin**: Responsible for creating trainers, managing schedules, and assigning trainers.
2. **Trainer**: Conducts classes and views assigned schedules.
3. **Trainee**: Creates and manages their own profiles, books available class schedules, and cancels bookings when necessary.

Key features include:

- A maximum of five schedules per day, each lasting two hours.
- A limit of ten trainees per class.
- Role-based permissions with JWT-based authentication.
- Robust error handling to manage unauthorized access, validation errors, and booking/schedule limits.

## Relational Diagram

[Link to Relational Diagram](https://drive.google.com/file/d/15aSjCTvmEKsSh-EMO3U2L0gQ0DeTjBCS/view?usp=sharing)

## Technology Stack

- **Programming Language**: JavaScript
- **Web Framework**: Express.js
- **ORM/ODM**: Mongoose
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## API Endpoints

### Authentication

#### `POST /auth/register`

- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "trainee"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "User created successfully",
    "Data": {
      "name": "Name",
      "email": "email@gmail.com",
      "role": "Trainee",
      "isVerifyed": false,
      "_id": "678dc931b680********",
      "createdAt": "2025-01-20T03:55:29.691Z"
    }
  }
  ```

#### `POST /auth/login`

- **Description**: Login for all roles.
- **Request Body**:
  ```json
  {
    "email": "example@gmail.com",
    "password": "Example@111"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "User login successfully",
    "Data": {
      "_id": "678e2b67**********",
      "name": "admin",
      "email": "email@gmail.com",
      "role": "Trainee",
      "isVerifyed": false,
      "createdAt": "2025-01-20T10:54:31.348Z",
      "token": "eyJhbGciOiJIUzI1NiIs*********"
    }
  }
  ```

### Admin

#### `POST /admin/add-classes`

- **Description**: Create a new class schedule.
- **Request Body**:
  ```json
  {
    "trainerId": "trainer_id",
    "startTime": "2025-01-20T10:00:00.000Z",
    "endTime": "2025-01-20T12:00:00.000Z"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "success": true,
    "statusCode": 201,
    "message": "Class schedule created successfully."
  }
  ```

#### `GET /admin/view-request`

- **Description**: View all requests.
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "requestId": "id",
        "details": "Request details."
      }
    ]
  }
  ```

#### `GET /admin/update-request/:id`

- **Description**: Update a specific request.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Request updated successfully."
  }
  ```

#### `GET /admin/view-request/:id`

- **Description**: View details of a specific request.
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "requestId": "id",
      "details": "Request details."
    }
  }
  ```

#### `POST /admin/add-classes`

- **Description**: Add new classes.
- **Request Body**:
  ```json
  {
    "trainerId": "trainer_id",
    "startTime": "2025-01-20T10:00:00.000Z",
    "endTime": "2025-01-20T12:00:00.000Z"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Class added successfully."
  }
  ```

### Trainer

#### `GET /trainer/active-classes`

- **Description**: Get a list of active classes assigned to the trainer.
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "classId": "id",
        "startTime": "2025-01-20T10:00:00.000Z",
        "endTime": "2025-01-20T12:00:00.000Z"
      }
    ]
  }
  ```

### Account

#### `GET /account/profile`

- **Description**: View user profile.
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "trainee"
    }
  }
  ```

#### `POST /account/update-profile`

- **Description**: Update user profile.
- **Request Body**:
  ```json
  {
    "name": "John Doe Updated",
    "email": "john.updated@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Profile updated successfully."
  }
  ```

#### `POST /account/trainee-request`

- **Description**: Submit a trainee request.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Request submitted successfully."
  }
  ```

#### `POST /account/trainer-request`

- **Description**: Submit a trainer request.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Request submitted successfully."
  }
  ```

### Trainee

#### `GET /trainee/active-classes`

- **Description**: Get a list of active classes available for booking.
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "classId": "id",
        "startTime": "2025-01-20T10:00:00.000Z",
        "endTime": "2025-01-20T12:00:00.000Z"
      }
    ]
  }
  ```

#### `GET /trainee/book-classes/:id`

- **Description**: Book a class by ID.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Class booked successfully."
  }
  ```

#### `GET /trainee/cancel-booking/:id`

- **Description**: Cancel a booking by ID.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Booking canceled successfully."
  }
  ```

### Common

#### Error Responses

- **Validation Error**:
  ```json
  {
    "success": false,
    "message": "Validation error occurred.",
    "errorDetails": {
      "field": "email",
      "message": "Invalid email format."
    }
  }
  ```
- **Unauthorized Access**:
  ```json
  {
    "success": false,
    "message": "Unauthorized access."
  }
  ```
- **Booking Limit Exceeded**:
  ```json
  {
    "success": false,
    "message": "Class schedule is full. Maximum 10 trainees allowed per schedule."
  }
  ```

## Database Schema

### User

```json
{
  "_id": "ObjectId",
  "name": "String",
  "email": "String",
  "password": "String",
  "role": "String (admin/trainer/trainee)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Class

```json
{
  "_id": "ObjectId",
  "trainer": "ObjectId",
  "startTime": "Date",
  "endTime": "Date",
  "trainees": ["ObjectId"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Booking

```json
{
  "_id": "ObjectId",
  "classDB": "ObjectId",
  "trainee": "ObjectId",
  "status": "Boolean",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## Admin Credentials

- **Email**: [admin@gmail.com](mailto:admin@gmail.com)
- **Password**: Admin@3333

## Instructions to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/devmilon923/Gym-Management-System.git
   cd <repository-folder>
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Environment Variables**:
   Create a `.env` file with the following `.env.sample`:
   ```
    server_url='APP URL'
    mongodbURI='MongoDBURI'
    jwtKey='jwtPrivate'
   ```
4. **Start the Server**:
   ```bash
   npm start
   ```
5. **Test API Endpoints**:
   Use Postman or any API client with the provided endpoints.

## Live Hosting Link

[Live Application Link](https://gym-management-system-henna.vercel.app/)

## Testing Instructions

1. Login using the provided admin credentials.
2. Create trainers and schedules via the admin endpoints.
3. As a trainee, book and cancel classes.
4. Verify constraints like schedule and booking limits.

---

This README provides all the essential details for understanding, running, and testing the project. Ensure all live links and credentials are updated before sub
