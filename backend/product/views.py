from django.http import JsonResponse
from .serializers import ProductSerializer
from product.models import Product
# Create your views here.

def getItem(request,pk):
    product=Product.objects.get(id=pk)
    serialized=ProductSerializer(product,many=False)
    return JsonResponse(serialized.data,safe=False)