from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Task
from apps.serializers import TaskSerializer

class TaskView(APIView):
    serializer_class = TaskSerializer

    def get(self,*args, **kwargs):
        tasks = Task.objects.all()
        serializer = self.serializer_class(tasks, many=True)
        return Response(serializer.data)
    

