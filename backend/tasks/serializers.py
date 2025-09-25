from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.validators import UniqueValidator
from .models import Task, Project, User, Comment

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        read_only_fields = ('id', 'email', 'first_name', 'last_name')

class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ('id', 'creator', 'created_at', 'updated_at')

class CommentSerializer(ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'content', 'author', 'created_at']
        read_only_fields = ('id', 'author', 'created_at')
        extra_kwargs = {
            'content': {'required': True},
        }

class TaskDetailSerializer(ModelSerializer):
    creator = UserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at', 'creator', 'project')

class ProjectDetailSerializer(ModelSerializer):
    creator = UserSerializer(read_only=True)
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'creator', 'created_at', 'updated_at', 'tasks']
        read_only_fields = ('id', 'creator', 'created_at', 'updated_at', 'tasks')
        extra_kwargs = {
            'name': {'required': True},
            'description': {'required': False, 'allow_blank': True},
        }

class TaskCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ['title', 'description', 'status', 'priority', 'assignee', 'project']
        read_only_fields = ('id', 'created_at', 'updated_at', 'creator')
        extra_kwargs = {
            'title': {'required': True},
            'status': {'required': False},
            'priority': {'required': False},
            'description': {'required': False, 'allow_blank': True},
            'assignee': {'required': False, 'allow_null': True},
            'project': {'required': False, 'allow_null': True},
        }


class CommentCreateSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content']
        read_only_fields = ('id', 'author', 'created_at')
        extra_kwargs = {
            'content': {'required': True},
        }

class ProjectCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'description']
        read_only_fields = ('id', 'creator', 'created_at', 'updated_at')
        extra_kwargs = {
            'name': {'required': True},
            'description': {'required': False, 'allow_blank': True},
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
    