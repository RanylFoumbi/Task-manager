# 📋 Task Manager

A modern full-stack task management application built with Django REST Framework, PostgreSQL, React, TypeScript, and Zustand.

## 🚀 Tech Stack

### Backend
- **Django 5.2.6** - Python web framework
- **Django REST Framework** - API development
- **PostgreSQL 15** - Database
- **django-admin-interface** - Modern admin styling
- **django-cors-headers** - CORS handling


### Frontend
- **React 19** - UI library
- **TypeScript** - Static typing for components and APIs
- **Vite** - Fast dev server and build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Axios** (or Fetch) - HTTP client for API calls
- **TanStack Query (React Query)** - Server-state management & caching
- **Zustand** - Global state where needed
- **ESLint & Prettier** - Linting and formatting
- **Jest & React Testing Library** - Unit and integration testing
- Accessibility-first and responsive design best practices

### DevOps
- **Docker & Docker Compose** - Containerization
- **pgAdmin** - Database management

## Fonctionnalités clés

- Authentification JWT sécurisée.
- CRUD complet des tâches avec statut, priorité, date limite.
- Gestion des projets et assignation des tâches.
- Système de commentaires sur les tâches.
- Dashboard dynamique avec statistiques.
- Interface responsive et moderne.
- Filtrage et recherche avancée.

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

# Modèle Conceptuel de Données (MCD) - Task Manager

Ce document décrit le modèle conceptuel des données utilisées dans l'application Task Manager.

## Entités principales

### User (Utilisateur)
- `id` : Identifiant unique
- `username` : Nom d'utilisateur
- `email` : Adresse email
- `password` : Mot de passe (haché)
- Rôles / Permissions (ex : admin, membre)

### Task (Tâche)
- `id` : Identifiant unique
- `title` : Titre de la tâche
- `description` : Description détaillée (texte libre)
- `status` : Statut (ex : todo, in progress, done)
- `priority` : Priorité (ex : low, medium, high)
- `due_date` : Date d’échéance (optionnelle)
- `created_at` / `updated_at` : Dates de création et de modification
- `creator_id` : Référence vers l’utilisateur créateur (clé étrangère)
- `assignee_id` : Référence vers l’utilisateur assigné (clé étrangère, optionnelle)
- `project_id` : Référence vers le projet (clé étrangère, optionnelle)

### Project (Projet)
- `id` : Identifiant unique
- `name` : Nom du projet
- `description` : Description du projet
- `owner_id` : Propriétaire (clé étrangère vers User)
- `created_at` / `updated_at` : Dates de création et de modification

### Comment (Commentaire)
- `id` : Identifiant unique
- `task_id` : Tâche associée (clé étrangère)
- `author_id` : Auteur du commentaire (clé étrangère vers User)
- `content` : Contenu du commentaire
- `created_at` : Date de création

## Relations entre les entités

- Un **User** peut créer plusieurs **Tasks** (relation 1 à N)
- Une **Task** peut être assignée à un seul **User** (relation N à 1)
- Un **User** peut posséder plusieurs **Projects** (1 à N)
- Un **Project** contient plusieurs **Tasks** (1 à N)
- Une **Task** peut avoir plusieurs **Comments** (1 à N)
- Un **Comment** appartient à une **Task** et est rédigé par un **User**

---
