from django.test import SimpleTestCase
from rest_framework.test import APIClient
from userApp.models import CustomUser
from rest_framework.authtoken.models import Token
from .models import ClassRoom, Discussion, Reply, Exercise, Submission, Grade
from rest_framework import status
import uuid


class ClassAPIViewTests(SimpleTestCase):
    databases = '__all__'

    def setUp(self):
        self.client = APIClient()
        unique_username = f'TestUser_{uuid.uuid4().hex[:6]}'  # Generate a unique username
        self.user = CustomUser.objects.create_user(username=unique_username, password='12345678@')
        try:
            self.token = Token.objects.get(user=self.user)
        except Token.DoesNotExist:
            # If the token doesn't exist, create a new one
            self.token = Token.objects.create(user=self.user)

        self.classroom = ClassRoom.objects.create(ClassName='Test Class', ProfessorID=self.user)

    def test_get_class_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get('/api/classes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_class(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        data = {'name': 'New Class', 'ProfessorID': self.user.id}
        response = self.client.post('/api/classes/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(ClassRoom.objects.count(), 1)

    def test_update_class(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        data = {'name': 'Updated Class', 'ProfessorID': self.user.id}
        response = self.client.put(f'/api/classes/{self.classroom.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.classroom.refresh_from_db()
        self.assertEqual(self.classroom.ClassName, 'Test Class')

    def test_delete_class(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.delete(f'/api/classes/{self.classroom.id}/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(ClassRoom.objects.count(), 2)


class DiscussionAPIViewTests(SimpleTestCase):
    databases = '__all__'

    def setUp(self):
        self.client = APIClient()
        unique_username = f'TestUser_{uuid.uuid4().hex[:6]}'  # Generate a unique username
        self.user = CustomUser.objects.create_user(username=unique_username, password='12345')
        try:
            self.token = Token.objects.get(user=self.user)
        except Token.DoesNotExist:
            # If the token doesn't exist, create a new one
            self.token = Token.objects.create(user=self.user)
        self.classroom = ClassRoom.objects.create(ClassName='Test Class', ProfessorID=self.user)
        self.discussion = Discussion.objects.create(title='Test Discussion', creator=self.user, classroom=self.classroom)

    def test_get_discussion_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get(f'/api/discussions/{self.classroom.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_discussion_detail(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.get(f'/api/discussions/{self.classroom.id}/{self.discussion.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_discussion(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        data = {'title': 'New Discussion', 'creator': self.user.id, 'classroom': self.classroom.id}
        response = self.client.post(f'/api/discussions/{self.classroom.id}/', data, format='json')


# class ReplyAPIViewTests(SimpleTestCase):
#     databases = '__all__'
#
#     def setUp(self):
#         self.client = APIClient()
#         unique_username = f'TestUser_{uuid.uuid4().hex[:6]}'  # Generate a unique username
#         self.user = CustomUser.objects.create_user(username=unique_username, password='12345')
#         try:
#             self.token = Token.objects.get(user=self.user)
#         except Token.DoesNotExist:
#             # If the token doesn't exist, create a new one
#             self.token = Token.objects.create(user=self.user)
#         self.classroom = ClassRoom.objects.create(ClassName='Test Class', ProfessorID=self.user)
#         self.discussion = Discussion.objects.create(title='Test Discussion', creator=self.user, classroom=self.classroom)
#         self.reply = Reply.objects.create(author=self.user, discussion=self.discussion)
#
#     def test_get_reply_list(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         response = self.client.get(f'/api/replies/{self.discussion.id}/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_get_reply_detail(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         response = self.client.get(f'/api/replies/{self.discussion.id}/{self.reply.id}/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_create_reply(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         data = {'content': 'New Reply', 'author': self.user.id, 'discussion': self.discussion.id}
#         response = self.client.post(f'/api/replies/{self.discussion.id}/', data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Reply.objects.count(), 2)
#
#     def test_update_reply(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         data = {'content': 'Updated Reply', 'author': self.user.id, 'discussion': self.discussion.id}
#         response = self.client.put(f'/api/replies/{self.discussion.id}/{self.reply.id}/', data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.reply.refresh_from_db()
#         self.assertEqual(self.reply.content, 'Updated Reply')
#
#     def test_delete_reply(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         response = self.client.delete(f'/api/replies/{self.discussion.id}/{self.reply.id}/')
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertEqual(Reply.objects.count(), 0)


# class ExerciseAPIViewTests(SimpleTestCase):
#     databases = '__all__'
#
#     def setUp(self):
#         self.client = APIClient()
#         self.user = CustomUser.objects.create_user(username='testuser', password='12345')
#         self.token = Token.objects.create(user=self.user)
#         self.classroom = ClassRoom.objects.create(name='Test Class', ProfessorID=self.user.id)
#         self.exercise = Exercise.objects.create(title='Test Exercise', description='Test Description', classroom=self.classroom)
#
#     def test_get_exercise_list(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         response = self.client.get(f'/api/exercises/{self.classroom.id}/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_get_exercise_detail(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         response = self.client.get(f'/api/exercises/{self.classroom.id}/{self.exercise.id}/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_create_exercise(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         data = {'title': 'New Exercise', 'description': 'New Description', 'classroom': self.classroom.id}
#         response = self.client.post(f'/api/exercises/{self.classroom.id}/', data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Exercise.objects.count(), 2)
#
#     def test_update_exercise(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         data = {'title': 'Updated Exercise', 'description': 'Updated Description', 'classroom': self.classroom.id}
#         response = self.client.put(f'/api/exercises/{self.classroom.id}/{self.exercise.id}/', data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.exercise.refresh_from_db()
#         self.assertEqual(self.exercise.title, 'Updated Exercise')
#
#     def test_delete_exercise(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         response = self.client.delete(f'/api/exercises/{self.classroom.id}/{self.exercise.id}/')
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertEqual(Exercise.objects.count(), 0)
#
#
# class SubmissionAPIViewTests(SimpleTestCase):
#     databases = '__all__'
#
#     def setUp(self):
#         self.client = APIClient()
#         self.user = CustomUser.objects.create_user(username='testuser', password='12345')
#         self.token = Token.objects.create(user=self.user)
#         self.classroom = ClassRoom.objects.create(name='Test Class', ProfessorID=self.user.id)
#         self.exercise = Exercise.objects.create(title='Test Exercise', description='Test Description', classroom=self.classroom)
#         self.submission = Submission.objects.create(author=self.user, exercise=self.exercise, content='Test Submission')
#
#     def test_get_submission_list(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         response = self.client.get(f'/api/submissions/{self.exercise.id}/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_get_submission_detail(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         response = self.client.get(f'/api/submissions/{self.exercise.id}/{self.submission.id}/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_create_submission(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         data = {'author': self.user.id, 'exercise': self.exercise.id, 'content': 'New Submission'}
#         response = self.client.post(f'/api/submissions/{self.exercise.id}/', data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Submission.objects.count(), 2)
#
#     def test_update_submission(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         data = {'author': self.user.id, 'exercise': self.exercise.id, 'content': 'Updated Submission'}
#         response = self.client.put(f'/api/submissions/{self.exercise.id}/{self.submission.id}/', data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.submission.refresh_from_db()
#         self.assertEqual(self.submission.content, 'Updated Submission')
#
#     def test_delete_submission(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         response = self.client.delete(f'/api/submissions/{self.exercise.id}/{self.submission.id}/')
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertEqual(Submission.objects.count(), 0)
#
#
# class GradeAPIViewTests(SimpleTestCase):
#     databases = '__all__'
#
#     def setUp(self):
#         self.client = APIClient()
#         self.user = CustomUser.objects.create_user(username='testuser', password='12345')
#         self.token = Token.objects.create(user=self.user)
#         self.classroom = ClassRoom.objects.create(name='Test Class', ProfessorID=self.user.id)
#         self.exercise = Exercise.objects.create(title='Test Exercise', description='Test Description', classroom=self.classroom)
#         self.submission = Submission.objects.create(author=self.user, exercise=self.exercise, content='Test Submission')
#         self.grade = Grade.objects.create(submission=self.submission, score=90, graded_by=self.user)
#
#     def test_get_grade_list(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         response = self.client.get(f'/api/grades/{self.submission.id}/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_get_grade_detail(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         response = self.client.get(f'/api/grades/{self.submission.id}/{self.grade.id}/')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#
#     def test_create_grade(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         data = {'submission': self.submission.id, 'score': 95, 'graded_by': self.user.id}
#         response = self.client.post(f'/api/grades/{self.submission.id}/', data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Grade.objects.count(), 2)
#
#     def test_update_grade(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         data = {'submission': self.submission.id, 'score': 85, 'graded_by': self.user.id}
#         response = self.client.put(f'/api/grades/{self.submission.id}/{self.grade.id}/', data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.grade.refresh_from_db()
#         self.assertEqual(self.grade.score, 85)
#
#     def test_delete_grade(self):
#         self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
#         response = self.client.delete(f'/api/grades/{self.submission.id}/{self.grade.id}/')
#         self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertEqual(Grade.objects.count(), 0)
