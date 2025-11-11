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

    def validate(self, attrs):
        if attrs['email'].lower() in [user.email.lower() for user in User.objects.all()]:
            raise CustomResponse.bad_request(
                message='Email déjà utilisé',
                code=ErrorCode.EMAIL_ALREADY_EXISTS
            )

        if attrs['password'] != attrs['confirm_password']:
            raise CustomResponse.bad_request(
                message='Les mots de passe ne correspondent pas',
                code=ErrorCode.CONFIRM_PASSWORD_NOT_MATCH
            )
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
            raise CustomResponse.bad_request(
                message='Email et mot de passe sont requis',
                code=ErrorCode.INVALID_CREDENTIALS,
            )

        user = authenticate(username=email, password=password)

        if user is None:
            raise CustomResponse.bad_request(
                message='Utilisateur non trouvé',
                code=ErrorCode.USER_NOT_FOUND
            )

        if not user.is_active:
            raise CustomResponse.bad_request(
                message='Utilisateur inactif',
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
            raise CustomResponse.bad_request(
                message='Aucun utilisateur trouvé avec cet email',
                code=ErrorCode.USER_NOT_FOUND
            )
        return value


class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.CharField(required=True)
    new_password = serializers.CharField(write_only=True, required=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise CustomResponse.bad_request(
                message='Les mots de passe ne correspondent pas',
                code=ErrorCode.CONFIRM_PASSWORD_NOT_MATCH
            )
        return attrs
