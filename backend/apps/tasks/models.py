import uuid
from django.db import models
from django.conf import settings

from apps.projects.models import Project


class Task(models.Model):
    STATUS_CHOICES = [
        ('todo', 'A faire'),
        ('in_progress', 'En cours'),
        ('done', 'Terminé'),
        ('blocked', 'Bloqué'),
        ('archived', 'Archivé'),
    ]
    PRIORITY_CHOICES = [
        (1, 'Très haute'),
        (2, 'Haute'),
        (3, 'Moyenne'),
        (4, 'Basse'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    project = models.ForeignKey(Project, related_name='tasks', on_delete=models.CASCADE, null=True, blank=True)
    assignee = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='assigned_tasks', on_delete=models.SET_NULL, null=True, blank=True)
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='created_tasks', on_delete=models.CASCADE, null=True, blank=True)
    priority = models.IntegerField(choices=PRIORITY_CHOICES, default=3)
    status = models.CharField(max_length=12, choices=STATUS_CHOICES, default=STATUS_CHOICES[0][0])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) 
    content = models.TextField()
    task = models.ForeignKey(Task, related_name='comments', on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Commentaire sur la tâche {self.task.title} à {self.created_at}"