from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist
from apps.utils.custom_response import CustomResponse
from apps.utils.error_code import ErrorCode
import json


def custom_exception_handler(exc, context):
    """
    Convertit automatiquement toutes les exceptions en CustomResponse
    """
    # Gérer ValidationError (erreurs de serializers)
    if isinstance(exc, ValidationError):
        error_detail = exc.detail
        
        code = ErrorCode.BAD_REQUEST
        message_array = []
        code_found = False
        
        if hasattr(exc, 'get_codes'):
            codes = exc.get_codes()
            if isinstance(codes, dict):
                for field, field_codes in codes.items():
                    if isinstance(field_codes, list):
                        for field_code in field_codes:
                            if field_code != 'invalid':
                                code = field_code
                                code_found = True
                                break
                    else:
                        if field_codes != 'invalid':
                            code = field_codes
                            code_found = True
                    if code_found:
                        break
        
        if isinstance(error_detail, dict):
            for field, errors in error_detail.items():
                if isinstance(errors, list):
                    for error in errors:
                        message_array.append(str(error))
                else:
                    message_array.append(str(errors))
        elif isinstance(error_detail, list):
            for error in error_detail:
                message_array.append(str(error))
        else:
            message_array.append(str(error_detail))
        
        return CustomResponse.bad_request(
            message=message_array,
            code=code
        )
    
    if isinstance(exc, ObjectDoesNotExist):
        return CustomResponse.not_found(
            message='Ressource non trouvée',
            code=ErrorCode.NOT_FOUND
        )
    
    # Appeler le handler par défaut de DRF pour les autres exceptions
    response = drf_exception_handler(exc, context)
    
    # Si DRF a géré l'exception, la convertir en CustomResponse
    if response is not None:
        status_code = response.status_code
        
        if status_code == 401:
            return CustomResponse.unauthorized(
                message='Non autorisé',
                code=ErrorCode.UNAUTHORIZED
            )
        elif status_code == 403:
            return CustomResponse.forbidden(
                message='Accès interdit',
                code=ErrorCode.FORBIDDEN
            )
        elif status_code == 404:
            return CustomResponse.not_found(
                message='Ressource non trouvée',
                code=ErrorCode.NOT_FOUND
            )
        elif status_code >= 500:
            return CustomResponse.server_error(
                message='Erreur serveur',
                code=ErrorCode.INTERNAL_SERVER_ERROR
            )
    
    return response
