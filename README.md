# [Image Globe](https://image-globe.vercel.app)

## Table of Contents
1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [Contact](#contact)

## Features
- **Image Management:** Users can upload, view, update, and delete images.
- **User Authentication:** Supports email and Google login, password recovery, and account management.
- **Firebase Integration:** Utilizes Firebase for authentication and cloud storage.

## Technology Stack
- **Frontend:** React
- **Authentication:** Firebase Authentication
- **Storage:** Firebase Storage
- **Hosting:** Firebase Hosting
- **Build Tool:** Vite

## Prerequisites
- **Node.js:** Ensure Node.js is installed on your machine. Download it from [nodejs.org](https://nodejs.org/).
- **Firebase Account:** Set up a Firebase project in the [Firebase Console](https://console.firebase.google.com/).

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/image-globe.git
   cd image-globe
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory with the following content:
   ```env
   VITE_API_KEY=your-firebase-api-key
   VITE_AUTH_DOMAIN=your-firebase-auth-domain
   VITE_PROJECT_ID=your-firebase-project-id
   VITE_STORAGEBUCKET=your-firebase-storage-bucket
   VITE_MESSAGINGSENDER_ID=your-firebase-messaging-sender-id
   VITE_APP_ID=your-firebase-app-id
   ```

## Running the Application

1. **Build the Application (Optional):**
   ```bash
   npm run build
   ```
   or
   ```bash
   yarn build
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```
   Open your browser and go to `http://localhost:3000` to view the application.

## Usage
1. **Image Management:**
   - **Upload:** Use the upload button to add new images.
   - **View:** Click on images to view them in a larger format.
   - **Update:** Select an image and update its details.
   - **Delete:** Remove images using the delete option.

2. **User Authentication:**
   - **Login:** Users can log in using email or Google account.
   - **Password Recovery:** Use the forgot password feature to reset passwords.
   - **Account Management:** Update account information or delete the account.

## Contributing

1. **Fork the Repository:**
   Fork the repository on GitHub to create a personal copy.

2. **Create a Branch:**
   ```bash
   git checkout -b your-feature-branch
   ```

3. **Make Changes:**
   Implement your changes in the new branch.

4. **Commit Changes:**
   ```bash
   git add .
   git commit -m "Describe your changes here"
   ```

5. **Push Changes:**
   ```bash
   git push origin your-feature-branch
   ```

6. **Create a Pull Request:**
   Submit a pull request from your forked repository to the original repository on GitHub, describing your changes.

## Contact
For any questions or issues, please reach out to:

- **Email:** vrajp771@gmail.com
- **GitHub:** [vrajpatel1812](https://github.com/vrajpatel1812)
