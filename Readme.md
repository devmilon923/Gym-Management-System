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

[Link to Relational Diagram](#) _(Replace with actual link or embed the image)_

## Technology Stack

- **Programming Language**: TypeScript/Python
- **Web Framework**: Express.js/Django
- **ORM/ODM**: Mongoose/Prisma
- **Database**: MongoDB/PostgreSQL
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
    "message": "User registered successfully."
  }
  ```

#### `POST /auth/login`

- **Description**: Login for all roles.
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "<JWT_TOKEN>"
  }
  ```

### Admin

#### `POST /admin/schedule`

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
    "message": "Class schedule created successfully."
  }
  ```

### Trainee

#### `POST /trainee/book/:classId`

- **Description**: Book a class schedule.
- **Response**:
  ```json
  {
    "success": true,
    "message": "Class booked successfully."
  }
  ```

#### `DELETE /trainee/cancel/:bookingId`

- **Description**: Cancel a booking.
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

- **Email**: [admin@example.com](mailto:admin@example.com)
- **Password**: admin123

## Instructions to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Environment Variables**:
   Create a `.env` file with the following:
   ```env
   DATABASE_URI=<Your MongoDB/PostgreSQL Connection String>
   JWT_SECRET=<Your JWT Secret>
   ```
4. **Start the Server**:
   ```bash
   npm start
   ```
5. **Test API Endpoints**:
   Use Postman or any API client with the provided endpoints.

## Live Hosting Link

[Live Application Link](#) _(Replace with actual link)_

## Testing Instructions

1. Login using the provided admin credentials.
2. Create trainers and schedules via the admin endpoints.
3. As a trainee, book and cancel classes.
4. Verify constraints like schedule and booking limits.

---

This README provides all the essential details for understanding, running, and testing the project. Ensure all live links and credentials are updated before sub
