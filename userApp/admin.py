from django.contrib import admin
from rest_framework.authtoken.models import Token
from .models import CustomUser
# Register your models here.

admin.site.register(CustomUser)