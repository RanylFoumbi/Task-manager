from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User
from apps.serializers import UserSerializer

class UserView(APIView):
    serializer_class = UserSerializer

    def get(self, *args, **kwargs):
        users = User.objects.all()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data)

