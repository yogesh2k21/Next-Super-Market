from .models import Product
from rest_framework import serializers

class ProductSerializer(serializers.Serializer):
    title=serializers.CharField(max_length=50)
    type=serializers.CharField(max_length=50)
    description=serializers.CharField(max_length=50)
    image=serializers.ImageField()
    price=serializers.FloatField(default=0)
    rating=serializers.IntegerField(default=1)