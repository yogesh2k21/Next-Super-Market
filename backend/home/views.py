from django.http import JsonResponse
from product.serializers import ProductSerializer
from product.models import Product
from .models import Banner,Pincode
from .serializers import BannerSerializer
from django.core.exceptions import ObjectDoesNotExist
# from django.core.exceptions.ObjectDoesNotExist
# Create your views here.

def home(request):
    products=Product.objects.filter().order_by('-rating')[:8]
    serialized=ProductSerializer(products,many=True)
    return JsonResponse(serialized.data,safe=False)

def banner(request):
    banners=Banner.objects.filter(active=True)
    serialized=BannerSerializer(banners,many=True)
    return JsonResponse(serialized.data,safe=False)

def checkPin(request,pin):
    data={}
    try:
        # if exist then Available becomes true
        if Pincode.objects.get(pin=pin):
            data.update({'Available':True})
    # if not exist then it will through ObjectDoesNotExist error
    except ObjectDoesNotExist:
        data.update({'Available':False})
    return JsonResponse(data=data,safe=False)