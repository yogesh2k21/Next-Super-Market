from django.urls import path
from . import views

urlpatterns = [
    path('csrfToken/', views.csrfToken,name='csrfToken'),
]