from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .serializers import SignupSerializer
# Create your views here.
"""
You may want to change the userApp view to a class based view.
"""


# the signin procedure.
@api_view(['POST'])
def signin(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        """If the validation success, it will created a new user."""
        serializer.save()
        res = {'status': status.HTTP_201_CREATED}
        return Response(res, status=status.HTTP_201_CREATED)
    res = {'status': status.HTTP_400_BAD_REQUEST, 'data': serializer.errors}
    return Response(res, status=status.HTTP_400_BAD_REQUEST)


# the login procedure.
@api_view(['POST'])
def login(request):
    return HttpResponse('User login.')


# the logout procedure.
@api_view(['POST'])
def logout(request):
    return HttpResponse('User logout.')



