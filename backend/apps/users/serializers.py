from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import User


class PublicUserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'last_login']
        read_only_fields = ['id', 'email', 'first_name', 'last_name', 'last_login']


class RegisterSerializer(ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=False, min_length=4, allow_blank=True)
    password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'confirm_password']
        extra_kwargs = {
            'email': {'required': True},
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
            'username': {'required': False, 'allow_blank': True},
        }

    def validate(self, attrs):
        if attrs['email'].lower() in [user.email.lower() for user in User.objects.all()]:
            raise serializers.ValidationError('Un utilisateur avec cet email existe déjà')

        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError('Les mots de passe ne correspondent pas')
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True, min_length=8)

    def validate(self, attrs):
        from django.contrib.auth import authenticate

        email = attrs.get('email')
        password = attrs.get('password')

        if not email or not password:
            raise serializers.ValidationError('email et mot de passe sont requis')


        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError('email ou mot de passe incorrect')

        if not user.is_active:
            raise serializers.ValidationError('Compte utilisateur désactivé')

        attrs['user'] = user
        return attrs


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        try:
            User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError('Aucun utilisateur trouvé avec cet email')
        return value


class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)
    new_password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError('Les mots de passe ne correspondent pas')
        return attrs
