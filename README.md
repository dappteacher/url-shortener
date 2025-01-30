# **URL Shortener** 🚀  

A simple URL shortener built with **React (Vite) + TypeScript** for the frontend and **Node.js + Express + PostgreSQL** for the backend. This project allows users to shorten URLs, store them in a database, and retrieve them via a unique slug.  

## **Features** ✨  
✅ Enter a URL and generate a shortened version  
✅ Copy the shortened URL to the clipboard  
✅ Store URL mappings in **PostgreSQL**  
✅ Redirect users when a short URL is accessed  
✅ Handle errors (invalid URLs, non-existing slugs)  
✅ Fully containerized with **Docker**  
✅ Deployed and ready for production  

## **Tech Stack** 🛠️  
**Frontend:** React (Vite) + TypeScript + Axios + Clipboard API  
**Backend:** Node.js + Express + PostgreSQL  
**Database:** PostgreSQL  
**Deployment:** Docker  

## **Setup & Installation** 🛠️  

### **1. Clone the Repository**  
```bash
git clone https://github.com/dappteacher/url-shortener.git
cd url-shortener
```

### **2. Backend Setup**  
```bash
cd backend
npm install
```
Create a `.env` file and add your PostgreSQL credentials:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/url_shortener
```
Start the backend server:
```bash
node sever.js
```

### **3. Frontend Setup**  
```bash
cd frontend
npm install
npm run dev
```
Visit `http://localhost:5173/` in your browser.

## **Docker Support** 🐳  
To run the project using Docker:  
```bash
docker-compose up --build
```

## **Contributing** 🤝  
Feel free to open issues or submit PRs to improve this project.  
