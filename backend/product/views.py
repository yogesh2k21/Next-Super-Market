from django.http import JsonResponse
from .serializers import ProductSerializer,CategorySerializer
from product.models import Product,Category
# Create your views here.

def getItem(request,pk):
    product=Product.objects.get(id=pk)
    serialized=ProductSerializer(product,many=False)
    return JsonResponse(serialized.data,safe=False)

def category(request):
    category=Category.objects.filter().values()
    # print(category)
    serialized=CategorySerializer(category,many=True)
    # print(serialized)
    return JsonResponse(serialized.data,safe=False)