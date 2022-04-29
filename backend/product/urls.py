from django import views
from django.urls import path
from . import views

urlpatterns = [
    path('category/', views.category,name='category'),
    path('getProductCategoryWise/<str:id>/', views.getProductCategoryWise,name='getProductCategoryWise'),
    path('<int:pk>', views.getItem,name='getItem'),
]