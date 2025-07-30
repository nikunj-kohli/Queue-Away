# QueueAway Project

## Project Overview
QueueAway is a queue and appointment management platform built with React, TypeScript, and Firebase. It allows users to register, log in, book appointments, and chat with businesses.

## User Model
- The current user model supports customer registration and login.
- Users can:
  - Register and authenticate using Firebase Auth
  - Book appointments with businesses
  - Chat with businesses
  - View and manage their profile

## Adding a Business Model
- **Planned Feature:** Business registration, verification, and management
- **Impact:**
  - **Backend:**
    - New Firestore collections (e.g., `businesses`, `business_verifications`)
    - The `users` collection will gain a `userType` field (e.g., `customer`, `business`, `admin`)
    - Security rules and queries will be updated
  - **Frontend:**
    - Registration and login flows will support both customers and businesses
    - New pages/components for business registration, dashboard, and admin verification
    - Navigation and context providers will be updated
  - **Database:**
    - Existing user data remains, but new fields and collections will be added
    - Some queries and data relationships will change

## Demo
You can run the current demo at the deployed link provided.

---

**Note:** The business model feature is under development and will require coordinated updates to both backend and frontend. The current demo will continue to work until these changes are merged.
