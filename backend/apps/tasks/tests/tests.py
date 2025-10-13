import pytest
from rest_framework.test import APIClient
from tasks.models import Task

@pytest.mark.django_db
def test_task_create():
    client = APIClient()
    response = client.post('/api/tasks/', {'title': 'Test Task', 'status': 'todo'})
    assert response.status_code == 201
    assert Task.objects.count() == 1
    assert Task.objects.first().title == 'Test Task'
