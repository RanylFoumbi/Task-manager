from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .models import User
from ..utils.error_code import ErrorCode
from ..utils.custom_response import CustomResponse


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

    def validate_email(self, value):
        """Valider l'unicité de l'email"""
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError({
                'code': ErrorCode.EMAIL_ALREADY_EXISTS,
                'message': 'Email déjà utilisé'
            })
        return value

    def validate(self, attrs):
        """Valider que les mots de passe correspondent"""
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({
                'code': ErrorCode.CONFIRM_PASSWORD_NOT_MATCH,
                'message': 'Les mots de passe ne correspondent pas'
            })
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
            raise serializers.ValidationError({
                'code': ErrorCode.INVALID_CREDENTIALS,
                'message': 'Email et mot de passe sont requis'
            })

        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError({
                'code': ErrorCode.INVALID_CREDENTIALS,
                'message': 'Email ou mot de passe incorrect'
            })

        if not user.is_active:
            raise serializers.ValidationError({
                'code': ErrorCode.USER_INACTIVE,
                'message': 'Compte inactif'
            })

        attrs['user'] = user
        return attrs


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        """Vérifier que l'utilisateur existe"""
        try:
            User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError({
                'code': ErrorCode.USER_NOT_FOUND,
                'message': 'Aucun utilisateur trouvé avec cet email'
            })
        return value


class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)
    new_password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        """Valider que les mots de passe correspondent"""
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError({
                'code': ErrorCode.CONFIRM_PASSWORD_NOT_MATCH,
                'message': 'Les mots de passe ne correspondent pas'
            })
        return attrs
