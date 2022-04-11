from django import views
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home,name='home'),
    path('product/<int:pk>', views.getItem,name='getItem'),
]