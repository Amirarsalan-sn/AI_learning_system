from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password


class SignupSerializer(serializers.ModelSerializer):
    """override create method to change the password into hash."""

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data.get("password"))
        return super(SignupSerializer, self).create(validated_data)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']


class LoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField()

    class Meta:
        model = User
        fields = ['username', 'password']