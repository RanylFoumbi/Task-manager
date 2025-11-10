from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from .users.models import User
from .projects.models import Project
from .tasks.models import Task, Comment
from .users.serializers import PublicUserSerializer


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ('id', 'creator', 'created_at', 'updated_at')


class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

class CommentSerializer(ModelSerializer):
    author = PublicUserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'content', 'author', 'created_at']
        read_only_fields = ('id', 'author', 'created_at')
        extra_kwargs = {
            'content': {'required': True},
        }

class UserCreateSerializer(ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(queryset=get_user_model().objects.all())
        ]
    )

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password']
        read_only_fields = ('id')
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': False, 'allow_blank': True},
            'last_name': {'required': False, 'allow_blank': True},
            'password': {'write_only': True, 'required': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            password=validated_data['password']
        )
        return user
    
class ProjectCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'description']
        read_only_fields = ('id', 'creator', 'created_at', 'updated_at')
        extra_kwargs = {
            'name': {'required': True},
            'description': {'required': False, 'allow_blank': True},
        }

class ProjectDetailSerializer(ModelSerializer):
    creator = PublicUserSerializer(read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'creator', 'created_at', 'updated_at', 'tasks']
        read_only_fields = ('id', 'creator', 'created_at', 'updated_at', 'tasks')
        extra_kwargs = {
            'name': {'required': True},
            'description': {'required': False, 'allow_blank': True},
        }

class TaskDetailSerializer(ModelSerializer):
    creator = PublicUserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'creator', 'project')

class TaskCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'status', 'priority', 'assignee', 'project']
        read_only_fields = ('id', 'created_at', 'updated_at', 'creator')
        extra_kwargs = {
            'title': {'required': True},
            'status': {'required': True},
            'priority': {'required': True},
            'description': {'required': False, 'allow_blank': True},
            'creator': {'required': True},
            'assignee': {'required': True},
            'project': {'required': True},
        }

class CommentCreateSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content']
        read_only_fields = ('id', 'author', 'created_at')
        extra_kwargs = {
            'content': {'required': True},
        }