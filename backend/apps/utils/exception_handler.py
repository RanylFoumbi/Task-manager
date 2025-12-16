from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework.exceptions import ValidationError
from django.core.exceptions import ObjectDoesNotExist
from apps.utils.custom_response import CustomResponse
from apps.utils.error_code import ErrorCode


def custom_exception_handler(exc, context):
    """
    Convertit automatiquement toutes les exceptions en CustomResponse
    """
    # Gérer ValidationError (erreurs de serializers)
    if isinstance(exc, ValidationError):
        error_detail = exc.detail
        
        # Extraire code et message si présents
        if isinstance(error_detail, dict):
            code = error_detail.get('code', ErrorCode.BAD_REQUEST)
            message = error_detail.get('message')
            
            # Si message n'existe pas, prendre la première erreur
            if not message:
                for field, errors in error_detail.items():
                    if field not in ['code', 'message']:
                        if isinstance(errors, list):
                            message = errors[0]
                        else:
                            message = str(errors)
                        break
                
                if not message:
                    message = 'Données invalides'
        else:
            code = ErrorCode.BAD_REQUEST
            if isinstance(error_detail, list):
                message = error_detail[0] if error_detail else 'Données invalides'
            else:
                message = str(error_detail)
        
        return CustomResponse.bad_request(
            message=message,
            code=code
        )
    
    # Gérer ObjectDoesNotExist
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
