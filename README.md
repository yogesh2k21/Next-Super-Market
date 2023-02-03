# NEXT SUPER MARKET   🔗 [Live Link](http://13.126.12.72:3000/)

Our e-commerce platform is a unique blend of cutting-edge technologies and robust software engineering principles. At its core, our platform is built with Django for the backend, which provides a secure, scalable, and flexible foundation for managing customer data and transactions. On the frontend, we use Next.js, a high-performance React-based framework, to provide users with a seamless and responsive experience.

Styling the platform is made effortless with the help of TailwindCSS, a utility-first CSS framework that allows us to create beautiful and functional interfaces with ease. To store our data, we have chosen SQLite, a powerful and lightweight database solution that is well-suited for small to medium-sized applications.

To ensure secure authentication and authorization, we have implemented JSON Web Tokens (JWT) on our platform. Payments are processed smoothly and securely through Razorpay, a leading payment gateway in India. And after a successful order is placed, our platform sends a detailed email to the user with their order information, thanks to our implementation of Celery, a Python library for asynchronous task execution.

All of these technologies come together to create a powerful and user-friendly e-commerce platform that delivers a fantastic user experience. Our platform is designed for reliability, performance, and security, making it a great choice for businesses looking for a comprehensive e-commerce solution.

https://user-images.githubusercontent.com/52989607/177797914-d17ae50e-a83a-491e-8224-e3c74796960f.mp4

## Purpose and Goals 🎯

The purpose of this e-commerce platform is to provide an online shopping experience for customers. The platform allows users to browse products, add items to their cart, and make secure purchases using the Razorpay payment gateway.

The goals of this project are to:

- Create a user-friendly and visually appealing interface for customers to shop
- Provide a secure and reliable payment system for customers to make purchases
- Enable users to search for products easily and efficiently
- Offer a system for sending order details to customers via email
- Create a scalable and maintainable codebase that can be easily extended in the future
- The project is designed to be a complete e-commerce solution, providing all of the features that customers expect from an online shopping platform. By using modern technologies 

## Features 📜

Features of our e-commerce platform:

- Backend powered by Django
- Frontend built with Next.js
- Beautifully styled user interface using TailwindCSS
- Efficient and lightweight data storage using SQLite
- Secure authentication and authorization using JWT
- Seamless payment processing through Razorpay
- Order confirmation email sent to users using Celery for asynchronous task execution
- Fully functional cart for a seamless shopping experience
- Product search bar for easy and convenient product search
- Ability to purchase products by category
- Reliable and scalable architecture for managing customer data and transactions
- Fast and responsive user experience
- Designed for security, performance, and user-friendliness.

## Tools ⚒️ and Tech Stack 🧑‍💻

Tech Stack used in our e-commerce platform:

- Django (Backend)
- Next.js (Frontend)
- TailwindCSS (Styling)
- SQLite (Database)
- JWT (Authentication)
- Razorpay (Payment Gateway)
- Celery (Asynchronous Email Task Execution)
- React (JavaScript Library for Frontend)
- Python (Programming Language for Backend)
- HTML, CSS (Markup and Style Languages)

##  Requirements 🏗️

Requirements to run our e-commerce platform:

- Docker installed on your system
- At least 4 GB of RAM available
- A web browser, such as Google Chrome, Mozilla Firefox, or Microsoft Edge
- A stable internet connection

Note: The application has been tested on Linux and macOS, but it should also run on Windows with Docker installed. The required packages and dependencies are included in the Docker containers, so you do not need to install anything manually on your system.

## Installation & Setup 🏭

To set up and install our containerized e-commerce platform using Docker, follow these steps:

- Clone the GitHub repository to your local machine
- Navigate to the project directory
- Run the following command to build the Docker containers: `docker-compose build`
- Start the containers using the following command: `docker-compose up`
- Open a web browser and navigate to `http://localhost:3000` to access the e-commerce platform.

Note: The entire application has been containerized using Docker, ensuring that the application is portable and can be easily deployed on any system with Docker installed. If you make any changes to the code, you may need to rebuild the containers and restart the application. You can do this by running the `docker-compose down` command followed by `docker-compose up`.

## Hosting & Deployment ☁️

This e-commerce platform has been hosted on Amazon EC2 as part of my journey to learn about AWS and containerized using Docker.
By using Docker, the application has been packaged into a container that can be easily moved between development, testing, and production environments.
AWS provides a wide range of cloud computing services, and hosting this application on EC2 has been a great opportunity to dive deeper into the platform. 
By hosting on EC2, I was able to gain hands-on experience with cloud computing and improve my skills in this area.

## END

Thank you for taking the time to review this e-commerce platform project. Your feedback and support are greatly appreciated. If you have any questions or comments, please feel free to reach out.

