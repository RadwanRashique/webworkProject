# WebWork

WebWorkPro is a comprehensive MERN stack platform designed for freelance projects, fostering seamless interactions among users, developers, and admins.

## Project Overview

WebWorkPro revolutionizes freelance collaboration with a set of robust features:

1. **Secure Authentication and Authorization:**
   - Implemented JWT tokens for secure user authentication.
   - Role-based authorization enhances platform security.

2. **Real-time Communication:**
   - Integrated Socket.io for instant chat functionality.
   - Nodemailer ensures seamless email communication, featuring a robust OTP resend functionality.

3. **Engaging User Interactions:**
   - Enabled users to engage through commenting, following, star rating, search, and filtering.

4. **Efficient Media Management:**
   - Implemented image uploading using Multer and Cloudinary for streamlined media content management.

5. **Smooth Payment Transactions:**
   - Integrated Razorpay for seamless payment transactions.
   - Automated handling of plan expirations using cron jobs ensures uninterrupted service.

6. **Deployment and Hosting:**
   - Hosted the platform on AWS for robust infrastructure.
   - Frontend deployed on Netlify for efficient user access.
   - Secured a domain from Hostinger for a professional online presence.

## Tools and Technologies Used

### Backend

- **Node.js and Express.js:** For building a scalable and efficient backend.
- **MongoDB with Mongoose:** As the database for storing user data and project information.
- **JWT (JSON Web Tokens):** Ensures secure user authentication.
- **Socket.io:** Enables real-time communication for instant chat functionality.
- **Nodemailer:** Used for seamless email communication, including OTP resend functionality.
- **Bcrypt.js:** For secure password hashing.
- **Cloudinary:** Manages media content efficiently.
- **Dotenv:** Manages environment variables.
- **Express Validator:** Ensures proper validation of input data.
- **Razorpay:** Integrates for smooth payment transactions.
- **Multer:** Handles file uploads efficiently.
- **Node.js Cron Jobs:** Automates handling of plan expirations.

### Frontend

- **React.js:** For building a dynamic and interactive user interface.
- **Redux and Redux Toolkit:** Manages state efficiently.
- **Ant Design (Antd):** Provides modern UI components.
- **Axios:** Makes HTTP requests to the backend.
- **Charting Libraries:** Chart.js, ApexCharts, React Chartjs 2 for data visualization.
- **Date-fns:** Facilitates convenient date manipulation.
- **Framer Motion:** Adds smooth and interactive animations.
- **Lottie:** Integrates lightweight animations.
- **React Router Dom:** Handles navigation within the application.
- **React Hot Toast:** Provides user-friendly notifications.
- **React Icons:** Offers a variety of icons.
- **React Paginate:** Facilitates paginated data display.
- **Socket.io-client:** Enables real-time communication with the backend.
- **SweetAlert2:** Integrates customizable modal dialogs.

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the repository**
2. **Navigate to the `client` and `server` directories.**
3. **Install dependencies:** `npm install` in both directories.
4. **Set up environment variables:** Create `.env` files in both directories.
5. **Run the applications:** `npm start` in both directories.

## Contribution

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.
