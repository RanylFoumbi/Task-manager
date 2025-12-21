from re import match
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
    email = serializers.CharField(required=True)  
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    username = serializers.CharField(required=False, min_length=4, allow_blank=True)
    password = serializers.CharField(write_only=True, required=True) 
    accept_terms = serializers.BooleanField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)  

    class Meta:
        model = User
        fields = ['email', 'username', 'first_name', 'last_name', 'password', 'confirm_password', 'accept_terms']
        extra_kwargs = {
            'email': {'required': True},
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
            'username': {'required': False, 'allow_blank': True},
            'first_name': {'required': False, 'allow_blank': True},
            'last_name': {'required': False, 'allow_blank': True},
            'accept_terms': {'write_only': True, 'required': True},
        }

    def validate_email(self, value):
        if not value or not isinstance(value, str) or len(value.strip()) == 0:
            raise serializers.ValidationError(
                'Email requis',
                code=ErrorCode.VALIDATION_ERROR,
            )
        if match(r"[^@]+@[^@]+\.[^@]{2,}", value) is None:
            raise serializers.ValidationError(
                'Saisissez une adresse e-mail valide.',
                code=ErrorCode.INVALID_EMAIL_FORMAT,
            )
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                'Email déjà utilisé',
                code=ErrorCode.EMAIL_ALREADY_EXISTS,
            )
        return value

    def validate_password(self, value):
        if not value or not isinstance(value, str) or len(value) < 8:
            raise serializers.ValidationError(
                'Assurez-vous que ce champ comporte au moins 8 caractères.',
                code=ErrorCode.PASSWORD_TOO_SHORT,
            )
        return value

    def validate_confirm_password(self, value):
        if not value or not isinstance(value, str) or len(value) < 8:
            raise serializers.ValidationError(
                'Assurez-vous que ce champ comporte au moins 8 caractères.',
                code=ErrorCode.PASSWORD_TOO_SHORT,
            )
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(
                'Les mots de passe ne correspondent pas',
                code=ErrorCode.CONFIRM_PASSWORD_NOT_MATCH,
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True)

    def validate_email(self, value):
        if not value or not isinstance(value, str) or len(value.strip()) == 0:
            raise serializers.ValidationError(
                'Email requis',
                code=ErrorCode.VALIDATION_ERROR,
            )
        if match(r"[^@]+@[^@]+\.[^@]{2,}", value) is None:
            raise serializers.ValidationError(
                'Saisissez une adresse e-mail valide.',
                code=ErrorCode.INVALID_EMAIL_FORMAT,
            )
        return value

    def validate_password(self, value):
        """Valider la longueur du mot de passe"""
        if not value or not isinstance(value, str) or len(value) < 8:
            raise serializers.ValidationError(
                'Assurez-vous que ce champ comporte au moins 8 caractères.',
                code=ErrorCode.PASSWORD_TOO_SHORT,
            )
        return value

    def validate(self, attrs):
        from django.contrib.auth import authenticate

        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError(
                'Email ou mot de passe incorrect',
                code=ErrorCode.INVALID_CREDENTIALS,
            )

        if not user.is_active:
            raise serializers.ValidationError(
                'Compte inactif',
                code=ErrorCode.USER_INACTIVE,
            )

        attrs['user'] = user
        return attrs


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)

    def validate_email(self, value):
        try:
            User.objects.get(email=value)
        except User.DoesNotExist:
            raise serializers.ValidationError(
                'Aucun utilisateur trouvé avec cet email',
                code=ErrorCode.USER_NOT_FOUND,
            )
        return value


class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)
    new_password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError(
                'Les mots de passe ne correspondent pas',
                code=ErrorCode.CONFIRM_PASSWORD_NOT_MATCH,
            )
        return attrs


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField(required=True)

    def validate_refresh(self, value):
        if not value or not isinstance(value, str) or len(value) == 0:
            raise serializers.ValidationError(
                'Le token de rafraîchissement est requis',
                code=ErrorCode.REFRESH_TOKEN_INVALID,
            )
        return value
