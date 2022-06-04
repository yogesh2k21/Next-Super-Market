from django.http import JsonResponse
from .serializers import ProductSerializer,CategorySerializer
from product.models import Product,Category,ProductOrder
from account.models import Customer
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.

@api_view(['GET'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes([JWTAuthentication])
def getItem(request,pk):
    product=Product.objects.get(id=pk)
    serialized=ProductSerializer(product,many=False)
    return JsonResponse(serialized.data,safe=False)

@api_view(['GET'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes([JWTAuthentication])
def category(request):
    category=Category.objects.filter().values()
    serialized=CategorySerializer(category,many=True)
    return JsonResponse(serialized.data,safe=False)

@api_view(['GET'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes([JWTAuthentication])
def getProductCategoryWise(request,id):
    product=Product.objects.filter(category=id)
    serialized=ProductSerializer(product,many=True)
    return JsonResponse(serialized.data,safe=False) 

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def addToCart(request,product_id):
    try:
        product=Product.objects.get(id=product_id)
        customer=Customer.objects.get(user=request.user)
    except:
        return JsonResponse({"success":False}) 
    try:
        OldCartProduct=ProductOrder.objects.get(customer=customer,product=product,ordered=False)
        OldCartProduct.quantity=OldCartProduct.quantity+1
        OldCartProduct.save(update_fields=['quantity'])
    except Exception as e:
        NewCartProduct=ProductOrder(customer=customer,ordered=False,product=product,quantity=1)
        NewCartProduct.save()
    print("order saved")
    return JsonResponse({"success":True}) 

