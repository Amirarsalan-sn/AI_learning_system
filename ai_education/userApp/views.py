from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
# Create your views here.
"""
You may want to change the userApp view to a class based view.
"""


# the signin procedure.
@api_view(['POST'])
def signin(request):
    return HttpResponse('User signin.')


# the login procedure.
@api_view(['POST'])
def login(request):
    return HttpResponse('User login.')


# the logout procedure.
@api_view(['POST'])
def logout(request):
    return HttpResponse('User logout.')



