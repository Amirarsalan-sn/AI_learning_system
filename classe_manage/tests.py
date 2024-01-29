from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import CustomUser, ClassRoom, Discussion, Reply
from rest_framework.authtoken.models import Token
import uuid
from .utils import PasswordGenerator


class ClassAPIViewTests(TestCase):
    databases = '__all__'

    def setUp(self):
        self.client = APIClient()
        password_generator = PasswordGenerator()

        unique_username = f'Student_{uuid.uuid4().hex[:6]}'
        self.student = CustomUser.objects.create_user(username=unique_username, password=password_generator.generate_strong_password(), role='S')

        self.token, _ = Token.objects.get_or_create(user=self.student)

        prof_username = f'Professor_{uuid.uuid4().hex[:6]}'
        self.professor = CustomUser.objects.create_user(username=prof_username, password=password_generator.generate_strong_password(), role='P')

        self.classroom = ClassRoom.objects.create(ClassName='Test Class', ProfessorID=self.professor)
        self.classroom.students.add(self.student)

    def authenticate(self):
        # Helper function to authenticate the student
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def create_classroom(self, name='New Class', professor=None):
        # Helper function to create a classroom
        professor = professor or self.professor
        return ClassRoom.objects.create(ClassName=name, ProfessorID=professor)

    def test_get_class_list(self):
        self.authenticate()
        response = self.client.get('/api/classes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('Test Class', [class_data['ClassName'] for class_data in response.data])

    def test_get_single_class(self):
        self.authenticate()
        response = self.client.get(f'/api/classes/{self.classroom.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['ClassName'], 'Test Class')

    def test_get_class_not_found(self):
        self.authenticate()
        response = self.client.get('/api/classes/9999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_class(self):
        self.authenticate()
        data = {'ClassName': 'New Class', 'ProfessorID': self.professor.id}
        response = self.client.post('/api/classes/', data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_class(self):
        self.authenticate()
        new_class = self.create_classroom('Another Class')
        data = {'ClassName': 'Updated Class Name'}
        response = self.client.put(f'/api/classes/{new_class.pk}/', data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_class(self):
        self.authenticate()
        new_class = self.create_classroom('Another Class')
        response = self.client.delete(f'/api/classes/{new_class.pk}/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class DiscussionAPIViewTests(TestCase):
    databases = '__all__'

    def setUp(self):
        self.client = APIClient()
        password_generator = PasswordGenerator()

        # Create a student user
        unique_username = f'Student_{uuid.uuid4().hex[:6]}'
        self.student = CustomUser.objects.create_user(username=unique_username, password=password_generator.generate_strong_password(), role='S')
        self.student_token, _ = Token.objects.get_or_create(user=self.student)

        # Create a professor user
        prof_username = f'Professor_{uuid.uuid4().hex[:6]}'
        self.professor = CustomUser.objects.create_user(username=prof_username, password=password_generator.generate_strong_password(), role='P')
        self.professor_token, _ = Token.objects.get_or_create(user=self.professor)

        # Create a classroom
        self.classroom = ClassRoom.objects.create(ClassName='Test Class', ProfessorID=self.professor)

    def authenticate(self, user_token):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + user_token.key)

    def create_discussion(self, title='Test Discussion', user=None, classroom=None):
        user = user or self.student
        classroom = classroom or self.classroom
        return Discussion.objects.create(title=title, question="Test Question", creator=user, classroom=classroom)

    def test_get_discussion_not_found(self):
        self.authenticate(self.student_token)
        response = self.client.get(f'/classes/{self.classroom.id}/discussion/9999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_discussion_not_creator(self):
        self.authenticate(self.professor_token)
        discussion = self.create_discussion()
        data = {'title': 'Updated Discussion', 'question': 'Updated question'}
        response = self.client.put(f'/classes/{self.classroom.id}/discussion/{discussion.id}', data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_discussion_not_found(self):
        self.authenticate(self.student_token)
        data = {'title': 'Updated Discussion', 'question': 'Updated question'}
        response = self.client.put(f'/classes/{self.classroom.id}/discussion/9999/', data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_discussion_not_creator(self):
        self.authenticate(self.professor_token)
        discussion = self.create_discussion()
        response = self.client.delete(f'/classes/{self.classroom.id}/discussion/{discussion.id}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_discussion_not_found(self):
        self.authenticate(self.student_token)
        response = self.client.delete(f'/classes/{self.classroom.id}/discussion/9999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class ReplyAPIViewTests(TestCase):
    databases = '__all__'

    def setUp(self):
        self.client = APIClient()
        self.password_generator = PasswordGenerator()

        # Create users
        self.user = CustomUser.objects.create_user(username=f'User_{uuid.uuid4().hex[:6]}', password=self.password_generator.generate_strong_password())
        self.user_token, _ = Token.objects.get_or_create(user=self.user)

        # Create a classroom and discussion
        self.classroom = ClassRoom.objects.create(ClassName='Test Class', ProfessorID=self.user)
        self.discussion = Discussion.objects.create(title='Test Discussion', question="Test Question",
                                                    creator=self.user, classroom=self.classroom)

    def authenticate(self, user_token):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + user_token.key)

    def create_reply(self, body='Test Reply', author=None, discussion=None):
        author = author or self.user
        discussion = discussion or self.discussion
        return Reply.objects.create(body=body, author=author, discussion=discussion)

    def test_update_reply_not_author(self):
        # Create a reply with a different author
        other_user = CustomUser.objects.create_user(username=f'OtherUser_{uuid.uuid4().hex[:6]}', password=self.password_generator.generate_strong_password())
        reply = self.create_reply(author=other_user)

        self.authenticate(self.user_token)
        updated_data = {'body': 'Updated Reply'}
        response = self.client.put(f'/classes/{self.classroom.id}/discussion/{self.discussion.id}/reply/{reply.id}', updated_data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_reply_not_found(self):
        self.authenticate(self.user_token)
        updated_data = {'body': 'Updated Reply'}
        response = self.client.put(f'/classes/{self.classroom.id}/discussion/{self.discussion.id}/reply/9999', updated_data)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_reply_not_author(self):
        other_user = CustomUser.objects.create_user(username=f'OtherUser_{uuid.uuid4().hex[:6]}', password=self.password_generator.generate_strong_password())
        reply = self.create_reply(author=other_user)

        self.authenticate(self.user_token)
        response = self.client.delete(f'/classes/{self.classroom.id}/discussion/{self.discussion.id}/reply/{reply.id}')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_reply_not_found(self):
        self.authenticate(self.user_token)
        response = self.client.delete(f'/classes/{self.classroom.id}/discussion/{self.discussion.id}/reply/9999')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
