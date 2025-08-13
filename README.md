# Michaela Connect

A modern **full-stack application** powered by **Laravel**, **React**, **Vite**, and **Electron**.  
Run it as a **web app**, **desktop app**, or both!

---

## 📂 Project Structure

/
├─ backend/ # Laravel PHP API backend
├─ frontend/ # React + Vite frontend (Bootstrap optional)
├─ desktop/ # Electron desktop wrapper (optional)
├─ .editorconfig
├─ .gitattributes
├─ README.md
├─ LICENSE

---

## 🧩 Tech Stack

| Layer    | Tech                              |
| -------- | --------------------------------- |
| Backend  | Laravel, PHP                      |
| Frontend | React, Vite, Bootstrap (optional) |
| Desktop  | Electron                          |
| Database | MySQL / PostgreSQL / SQLite       |

---

## 🚀 Getting Started

### ✅ 1️⃣ Clone the project

```bash
git clone https://github.com/dandevs-git/michaela-connect.git
cd michaela-connect



cd backend

# Copy example env and set your variables
cp .env.example .env

# Install PHP dependencies
composer install

# Generate app key
php artisan key:generate

# Run migrations (make sure DB is ready)
php artisan migrate

php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan config:cache

# Start Laravel development server
php artisan serve




cd ../frontend

# Copy example env and adjust if needed
cp .env.example .env

# Install Node dependencies
npm install

# Run Vite dev server
npm run dev





```
