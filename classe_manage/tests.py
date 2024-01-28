from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import ClassRoom, Discussion, Reply, Exercise, Submission, Grade
from rest_framework import status


class ClassAPIViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='12345')
        self.token = Token.objects.create(user=self.user)
        self.classroom = ClassRoom.objects.create(name='Test Class', ProfessorID=self.user.id)
