from django.db import models

# Create your models here.
class Category(models.Model):
    title=models.CharField(max_length=50)
    description=models.CharField(max_length=150,blank=True,null=True)
    url=models.CharField(max_length=1000,blank=True)
    def __str__(self):
        return f'{self.title}'

class Product(models.Model):
    title=models.CharField(max_length=50)
    type=models.CharField(max_length=50)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    description=models.CharField(max_length=50)
    image=models.ImageField(upload_to='productImages/')
    price=models.FloatField(default=0)
    rating=models.IntegerField(default=1)
    def __str__(self):
        return f'{self.id} - {self.title} - {self.type}'