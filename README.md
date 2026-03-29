# 🍔 Canteen Pre-Order System

## 📌 Overview

The **Canteen Pre-Order System** is a frontend-based web application that allows students to order food from the college canteen in advance. This helps reduce waiting time and enables faster food pickup.

This application is fully built using **HTML, CSS, and JavaScript**, and all data is handled using **browser storage (localStorage & sessionStorage)** without any backend.

---

## 🚀 Features

### 👤 Student Details Entry

* Students enter:

  * Name
  * Registration Number
  * Phone Number
  * Email
* Data is validated and stored in `localStorage`

---

### 🍽️ Menu Browsing

* Displays available food items
* Organized using categories
* Search functionality for quick access
* Add items to cart

---

### 🛒 Cart Management

* Add items to cart
* Increase / decrease quantity
* Remove items
* Automatic total calculation

---

### ⏰ Pickup Time Selection

* User selects preferred pickup time
* Helps reduce waiting queues in canteen

---

### 💳 Payment Options

* Pay Now
* Pay at Pickup

---

### 🎟️ Order Placement & Ticket Generation

* Generates a unique Order ID
* Displays:

  * Student details
  * Ordered items
  * Total amount
  * Pickup time
  * Payment status

---

### 📜 Order History

* Stores all previous orders
* View past tickets
* Open specific order details

---

### 👤 Profile Management

* Update student details
* Syncs updated data across orders

---

## 🛠️ Tech Stack

* **HTML5** – Structure
* **CSS3** – Styling
* **JavaScript (Vanilla)** – Functionality
* **localStorage** – Persistent data
* **sessionStorage** – Temporary state

---

## 📂 Project Structure

```id="xz0pxw"
CANTEEN PRE-ORDER/
│
├── index.html        # Student details page
├── menu.html         # Food menu page
├── cart.html         # Cart & checkout
├── ticket.html       # Order ticket
├── orders.html       # Order history
├── profile.html      # Profile management
├── style.css         # Styling
└── script.js         # Application logic
```

---

## 🔄 Application Workflow

1. **Student enters details**

   * Stored in `localStorage` under `student`

2. **Menu is displayed**

   * Items loaded from JavaScript array
   * User adds items to cart

3. **Cart is managed**

   * Quantity updates and total calculation

4. **Order is placed**

   * Pickup time + payment method selected
   * Order object is created

5. **Ticket is generated**

   * Shows complete order summary

6. **Order history is stored**

   * Saved in `localStorage` under `orders`

---

## 💾 Storage Design

### localStorage

* `student` → Student details
* `cart` → Current cart items
* `order` → Latest order
* `orders` → Order history

### sessionStorage

* `selectedOrderId` → Selected order for ticket view

---

## 🌍 Live Demo

👉 https://hari-544.github.io/canteen-preorder/

---

## 🎯 Future Improvements

* Backend integration (Node.js / Firebase)
* Online payment gateway
* Real-time order tracking
* Admin dashboard
* QR code-based pickup system

---

## 👨‍💻 Author

**Hari Krishna**
B.Tech (AI & ML Student)

---

## 📢 Conclusion

This project demonstrates a real-world food ordering workflow implemented entirely using frontend technologies. It improves efficiency in canteen services and showcases practical web development skills.

---
