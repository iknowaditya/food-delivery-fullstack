# Yumm Yumm Food App

Yumm Yumm Food App is a full-stack web application designed for food delivery, allowing users to explore a variety of dishes, add them to their cart, and proceed to checkout using Stripe for secure payments. It includes an admin panel for managing food availability, user orders, and tracking information, with all data stored in MongoDB.

## Tech Stack

- **Frontend**: Vite, React (using Context API for state management)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Gateway**: Stripe
- **Authentication**: JWT (JSON Web Token)
- **Validation**: Validator
## Features

- **User Authentication**: 
  - Users can sign up and log in securely using JWT for session management.

- **Explore Dishes**: 
  - Users can browse a wide variety of dishes, complete with descriptions and images.

- **Cart Management**: 
  - Users can add dishes to their cart, adjust quantities, and remove items as needed.

- **Checkout Process**: 
  - Seamless checkout experience using Stripe, allowing payments via debit/credit cards, UPI, and net banking.

- **Order Confirmation**: 
  - Users receive a notification upon successful payment, confirming their order.

- **Admin Panel**: 
  - Admins can manage food availability, view user orders, and track order statuses.
  - Admins can access data on user activity and food inventory.

- **Real-Time Order Tracking**: 
  - Users can track the status of their orders in real-time through the app.

- **Responsive Design**: 
  - Fully responsive layout to ensure a great user experience on both desktop and mobile devices.

- **Data Storage**: 
  - All user, food, and order data is securely stored in MongoDB, ensuring efficient retrieval and management.
## Usage

1. **Sign Up / Log In**:
   - Visit the app and create an account by providing your details. If you already have an account, simply log in using your credentials.

2. **Browse Dishes**:
   - Explore the diverse menu by navigating through the available dishes. You can view detailed descriptions and images of each dish.

3. **Add to Cart**:
   - Once you find a dish you like, click on the "Add to Cart" button to include it in your selection. You can adjust the quantity as needed.

4. **View Cart**:
   - Click on the cart icon to review your selected items. Here, you can modify quantities or remove items from your cart.

5. **Proceed to Checkout**:
   - When you’re ready to order, click on the "Checkout" button. You’ll be directed to a secure payment page.

6. **Make Payment**:
   - Choose your preferred payment method (credit/debit card, UPI, or net banking) and enter your payment details. Confirm your payment to complete the order.

7. **Order Confirmation**:
   - After successful payment, you will receive an order confirmation notification. You can view the status of your order in your account.

8. **Admin Panel** (for admins only):
   - Log in to the admin panel to manage food items, view user orders, and track order statuses. Access analytics to monitor user engagement and inventory.

## Note
- Ensure that you have a stable internet connection for a smooth experience.
- For any issues or inquiries, please contact our support team through the app.
# Acknowledgements 

- **Inspiration**: A special thanks to the various food delivery applications that inspired the development of Yumm Yumm Food App. Your innovative designs and features helped shape this project.

- **Libraries and Frameworks**:
  - [React](https://reactjs.org/) - For building the user interface.
  - [Node.js](https://nodejs.org/) - For server-side development.
  - [Express.js](https://expressjs.com/) - For handling backend routes and APIs.
  - [Stripe](https://stripe.com/) - For secure payment processing.
  - [MongoDB](https://www.mongodb.com/) - For efficient data storage.
  - [JWT](https://jwt.io/) - For secure user authentication.
  - [Vite](https://vitejs.dev/) - For a fast development environment.
  - [Validator](https://github.com/validatorjs/validator.js) - For input validation.

- **Contributors**: Thank you to everyone who contributed to the development of this application, whether through coding, testing, or providing feedback.

- **Community Support**: Thanks to the open-source community for providing invaluable resources and documentation that made this project possible.

- **Friends and Family**: A heartfelt thank you to friends and family for their unwavering support and encouragement throughout the development process.

Your contributions, inspiration, and support have been invaluable in bringing the Yumm Yumm Food App to life!
## Contributing

Contributions are welcome! We appreciate any suggestions, improvements, or feedback to enhance the Yumm Yumm Food App. To contribute:

1. **Fork the repository**: Click the "Fork" button at the top right of the page.
2. **Create a new branch**: 
   ```bash
   git checkout -b feature/YourFeatureName
