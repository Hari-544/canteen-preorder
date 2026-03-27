# 🍔 Canteen Pre-Order System (Frontend)

## 📌 Overview

The **Canteen Pre-Order System** is a frontend web application that allows students to pre-order food from their college canteen before reaching the location. This helps reduce waiting time and improves efficiency in food collection.

This project is built using **HTML, CSS, and JavaScript**, and runs entirely in the browser using **localStorage** for data management.

---

## 🚀 Features

### 👤 Student Registration

* Enter Name, Registration Number, Phone, and Email
* Data is stored in browser localStorage

### 🍽️ Food Menu

* Displays available food items
* Search and filter functionality
* Add items to cart

### 🛒 Cart Management

* Add/remove items
* Increase/decrease quantity
* Automatic total calculation

### ⏰ Pickup Scheduling

* Select preferred pickup time
* Reduces waiting time at canteen

### 💳 Payment Options

* Pay Now
* Pay at Pickup

### 🎟️ Order Ticket Generation

* Unique Order ID
* Student details
* Ordered items
* Total amount
* Pickup time
* Payment status

### 📜 Order History

* View previous orders
* Open past tickets
* Download ticket as text file

### 👤 Profile Management

* Update student details
* Syncs with orders

---

## 🛠️ Tech Stack

* **HTML5** – Structure
* **CSS3** – Styling
* **JavaScript (Vanilla)** – Logic & functionality
* **localStorage & sessionStorage** – Data storage

---

## 📂 Project Structure

```
CANTEEN PRE-ORDER/
│
├── index.html        # Student details page
├── menu.html         # Food menu page
├── cart.html         # Cart & checkout page
├── ticket.html       # Order ticket page
├── orders.html       # Order history page
├── profile.html      # Profile management
├── style.css         # Styles
└── script.js         # Main JavaScript logic
```

---

## 🔄 Application Workflow

1. **Student enters details**

   * Data stored in localStorage (`student`)

2. **Browse menu**

   * Menu loaded from predefined items
   * Items added to cart (`cart`)

3. **Cart management**

   * Update quantities
   * Calculate total

4. **Place order**

   * Select pickup time & payment method
   * Order object created

5. **Ticket generation**

   * Displays complete order summary

6. **Order history**

   * Stored in `orders`
   * Can view previous tickets

---

## 💾 Storage Design

### localStorage:

* `student` → Student details
* `cart` → Current cart items
* `order` → Latest order
* `orders` → Order history

### sessionStorage:

* `selectedOrderId` → For viewing specific ticket

---

## 🎯 Future Enhancements

* Backend integration (Node.js / Firebase)
* Online payment gateway integration
* Real-time order tracking
* Admin dashboard for canteen staff
* QR code for order pickup

---

## 🌍 Live Demo

(You can add your GitHub Pages link here)

---

## 📸 Screenshots

(Add screenshots of your project here)

---

## 🙌 Author

* **Hari Krishna**
* B.Tech (AI & ML Student)

---

## 📢 Conclusion

This project demonstrates how a real-world canteen ordering system can be implemented using only frontend technologies. It improves user convenience and showcases practical web development skills.

---
