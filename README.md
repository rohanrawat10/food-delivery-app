# 🍽️ Food Ordering & Shop Management App (MERN)

A full-stack **Food Ordering and Shop Management** application built using the **MERN stack**.  
The platform supports **Users**, **Shop Owners**, and **Delivery Partners**, each with their own dashboard and role-based features.

---

## 🚀 Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (Cookies)
- **Other Tools:** Axios, Cloudinary, bcrypt, Nodemailer

---

## 👥 User Roles & Dashboards

### 🧑 User Dashboard
- Browse food items by location
- Search for cuisines and dishes
- Add items to cart
- Place orders
- View order history
- Secure authentication

### 🏪 Shop Owner Dashboard
- Create & edit shop profile
- Add, edit, and delete food items
- Manage shop menu
- View customer orders
- Role-based access control

### 🚴 Delivery Partner Dashboard
- View assigned deliveries
- Update delivery status
- Manage completed deliveries
- Dedicated delivery workflow

---

## 🔐 Authentication & Security
- JWT-based authentication
- HTTP-only cookies
- Protected routes
- Role-based authorization
- Password hashing with bcrypt

---

## 📦 Key Features
- Responsive UI (mobile & desktop)
- Live search placeholder animation
- Image upload using Cloudinary
- City detection for food availability
- Secure login, signup & logout
- OTP-based password reset
- Google authentication support

---

## 📁 Project Structure
```bash
   client/
├── components/
├── redux/
├── hooks/
└── pages/
server/
├── controllers/
├── models/
├── routes/
├── middlewares/
└── utils/


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git

```
### 2️⃣ Install dependencies
```bash
 cd client
 npm install

cd ../server
npm install
```
### 3️⃣ Environment Variables (server/.env)
```bash
PORT=8000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret

```
### 4️⃣ Run the app
 ```bash
   # Backend
npm run dev

# Frontend
npm run dev

```
## 🛣️ API Highlights
- /api/auth/signup
- /api/auth/signin
- /api/user/current
- /api/shop/create
- /api/item/add
- /api/order/create

## 📌 Future Enhancements
- Online payment integration
- Real-time order tracking
- Push notifications
- Admin analytics dashboard

### 👤 Author
```bash
**Rohan Rawat**  
MERN Developer • Learner  
GitHub: @rohanrawat10

## 🤝 Contributing
Contributions are welcome!
Feel free to fork the repo and submit a pull request.


