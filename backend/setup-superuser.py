import os
import django

# Configurer Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'task_manager.settings')
django.setup()

from decouple import config
from django.contrib.auth import get_user_model

User = get_user_model()

def create_superuser():
    username = config('DJANGO_SUPERUSER_USERNAME', default='admin')
    email = config('DJANGO_SUPERUSER_EMAIL', default='admin@admin.com')
    password = config('DJANGO_SUPERUSER_PASSWORD', default='supersecret')
    first_name = config('DJANGO_SUPERUSER_FIRST_NAME', default='Admin')
    last_name = config('DJANGO_SUPERUSER_LAST_NAME', default='Admin User')
    
    if not email or not password:
        print("DJANGO_SUPERUSER_EMAIL et DJANGO_SUPERUSER_PASSWORD doivent être définis")
        return
    
    if User.objects.filter(email=email).exists():
        print(f"Superuser avec l'email {email} existe déjà")
        return
    
    try:
        user = User.objects.create_superuser(
            email=email,
            password=password
        )
        user.username = username
        user.first_name = first_name
        user.last_name = last_name
        user.is_staff = True
        user.is_superuser = True
        user.save()
        print(f"Superuser créé: {email}")
        
    except Exception as e:
        print(f"Erreur lors de la création du superuser: {e}")

if __name__ == '__main__':
    create_superuser()