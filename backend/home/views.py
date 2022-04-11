from itertools import product
from django.http import JsonResponse
from .serializers import ProductSerializer
from .models import Product

# Create your views here.

def home(request):
    products=Product.objects.filter().order_by('id')
    serialized=ProductSerializer(products,many=True)
    return JsonResponse(serialized.data,safe=False)

def getItem(request,pk):
    product=Product.objects.get(id=pk)
    serialized=ProductSerializer(product,many=False)
    return JsonResponse(serialized.data,safe=False)
