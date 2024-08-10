# Sushi Delivery Website

This repository contains the source code for a sushi delivery website built using React, Node.js, and MongoDB. The project includes two main components:

- **Customer's Website**: A user-facing interface for browsing and ordering sushi.
- **Admin Panel**: An admin interface for managing the menu, orders, and tracking past orders.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

### Customer's Website
- **Menu Browsing**: Users can browse through different sushi categories using a mini navigation.
- **Item Rating**: Customers can rate any sushi item.
- **Order Placement**: Users can place orders and make payments through Stripe.
- **Order Tracking**: Customers can track their current orders.
- **Order History**: Users can view their past orders.
- **Login credentials for Admin Panel**: admin@admin.com; Admin1234!

### Admin Panel
- **Add Items**: Admins can add new sushi items to the menu.
- **Item List**: View and delete existing menu items.
- **Orders Management**: View and manage current orders.
- **Archive**: Access and view archived orders sorted by date.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment Integration**: Stripe
- **Version Control**: Git, GitHub

# Installation

To run this project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/sushi-delivery-website.git
   cd sushi-delivery-website
 2.	**Install dependencies for both the frontend and backend:**
   ### Install backend dependencies
    cd backend
    npm install

  ### Install frontend dependencies
    cd ../frontend
    npm install

  ### Isntall admin dependencies
    cd ../admin
    npm install

# 3.	Set up environment variables:
### Create a .env file in the backend directory with the following variables:
 - MONGODB_URI=<your-mongodb-uri>
 * STRIPE_SECRET_KEY=<your-stripe-secret-key>
 + JWT_SECRET=<your-jwt-secret-token>
 - FRONTEND_URL=<link-to-your-frontend>
### Create a .env file in the frontend directory with the following variables:
 - VITE_BACKEND_URL=<link-to-your-backend>
 * VITE_ADMIN_URL=<link-to-your-adminpanel>
### Create a .env file in the admin directory with the following variable:
 - VITE_BACKEND_URL=<link-to-your-backend>

# 4. Run the Development Server:

Start the backend server:

```
cd backend
npm run dev
```
Start the frontend server:

```
cd ../frontend
npm run dev
```

Start the admin server:

```
cd ../admin
npm run dev
```

# Usage
1.	Customer’s Website:
    - Browse the sushi menu, rate items, and place orders.
    -	Track your current orders and view your order history.
    -	Track your current orders status.
2.	Admin Panel:
    -	Add new items to the menu or delete existing ones.
    -	Monitor current orders and move them to the archive once completed.
    -	Change order status.
    -	Access archived orders by date.

# License

This project is licensed under the MIT License - see the LICENSE file for details.
