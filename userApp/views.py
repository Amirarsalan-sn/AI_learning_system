from django.contrib.auth import authenticate, logout as log_out
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .models import CustomUser

from .serializers import SignupSerializer, LoginSerializer


class SignUp(APIView):
    serializer_class = SignupSerializer
    permission_classes = (AllowAny,)

    @swagger_auto_schema(request_body=serializer_class,
                            responses={201: 'Sign up Successful', 400: 'Bad Request'})
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            # Check if the username already exists
            username = serializer.validated_data.get('username')
            if CustomUser.objects.filter(username=username).exists():
                res = {'status': status.HTTP_400_BAD_REQUEST, 'error': 'Duplicate username'}
                return Response(res, status=status.HTTP_400_BAD_REQUEST)

            # If the username is unique, create a new user
            serializer.save()
            res = {'status': status.HTTP_201_CREATED}
            return Response(res, status=status.HTTP_201_CREATED)

        res = {'status': status.HTTP_400_BAD_REQUEST, 'data': serializer.errors}
        return Response(res, status=status.HTTP_400_BAD_REQUEST)


class Login(APIView):
    permission_classes = (AllowAny,)

    @swagger_auto_schema(request_body=LoginSerializer,
                         responses={200: 'Login Successful', 401: 'Unauthorized', 400: 'Bad Request'})
    def post(self, request):
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


class Logout(APIView):
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(responses={200: 'Logout Successful'})
    def post(self, request):
        request.user.auth_token.delete()
        log_out(request)
        return Response(status=status.HTTP_200_OK)


class Profile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = get_object_or_404(CustomUser, username=request.user.username)
        return Response({
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'username': user.username,
            'email': user.email,
            'role': user.role,
        }, status=status.HTTP_200_OK)
    # TODO: add put method for user to edit his information
