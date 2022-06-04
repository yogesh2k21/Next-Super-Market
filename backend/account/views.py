from ast import Return
import json
from django.http import JsonResponse
# from django.middleware.csrf import get_token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from .models import MyUser,Customer
# Create your views here.
# def csrfToken(request):
#     response=JsonResponse({"info":"success - Set CSRF Cookies"})
#     response["X-CSRFToken"]=get_token(request)
#     return response

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['first_name'] = user.first_name
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def signup(request):
    # print(request.body)
    received_json_data = json.loads(request.body.decode("utf-8"))
    print(received_json_data['password'])
    try:
        user=MyUser(
        first_name=received_json_data['first_name'],
        last_name=received_json_data['last_name'],
        email=received_json_data['email'],     
        username=received_json_data['email']        
        )
        user.set_password(received_json_data['password'])
        user.save()
    except Exception as e:
        print(e)
        return JsonResponse({"success":False,"message":"User with this Email already Exists!"})
    try:
        c=Customer(user=user).save()
    except Exception as e:
        print(e)
    print(user)
    return JsonResponse({"success":True,"message":"Account Created successfully"})