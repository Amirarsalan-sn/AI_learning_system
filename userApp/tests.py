from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import CustomUser

from .serializers import SignupSerializer
from django.urls import reverse
from django.contrib.auth import get_user_model


class LoginTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword',role='T')

    def test_login_successful(self):
        url = '/auth/login/'
        data = {'username': 'testuser', 'password': 'testpassword'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Token', response.data['data'])

    def test_login_invalid_credentials(self):
        url = '/auth/login/'
        data = {'username': 'testuser', 'password': 'wrongpassword'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('Invalid Email or Password', response.data['message'])

    def test_login_bad_request(self):
        url = '/auth/login/'
        data = {'username': 'testuser'}  # Missing 'password'
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data['data'])  # Expecting a validation error

    def test_login_unauthenticated_user(self):
        url = '/auth/login/'
        data = {'username': 'nonexistentuser', 'password': 'testpassword'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('Invalid Email or Password', response.data['message'])


class SignUpTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_signup_successful(self):
        url = '/auth/signup/'
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'username': 'johndoe',
            'password': 'securepassword',
            'email': 'john.doe@example.com',
            'role': 'S'  # Assuming 'S' corresponds to a student role
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(get_user_model().objects.count(), 1)

    def test_signup_bad_request(self):
        url = '/auth/signup/'
        data = {
            'first_name': 'John',
            'last_name': 'Doe',
            'password': 'securepassword',
            'role': 'S'  # Missing 'username'
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(get_user_model().objects.count(), 0)