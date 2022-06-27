from celery import shared_task
from time import sleep
from django.core.mail import send_mail
from django.conf import settings
from product.models import Order
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags

@shared_task
def sleepy(duration):
    sleep(duration)
    return None

@shared_task
def send_order_email_confirmation(order_id):
    try:
        order=Order.objects.get(id=order_id)
        items=[]
        for pro in order.products.all():
            t={
                "title":pro.product.title,
                "quantity":pro.quantity,
                "total":str(pro.get_total_product_price())
            }
            items.append(t)
        user_mail=str(order.customer.user.email)
        print(user_mail)
    except Exception as e:
        print("celery email error")
        print(e)
    html_content=render_to_string('order_confirm_mail_template.html',{"order_id":order.id,"items":items,"amount":order.amount})
    text_content=strip_tags(html_content)

    email=EmailMultiAlternatives(
        "Next Super Market Order info",
        text_content,
        settings.EMAIL_HOST_USER,
        [user_mail]
    )
    email.attach_alternative(html_content,"text/html")
    email.fail_silently=False
    email.send()
    print("Mail has been sent.")
    return None

# from product.models import Order
# from product.tasks import send_order_email_confirmation
# send_order_email_confirmation(41)