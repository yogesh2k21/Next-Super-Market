from django import views
from django.urls import path
from . import views

urlpatterns = [
    path('/<int:pk>', views.getItem,name='getItem'),
]