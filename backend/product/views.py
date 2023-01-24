from datetime import datetime
from math import floor
from django.utils import timezone
import json
from django.http import JsonResponse
from rest_framework import status
from pytz import timezone
from .serializers import ProductSerializer,CategorySerializer
from product.models import Product,Category,ProductOrder,BillingAddress,Order,Review
from account.models import Customer,MyUser
from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from .tasks import send_order_email_confirmation
from django.db.models import Avg
import razorpay
from django.db.models import Q,F
            # from django.db.models import F

# Create your views here.

# @permission_classes if i put permission_classes on a view then it will be only accesible by authenticated user
# @authentication_classes([JWTAuthentication]) means this Authentication check must be passed by request

@api_view(['GET'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes([JWTAuthentication])
def getItem(request,pk):
    try:
        product=Product.objects.get(id=pk)
        serialized=ProductSerializer(product,many=False)
        return JsonResponse(serialized.data,safe=False,status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return JsonResponse({"success":False,"message":"Internal server Error!"})

@api_view(['GET'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes([JWTAuthentication])
def category(request):
    try:
        category=Category.objects.filter().values()
        serialized=CategorySerializer(category,many=True)
        return JsonResponse(serialized.data,safe=False,status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return JsonResponse({"success":False,"message":"Internal server Error!"})

@api_view(['GET'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes([JWTAuthentication])
def getProductCategoryWise(request,id):
    try:
        product=Product.objects.filter(category=id)
        serialized=ProductSerializer(product,many=True)
        return JsonResponse(serialized.data,safe=False,status=status.HTTP_200_OK) 
    except Exception as e:
        print(e)
        return JsonResponse({"success":False,"message":"Internal server Error!"})

@api_view(['GET'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes([JWTAuthentication])
def getReview(request,pk):
    try:
        try:
            reviews=Review.objects.filter(product__id=pk).values('id','title','message','rating','customer__user__first_name','customer__user__last_name','review_date').order_by('-id')[:25]
            reviewCount=len(reviews)
            data={}
            review_list=list(reviews)
        except Exception as e:
            print(e)
            return JsonResponse({"success":False,"message":"Internal server Error!"})

        data.update({"count":reviewCount,"reviews":review_list})
        return JsonResponse(data=data,safe=False,status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return JsonResponse({"success":False,"message":"Internal server Error!"})

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def isPosted(request,product_id):
    try:
        customer=Customer.objects.get(user=request.user)
        product=Product.objects.get(id=product_id)
    except:
        return JsonResponse({"success":False}) 
    try:
        # checking is this product is ordered by this customer in past or not
        isOrdered=ProductOrder.objects.filter(customer=customer,product=product,ordered=True).exists()
        
        if isOrdered:
            # checking is this product is reviewed or not in past
            isPosted=Review.objects.filter(customer=customer,product=product).exists()
            data = True if isPosted else False

        return JsonResponse(data=data,safe=False,status=status.HTTP_200_OK) 
    except Exception as e:
        print(e)
        return JsonResponse({"success":False}) 

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
    return JsonResponse(data={},status=status.HTTP_200_OK) 


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
    return JsonResponse(data={},status=status.HTTP_200_OK) 


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def ClearCart(request):
    try:
        customer=Customer.objects.get(user=request.user)
    except:
        return JsonResponse({"success":False}) 
    try:
        ProductOrder.objects.filter(customer=customer,ordered=False).delete()
    except Exception as e:
        print(e)
        return JsonResponse({"success":False}) 
    print("all deleted")
    return JsonResponse(data={},status=status.HTTP_200_OK) 

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
        ProductOrder.objects.filter(customer=customer,product=product,ordered=False).delete()
    except Exception as e:
        print(e)
        return JsonResponse({"success":False}) 
    print("deleted from cart")
    return JsonResponse(data={},status=status.HTTP_200_OK) 


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def getCart(request):
    try:
        customer=Customer.objects.get(user=request.user)
    except:
        return JsonResponse({"success":False}) 
    try:
        carpro=ProductOrder.objects.filter(customer=customer,ordered=False).values(
                _id=F('product__id'),
                product_name=F('product__title'),
                product_price=F('product__price'),
                product_qty=F('quantity'),
                product_category=F('product__category__title'),
                product_image=F('product__image')
                )
        for i in carpro:
            i.update({'product_subtotal':int(i['product_qty'])*int(i['product_price'])}) # calculating subtotal
            i.update({'product_image':'/media/'+i['product_image']}) # adding media keyword in image url

        data={}
        data.update({'items':list(carpro)})
        return JsonResponse(data=data,status=status.HTTP_200_OK) 
    except Exception as e:
        print(e)
        return JsonResponse({"success":False}) 

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def getAddressMakeOrder(request):
    try:
        received_json_data = json.loads(request.body.decode("utf-8"))
        customer=Customer.objects.get(user=request.user)
    except:
        return JsonResponse({"success":False}) 
    print(request.user)
    try:
        addressRazorpay=received_json_data['address']+" "+received_json_data['postal_code']+" "+received_json_data['state']
        address=BillingAddress(
            full_name=received_json_data['full_name'],
            phone=received_json_data['phone'],
            address=received_json_data['address'],
            city=received_json_data['city'],
            state=received_json_data['state'],
            postal_code=received_json_data['postal_code']
        )
        address.save()
        products=ProductOrder.objects.filter(customer=customer,ordered=False)
        order=Order(
            customer=customer,
            address=address,
            ordered_date=datetime.now().astimezone()
        )
        order.save()
        # print(order.id)
        for p in products:
            order.products.add(p)
        order.amount=order.get_total_order_price()
        order.save(update_fields=['amount'])
        
        
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        data = {
                "amount": order.amount*100,
                "currency": "INR",
                "receipt": str(order.id),
                "notes": {
                    "order ID":order.id,
                    "name": str(received_json_data['full_name']),
                    "address": addressRazorpay
                }
            }
        razorOrder=client.order.create(data=data)
        print(razorOrder)
        print(request.user.email)
        print(f'Total Order Amount:- '+str(order.get_total_order_price()))
        return JsonResponse({"success":True,"order_no":order.id,"razorOrder_id":razorOrder['id'],"amount":razorOrder['amount'],"email":request.user.email})
    except Exception as e:
        print(e)
        return JsonResponse({"success":False}) 

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def finalOrderPaymentRequest(request):
    try:
        received_json_data = json.loads(request.body.decode("utf-8"))
    except:
        return JsonResponse({"success":False}) 
    print(request.user)
    try:
        order_no=received_json_data['order_no']
        razorpay_order_id=received_json_data['razorpay_order_id']
        razorpay_payment_id=received_json_data['razorpay_payment_id']
        razorpay_signature=received_json_data['razorpay_signature']
        order=Order.objects.get(id=order_no)
        order.ordered=True      #from here it denotes the order payment is done!!!
        order.razorpay_order_id=razorpay_order_id
        order.razorpay_payment_id=razorpay_payment_id
        order.razorpay_signature=razorpay_signature
        order.save(update_fields=['razorpay_order_id','razorpay_payment_id','razorpay_signature','ordered'])
        orderProducts=order.products.all()
        for op in orderProducts:
            op.ordered=True
            op.save()
        try:
            # its not taking order object throwing error of order object is not JSON serializer
            send_order_email_confirmation.delay(order.id) 
        except Exception as e:
            print(e)
        return JsonResponse({"success":True,"order_no":order.id})
    except Exception as e:
        print(e)
        return JsonResponse({"success":False,"order_no":order.id})

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def getMyOrders(request):
    try:
        customer=Customer.objects.get(user=request.user)
    except:
        return JsonResponse({"success":False})
    print(request.user)
    try:
        orders=Order.objects.filter(customer=customer,ordered=True).order_by('-id')
        data=[]
        for order in orders:
            t={
                "id":order.id,
                "amount":order.amount,
                "ordered":order.ordered,
                "products":order.products.all().count(),
                "date":order.ordered_date.strftime("%m/%d/%Y")
            }
            data.append(t)
        return JsonResponse({"success":True,"data":data})

    except Exception as e:
        print(e)
        return JsonResponse({"success":False})

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def getOrder(request,order_id):
    try:
        customer=Customer.objects.get(user=request.user)
    except:
        return JsonResponse({"success":False})
    print(request.user)
    try:
        order=Order.objects.get(id=order_id)
        data=[]
        product_order=order.products.all()# fetch all product object of this order
        for p in product_order:
            t={
                "product_id":p.product.id,
                "product_title":p.product.title,
                "product_price":p.product.price,
                "product_qty":p.quantity,
                "product_total":p.get_total_product_price()
            }
            data.append(t)
        return JsonResponse({"success":True,"data":data,"amount":order.amount})

    except Exception as e:
        print(e)
        return JsonResponse({"success":False})


@api_view(['GET'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def getOrderInvoiceMail(request,order_id):
    try:
        customer=Customer.objects.get(user=request.user)
    except:
        return JsonResponse({"success":False})
    print(request.user)
    try:
        send_order_email_confirmation.delay(order_id) 
        return JsonResponse({"success":True,"message":"Email sent!"})
    except Exception as e:
        print(e)
        return JsonResponse({"success":False})

@api_view(['POST'])
@permission_classes((IsAuthenticated,))
@authentication_classes([JWTAuthentication])
def review(request,pk):
    try:
        received_json_data = json.loads(request.body.decode("utf-8"))
        customer=Customer.objects.get(user=request.user)
        product=Product.objects.get(id=pk)
    except:
        return JsonResponse({"success":False,"message":"Internal server Error!"})
    try:
        reviewObject=Review(
            customer=customer,
            product=product,
            title=received_json_data['title'],
            message=received_json_data['message'],
            rating=received_json_data['star']
        )
        reviewObject.save()
        reviewsAvgRating=Review.objects.filter(product=product).aggregate(Avg('rating'))
        product.rating=floor(reviewsAvgRating['rating__avg'])
        product.save(update_fields=['rating'])
        return JsonResponse({"success":True,"message":"Review Posted"})
    except Exception as e:
        print(e)
        return JsonResponse({"success":False,"message":"Internal server Error!"})

@api_view(['GET'])
# @permission_classes((IsAuthenticated,))
# @authentication_classes([JWTAuthentication])
def searchItem(request,searchKeyword):
    try:
        try:
            products=Product.objects.filter(
                Q(title__icontains=searchKeyword)|
                Q(category__title__icontains=searchKeyword)|
                Q(description__icontains=searchKeyword)|
                Q(type__icontains=searchKeyword)).values('id','title','category__title','price','image').order_by('-id')[:25]
            data=[]
            for t in products:
                d={
                    "id":t['id'],
                    "title":t['title'],
                    "category":t['category__title'],
                    "price":t['price'],
                    "image":t['image']
                }
                data.append(d)
        except Exception as e:
            print(e)
            return JsonResponse({"success":False,"message":"Internal server Error!"})
        return JsonResponse(data=data,safe=False,status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return JsonResponse({"success":False,"message":"Internal server Error!"})