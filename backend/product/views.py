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


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def removeFromCart(request,product_id):
    try:
        product=Product.objects.get(id=product_id)
        customer=Customer.objects.get(user=request.user)
    except:
        return JsonResponse({"success":False}) 
    try:
        OldCartProduct=ProductOrder.objects.get(customer=customer,product=product,ordered=False)
        OldCartProduct.quantity=OldCartProduct.quantity-1
        if OldCartProduct.quantity==0:
            OldCartProduct.delete()
        else:
            OldCartProduct.save(update_fields=['quantity'])
    except Exception as e:
        print(e)
        return JsonResponse({"success":False}) 
    print("removed")
    return JsonResponse({"success":True}) 


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def ClearCart(request):
    try:
        customer=Customer.objects.get(user=request.user)
    except:
        return JsonResponse({"success":False}) 
    try:
        OldCartProduct=ProductOrder.objects.filter(customer=customer,ordered=False)
        OldCartProduct.delete()
    except Exception as e:
        print(e)
        return JsonResponse({"success":False}) 
    print("all deleted")
    return JsonResponse({"success":True}) 

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def deleteFromCart(request,product_id):
    try:
        product=Product.objects.get(id=product_id)
        customer=Customer.objects.get(user=request.user)
    except:
        return JsonResponse({"success":False}) 
    try:
        OldCartProduct=ProductOrder.objects.filter(customer=customer,product=product,ordered=False).delete()
    except Exception as e:
        print(e)
        return JsonResponse({"success":False}) 
    print("deleted from cart")
    return JsonResponse({"success":True}) 


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def getCart(request):
    try:
        customer=Customer.objects.get(user=request.user)
    except:
        return JsonResponse({"success":False}) 
    print(request.user)
    try:
        CartProduct=ProductOrder.objects.filter(customer=customer,ordered=False).values('id','quantity','product__id','product__title','product__category__title','product__image','product__price','product__image')
        data={}
        for p in CartProduct:
            obj={
                "product_name":p['product__title'],
                "product_price":p['product__price'],
                "product_qty":p['quantity'],
                "product_category":p['product__category__title'],
                "product_subtotal":p['quantity']*p['product__price'],
                "url":p['product__image'],
            }
            data.update({p['product__id']:obj})
        print(CartProduct)
        print("deleted from cart")
        return JsonResponse(data,safe=True) 
    except Exception as e:
        print(e)
        return JsonResponse({"success":False}) 

