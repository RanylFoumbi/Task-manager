import datetime
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView
from django.utils.encoding import force_bytes, force_str
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.exceptions import ValidationError
from drf_spectacular.utils import extend_schema
from apps.utils.custom_response import CustomResponse
from apps.utils.error_code import ErrorCode
from ..models import User
from ..serializers import (
    LoginSerializer,
    LogoutSerializer,
    RegisterSerializer,
    PublicUserSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer
)

class PublicTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]
    serializer_class = TokenRefreshSerializer

    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except (InvalidToken, TokenError, ValidationError):
            return CustomResponse.bad_request(
                message='Token invalide ou expiré',
                code=ErrorCode.TOKEN_EXPIRED_OR_INVALID
            )

class RegisterView(CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True) 
        
        user = serializer.save()

        if not user:
            return CustomResponse.bad_request(
                message="Échec de l'inscription",
                code=ErrorCode.REGISTRATION_FAILED,
            )

        return CustomResponse.created(
            message="Inscription réussie",
            code=ErrorCode.REGISTRATION_SUCCESS
        )

class LoginView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True) 

        user = serializer.validated_data['user']
        user.last_login = datetime.datetime.now()
        user.save(update_fields=['last_login'])

        refresh = RefreshToken.for_user(user)
        user_data = PublicUserSerializer(user).data

        return CustomResponse.success(
            message="Connexion réussie",
            code=ErrorCode.LOGIN_SUCCESS,
            data={
                'user': user_data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        )


class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]
    serializer_class = PasswordResetRequestSerializer

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        user = User.objects.get(email=email)

        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"

        try:
            send_mail(
                'Réinitialisation de mot de passe',
                f'Cliquez sur le lien suivant pour réinitialiser votre mot de passe : {reset_url}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
        except Exception as e:
            print('>>>>>> Email sending error:', e)
            return CustomResponse.server_error(
                message="Erreur lors de l'envoi de l'email de réinitialisation",
                code=ErrorCode.PASSWORD_RESET_FAILED
            )

        return CustomResponse.success(
            message="Email de réinitialisation envoyé avec succès",
            code=ErrorCode.PASSWORD_RESET_SUCCESS
        )

class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return CustomResponse.bad_request(
                message='Lien de réinitialisation invalide',
                code=ErrorCode.INVALID_RESET_LINK
            )

        if not default_token_generator.check_token(user, token):
            return CustomResponse.bad_request(
                message='Token de réinitialisation invalide ou expiré',
                code=ErrorCode.TOKEN_EXPIRED_OR_INVALID
            )

        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user.set_password(serializer.validated_data['new_password'])
        user.save()

        return CustomResponse.success(
            message="Mot de passe réinitialisé avec succès",
            code=ErrorCode.PASSWORD_RESET_SUCCESS
        )
    

class LogoutView(APIView):
    permission_classes = [AllowAny]
    serializer_class = LogoutSerializer
    
    def post(self, request):
        try:
            serializer = LogoutSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            
            refresh_token = serializer.validated_data.get('refresh')

            token = RefreshToken(refresh_token)
            token.blacklist()

            return CustomResponse.success(
                message="Déconnexion réussie",
                code=ErrorCode.SUCCESS
            )
        except Exception as e:
            print('>>>>>> Logout error:', e)
            return CustomResponse.bad_request(
                message="Échec de la déconnexion",
                code=ErrorCode.BAD_REQUEST
            )