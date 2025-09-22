from django.db import models

class Task(models.Model):
    STATUS_CHOICES = [
        ('todo', 'A faire'),
        ('in_progress', 'En cours'),
        ('done', 'Terminé'),
        ('blocked', 'Bloqué'),
        ('archived', 'Archivé'),
    ]

    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=12, choices=STATUS_CHOICES, default='todo')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

