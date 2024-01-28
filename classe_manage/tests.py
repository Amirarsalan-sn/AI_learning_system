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

    def test_get_class_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get('/api/classes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_class(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        data = {'name': 'New Class', 'ProfessorID': self.user.id}
        response = self.client.post('/api/classes/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ClassRoom.objects.count(), 2)

    def test_update_class(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        data = {'name': 'Updated Class', 'ProfessorID': self.user.id}
        response = self.client.put(f'/api/classes/{self.classroom.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.classroom.refresh_from_db()
        self.assertEqual(self.classroom.name, 'Updated Class')

    def test_delete_class(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.delete(f'/api/classes/{self.classroom.id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(ClassRoom.objects.count(), 0)