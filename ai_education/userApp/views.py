from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, logout as log_out
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import SignupSerializer, UserSerializer, LoginSerializer
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
        #user = User.objects.get(request.POST['username'])
        #Token.objects.get_or_create(user=user)
        res = {'status': status.HTTP_201_CREATED}
        return Response(res, status=status.HTTP_201_CREATED)
    res = {'status': status.HTTP_400_BAD_REQUEST, 'data': serializer.errors}
    return Response(res, status=status.HTTP_400_BAD_REQUEST)


# the login procedure.
@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            """We are reterving the token for authenticated user."""
            token, created = Token.objects.get_or_create(user=user)
            response = {
                "status": status.HTTP_200_OK,
                "message": "success",
                "data": {
                    "Token": token.key
                }
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            response = {
                "status": status.HTTP_401_UNAUTHORIZED,
                "message": "Invalid Email or Password",
            }
            return Response(response, status=status.HTTP_401_UNAUTHORIZED)
    response = {
        "status": status.HTTP_400_BAD_REQUEST,
        "message": "bad request",
        "data": serializer.errors
    }
    return Response(response, status=status.HTTP_400_BAD_REQUEST)


# the logout procedure.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    log_out(request)
    return Response(status=status.HTTP_200_OK)
