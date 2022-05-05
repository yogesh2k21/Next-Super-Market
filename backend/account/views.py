from django.http import JsonResponse
from django.middleware.csrf import get_token

# Create your views here.
def csrfToken(request):
    response=JsonResponse({"info":"success - Set CSRF Cookies"})
    response["X-CSRFToken"]=get_token(request)
    return response