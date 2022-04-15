from django.http import JsonResponse
from product.serializers import ProductSerializer
from product.models import Product
from .models import Banner
from .serializers import BannerSerializer

# Create your views here.

def home(request):
    print('home')
    products=Product.objects.filter().order_by('id')
    serialized=ProductSerializer(products,many=True)
    return JsonResponse(serialized.data,safe=False)

def banner(request):
    print('banner')
    banners=Banner.objects.filter()
    serialized=BannerSerializer(banners,many=True)
    return JsonResponse(serialized.data,safe=False)
