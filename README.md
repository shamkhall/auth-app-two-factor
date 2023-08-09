# User Authentication and Two-Factor Authorization Application

This is a small application built to manage user authentication and two-factor authorization using Node.js, MongoDB, GraphQL, and JWT. The application allows users to register, change their password, and log in using two-factor authentication.

## Table of Contents
- [Installation](#installation)
- [Startup](#startup)
- [Functionality](#functionality)
- [Project Structure](#project-structure)
- [Security](#security)
- [SOLID Principles](#solid-principles)

## Installation

1. Make sure you have Node.js and npm installed on your system.
2. Clone this repository: `git clone https://github.com/shamkhall/auth-app-two-factor`
3. Navigate to the project directory: `cd auth-app-two-factor`
4. Install dependencies: `npm install`

## Startup

1. Ensure that you have MongoDB installed and running on your system.
2. Edit `.env.example` file as needed.
3. Run the application: `npm start`

## Functionality

### 1. User Registration
Users can register by providing their email and password. The data is stored securely in MongoDB.

### 2. Password Change
Users can change their password after logging in with their email and password.

### 3. User Authentication using JWT
Upon successful authentication, users receive a JWT token that grants them access to protected resources.

### 4. QR Code Generation for Two-Factor Authorization
Users can generate a QR code containing a secret key that is associated with their account for two-factor authorization.

### 5. Two-Factor Authorization Login
Users must enter their password and a one-time code generated from the QR code to successfully log in.

### 6. GraphQL API
The application provides a GraphQL API using Apollo Server for registration, login, get all users, password change, and two-factor authorization operations.

## Project Structure

The project follows a clean and organized structure:

```
auth-app-two-factor/
├── src/
│   ├── auth/
│   ├── config/
│   ├── error/
│   ├── middleware/
│   ├── main.ts
├── .env.example
├── .gitignore
├── nodemon.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
```

## Security

- User data is stored securely in MongoDB.
- JWT is used for authentication, and a secure JWT secret key is required.
- Two-factor authorization adds an extra layer of security using one-time codes.

## SOLID Principles

The application adheres to SOLID principles by organizing code into separate modules and services for improved maintainability and scalability.
