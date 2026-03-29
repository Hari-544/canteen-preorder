# Canteen Pre-Order System

## Overview

The **Canteen Pre-Order System** is a browser-based food ordering app for students. It lets a user enter student details, browse the canteen menu, add items to a cart, choose a pickup slot, place an order, and print a pickup ticket.

The app is built with **HTML**, **CSS**, and **Vanilla JavaScript** and uses **localStorage** and **sessionStorage** to keep data in the browser.

## Current Features

### Student Details and Validation

- Collects name, registration number, phone number, and email
- Validates registration number as exactly 10 alphanumeric characters containing both letters and numbers
- Validates phone number as exactly 10 digits
- Validates email format before saving

### Menu and Cart

- Displays menu items across categories like Breakfast, Meals, Biryani, Fast Food, Noodles, and Beverage
- Supports dish search and category filters
- Adds items to cart and updates quantities
- Calculates item count and total automatically

### Order Placement

- Requires the user to choose a pickup slot before placing an order
- Supports `Pay Now` and `Pay at Pickup`
- Generates a unique order ID for each order

### Ticket and Order History

- Shows the ticket after payment/order placement
- Displays order ID, date/time, student details, payment method, ordered items, and total
- Supports printing the ticket
- Supports downloading the ticket as a text file
- Keeps order history and allows reopening previous tickets
- Includes a **print-only QR code** that contains order and student details for scanning

### Profile Management

- Lets the user edit saved student details
- Updates saved orders with the latest profile data
- Shows a live preview on the profile page

## Tech Stack

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **localStorage**
- **sessionStorage**

## Project Files

```text
CANTEEN PRE-ORDER/
|-- index.html
|-- menu.html
|-- cart.html
|-- ticket.html
|-- orders.html
|-- profile.html
|-- style.css
`-- script.js
```

## Storage Used

### localStorage

- `student`: saved student profile
- `cart`: current cart items
- `order`: latest placed order
- `orders`: order history

### sessionStorage

- `selectedOrderId`: selected order for ticket view
- `flash`: temporary page messages

## Application Flow

1. The student enters details on `index.html`.
2. The app validates and saves the profile.
3. The student browses `menu.html`, searches dishes, filters categories, and adds items to the cart.
4. On `cart.html`, the student updates quantities, chooses a pickup slot, and selects a payment method.
5. After placing the order, the app saves the order and opens `ticket.html`.
6. The ticket can be printed, and `orders.html` keeps earlier orders available for viewing and download.
7. The `profile.html` page lets the user update saved profile details later.

## Notes

- The QR code is not shown in normal ticket view.
- The QR code appears only in the **print layout**.
- The QR image is generated through an online QR service, so internet access is needed when printing if the QR must appear.
- Currency is displayed as `Rs` to avoid character-encoding issues.

## Future Improvements

- Backend integration
- Real payment gateway integration
- Admin dashboard for canteen staff
- Scanner-based order verification at pickup

## Author

- **Hari Krishna**
- B.Tech (AI & ML Student)
