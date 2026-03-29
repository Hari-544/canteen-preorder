# Canteen Pre-Order System

## Overview

The **Canteen Pre-Order System** is a frontend web application that lets students pre-order food from their college canteen before reaching the counter. It helps reduce waiting time and makes food pickup smoother.

This project is built with **HTML, CSS, and JavaScript** and stores data in the browser using **localStorage** and **sessionStorage**.

## Features

### Student Registration

- Enter name, registration number, phone, and email
- Store student data in browser local storage

### Food Menu

- Browse available food items
- Search dishes by name
- Filter dishes by category
- Add items to cart

### Cart Management

- Increase or decrease item quantity
- Remove items from the cart
- See the total update automatically

### Pickup Scheduling

- Choose a pickup time slot before placing the order

### Payment Options

- Pay now
- Pay at pickup

### Order Ticket

- Generate a unique order ID
- Show student details, ordered items, total amount, pickup slot, and payment method
- Print or download the order ticket

### Order History

- View previously placed orders
- Open past tickets
- Download tickets as text files

### Profile Management

- Update student details
- Sync profile details with saved orders

## Tech Stack

- **HTML5** for structure
- **CSS3** for styling
- **Vanilla JavaScript** for functionality
- **localStorage** and **sessionStorage** for data storage

## Project Structure

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

## Application Workflow

1. Student enters details, which are saved in `localStorage`.
2. The user browses the menu and adds items to the cart.
3. The cart page lets the user update quantities and review totals.
4. The user selects a pickup slot and payment method, then places the order.
5. A ticket is generated with the order summary.
6. Orders are saved and can be revisited from the order history page.

## Storage Design

### localStorage

- `student`: student details
- `cart`: current cart items
- `order`: latest order
- `orders`: order history

### sessionStorage

- `selectedOrderId`: currently selected order for ticket view

## Future Enhancements

- Backend integration
- Online payment gateway support
- Real-time order tracking
- Admin dashboard for canteen staff
- QR code based pickup flow

## Author

- **Hari Krishna**
- B.Tech (AI & ML Student)
