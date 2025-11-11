import logging
from typing import Dict, Any, Optional
from django.http import JsonResponse
from django.conf import settings
from rest_framework import status
from apps.utils.error_code import ErrorCode, LogLevel

logger = logging.getLogger(__name__)

class CustomResponse:

    @staticmethod
    def _build_response(
            success: bool,
            code: str,
            message: str,
            data: Optional[Dict[str, Any]] = None,
            status_code: int = 200,
            log_level: str = None
    ) -> JsonResponse:

        response_body = {
            "success": success,
            "code": code,
            "message": message
        }

        if data is not None:
            response_body["data"] = data

        if log_level:
            log_message = f"Response - Code: {code}, Message: {message}, Data: {data}"
            if log_level == LogLevel.DEBUG:
                logger.debug(log_message)
            elif log_level == LogLevel.INFO:
                logger.info(log_message)
            elif log_level == LogLevel.WARNING:
                logger.warning(log_message)
            elif log_level == LogLevel.ERROR:
                logger.error(log_message)
            elif log_level == LogLevel.CRITICAL:
                logger.critical(log_message)

        return JsonResponse(response_body, status=status_code)


    @staticmethod
    def success(
            message: str = "Opération réussie",
            data: Optional[Dict[str, Any]] = None,
            code: str = ErrorCode.SUCCESS
    ) -> JsonResponse:
        return CustomResponse._build_response(
            success=True,
            code=code,
            message=message,
            data=data,
            status_code=status.HTTP_200_OK
        )

    @staticmethod
    def created(
            message: str = "Ressource créée",
            data: Optional[Dict[str, Any]] = None,
            code: str = ErrorCode.SUCCESS
    ) -> JsonResponse:
        return CustomResponse._build_response(
            success=True,
            code=code,
            message=message,
            data=data,
            status_code=status.HTTP_201_CREATED
        )


    @staticmethod
    def bad_request(
            message: str = "Requête invalide",
            code: str = ErrorCode.BAD_REQUEST,
            data: Optional[Dict[str, Any]] = None
    ) -> JsonResponse:
        return CustomResponse._build_response(
            success=False,
            code=code,
            message=message,
            data=data,
            status_code=status.HTTP_400_BAD_REQUEST,
            log_level=LogLevel.ERROR
        )

    @staticmethod
    def unauthorized(
            message: str = "Non autorisé",
            code: str = ErrorCode.UNAUTHORIZED,
            data: Optional[Dict[str, Any]] = None
    ) -> JsonResponse:
        return CustomResponse._build_response(
            success=False,
            code=code,
            message=message,
            data=data,
            status_code=status.HTTP_401_UNAUTHORIZED,
            log_level=LogLevel.WARNING
        )

    @staticmethod
    def forbidden(
            message: str = "Accès interdit",
            code: str = ErrorCode.FORBIDDEN,
            data: Optional[Dict[str, Any]] = None
    ) -> JsonResponse:
        return CustomResponse._build_response(
            success=False,
            code=code,
            message=message,
            data=data,
            status_code=status.HTTP_403_FORBIDDEN,
            log_level=LogLevel.INFO
        )

    @staticmethod
    def not_found(
            message: str = "Ressource non trouvée",
            code: str = ErrorCode.NOT_FOUND,
            data: Optional[Dict[str, Any]] = None
    ) -> JsonResponse:
        return CustomResponse._build_response(
            success=False,
            code=code,
            message=message,
            data=data,
            status_code=status.HTTP_404_NOT_FOUND,
            log_level=LogLevel.INFO
        )

    @staticmethod
    def conflict(
            message: str = "Conflit de ressource",
            code: str = ErrorCode.CONFLICT,
            data: Optional[Dict[str, Any]] = None
    ) -> JsonResponse:
        return CustomResponse._build_response(
            success=False,
            code=code,
            message=message,
            data=data,
            status_code=status.HTTP_409_CONFLICT,
            log_level=LogLevel.WARNING
        )

    @staticmethod
    def server_error(
            message: str = "Erreur serveur",
            code: str = ErrorCode.INTERNAL_SERVER_ERROR,
            data: Optional[Dict[str, Any]] = None
    ) -> JsonResponse:
        if not settings.DEBUG:
            message = "Une erreur interne est survenue"

        return CustomResponse._build_response(
            success=False,
            code=code,
            message=message,
            data=data,
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            log_level=LogLevel.CRITICAL
        )