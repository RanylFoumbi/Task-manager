# 📋 Task Manager

A modern full-stack task management application built with Django REST Framework, PostgreSQL, Vue.js 3, TypeScript, and Pinia.

## 🚀 Tech Stack

### Backend
- **Django 5.2.6** - Python web framework
- **Django REST Framework** - API development
- **PostgreSQL 15** - Database
- **django-admin-interface** - Modern admin styling
- **django-cors-headers** - CORS handling

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Pinia** - State management
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### DevOps
- **Docker & Docker Compose** - Containerization
- **pgAdmin** - Database management

## 📁 Project Structure

```
task-manager/
├── backend/                    # Django API
│   ├── task_manager/          # Django project settings
│   ├── tasks/                 # Tasks app
│   ├── requirements.txt       # Python dependencies
│   ├── Dockerfile            # Backend container
│   └── manage.py             # Django management
├── docker-compose.yml       # Multi-container setup
└── .env                    # Environment variables
```