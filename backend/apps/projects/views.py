from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Project
from apps.serializers import ProjectSerializer

class ProjectView(APIView):
    serializer_class = ProjectSerializer

    def get(self, *args, **kwargs):
        projects = Project.objects.all()
        serializer = self.serializer_class(projects, many=True)
        return Response(serializer.data)

