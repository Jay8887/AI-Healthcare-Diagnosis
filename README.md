# 🏥 AI Healthcare Diagnosis System

An AI-powered healthcare diagnosis web application that helps users predict possible diseases based on symptoms, securely manage patient information, and view prediction history. The application is built using **Spring Boot**, **JWT Authentication**, **MySQL**, and a machine learning prediction service.

---

## 📌 Features

* 🔐 Secure JWT-based Authentication
* 👤 Patient Registration & Login
* 🩺 Disease Prediction using AI/ML
* 📜 Prediction History
* 🗄️ MySQL Database Integration
* 🌐 RESTful APIs
* 🛡️ Spring Security
* 📈 Scalable Backend Architecture

---

## 🛠️ Tech Stack

### Backend

* Java 24
* Spring Boot
* Spring Security
* Spring Data JPA
* JWT Authentication
* Maven

### Database

* MySQL

### AI/ML

* Python
* TensorFlow / Scikit-learn (Prediction Model)

### Tools

* IntelliJ IDEA
* Postman
* Git & GitHub
* XAMPP (MySQL)

---

## 📂 Project Structure

```
backend/
│── controller/
│── service/
│── repository/
│── entity/
│── dto/
│── security/
│── config/
│── exception/
│── util/
│── resources/
│    └── application.properties
└── pom.xml
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Jay8887/AI-Healthcare-Diagnosis.git
```

### 2. Open the Project

Import the project into IntelliJ IDEA or your preferred Java IDE.

### 3. Configure Database

Create a MySQL database:

```sql
CREATE DATABASE healthcare_db;
```

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/healthcare_db
spring.datasource.username=root
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
```

### 4. Run the Application

```bash
mvn spring-boot:run
```

The backend starts at:

```
http://localhost:8080
```

---

## 🔑 Authentication

The application uses JWT (JSON Web Tokens).

Typical flow:

1. Register
2. Login
3. Receive JWT Token
4. Include the token in the Authorization header:

```
Authorization: Bearer <your_token>
```

---

## 📡 API Modules

* Authentication
* User Management
* Patient Management
* Disease Prediction
* Prediction History

---

## 🗃️ Database

Database Name:

```
healthcare_db
```

Main tables include:

* users
* patients
* prediction_history

---

## 📷 Future Enhancements

* Doctor Dashboard
* Appointment Booking
* Medical Report Upload
* Email Notifications
* Multi-language Support
* Admin Analytics Dashboard

---

## 👨‍💻 Author

**Devdatt**

GitHub: https://github.com/Jay8887

---

## 📄 License

This project is developed for educational and learning purposes.
