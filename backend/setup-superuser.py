import os
import django

# Configurer Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'task_manager.settings')
django.setup()

from decouple import config

from django.contrib.auth.models import User

def create_superuser():
    username = config('DJANGO_SUPERUSER_USERNAME', default='admin')
    email = config('DJANGO_SUPERUSER_EMAIL', default='admin@admin.com')
    password = config('DJANGO_SUPERUSER_PASSWORD', default='supersecret')
    
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(
            username=username,
            email=email,
            password=password
        )
        print(f" SuperUser '{username}' créé avec succès!")
    else:
        print(f" SuperUser '{username}' existe déjà")

if __name__ == '__main__':
    create_superuser()