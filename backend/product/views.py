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
    serialized=CategorySerializer(category,many=True)
    return JsonResponse(serialized.data,safe=False)

def getProductCategoryWise(request,id):
    product=Product.objects.filter(category=id)
    serialized=ProductSerializer(product,many=True)
    return JsonResponse(serialized.data,safe=False)