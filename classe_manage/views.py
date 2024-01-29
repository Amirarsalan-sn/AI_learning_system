from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ClassRoom, Discussion, Reply, Exercise, Submission, Grade
from .serializers import ClassRoomDetailedSerializer, ClassRoomSerializer, DiscussionSerializer, \
    DiscussionDetailedSerializer, ReplySerializer, ExerciseSerializer, SubmissionSerializer, GradeSerializer
from .permissions import IsProfessorTAOrReadOnly
from .utils import SearchAlgos,GraphProcessing


class ClassAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsProfessorTAOrReadOnly]

    @swagger_auto_schema(responses={200: ClassRoomDetailedSerializer(many=True), 404: 'Class not found'})
    def get(self, request, pk=None):
        user = request.user

        if pk is None:
            if user.role == 'P':
                classes = user.classes_p
            elif user.role == 'T':
                classes = user.classes_t
            else:
                classes = user.classes_s

            serializer = ClassRoomDetailedSerializer(classes, many=True)
            return Response(serializer.data)
        else:
            try:
                classroom = ClassRoom.objects.get(pk=pk)
            except ClassRoom.DoesNotExist:
                return Response({"detail": "Class not found"}, status=404)

            serializer = ClassRoomDetailedSerializer(classroom)
            return Response(serializer.data)

    @swagger_auto_schema(request_body=ClassRoomSerializer, responses={201: ClassRoomSerializer, 400: 'Bad Request'})
    def post(self, request):
        serializer = ClassRoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(request_body=ClassRoomSerializer,
                         responses={200: ClassRoomSerializer, 400: 'Bad Request', 404: 'Class not found'})
    def put(self, request, pk):
        try:
            classroom = ClassRoom.objects.get(pk=pk)
            if classroom.ProfessorID != request.user.id:
                return Response({"detail": "you cant edit this class"}, status=status.HTTP_404_NOT_FOUND)
        except ClassRoom.DoesNotExist:
            return Response({"detail": "Class not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ClassRoomSerializer(classroom, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={204: 'No Content', 404: 'Class not found'})
    def delete(self, request, pk):
        try:
            classroom = ClassRoom.objects.get(pk=pk)
            if classroom.ProfessorID != request.user.id:
                return Response({"detail": "you cant edit this class"}, status=status.HTTP_404_NOT_FOUND)
        except ClassRoom.DoesNotExist:
            return Response({"detail": "class not found"}, status=status.HTTP_404_NOT_FOUND)

        classroom.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DiscussionAPIView(APIView):
    authentication_classes = [TokenAuthentication]

    @swagger_auto_schema(responses={200: DiscussionDetailedSerializer(many=True), 404: 'Discussion not found'})
    def get(self, request, class_id, pk=None):
        user = request.user

        if pk is None:
            discussions = Discussion.objects.filter(classroom=class_id)
            serializer = DiscussionDetailedSerializer(discussions, many=True)
            return Response(serializer.data)
        else:
            try:
                disc = Discussion.objects.get(pk=pk)
            except Discussion.DoesNotExist:
                return Response({"detail": "discussion not found"}, status=404)

            serializer = DiscussionDetailedSerializer(disc)
            return Response(serializer.data)

    @swagger_auto_schema(request_body=DiscussionSerializer, responses={201: DiscussionSerializer, 400: 'Bad Request'})
    def post(self, request, class_id):
        serializer = DiscussionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(request_body=DiscussionSerializer,
                         responses={200: DiscussionSerializer, 400: 'Bad Request', 404: 'Discussion not found'})
    def put(self, request, pk):
        try:
            disc = Discussion.objects.get(pk=pk)
            if disc.creator != request.user.id:
                return Response({"detail": "you cant edit this discussion"}, status=status.HTTP_404_NOT_FOUND)
        except Discussion.DoesNotExist:
            return Response({"detail": "discussion not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = DiscussionSerializer(disc, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={204: 'No Content', 404: 'Discussion not found'})
    def delete(self, request, pk):
        try:
            disc = Discussion.objects.get(pk=pk)
            if disc.creator != request.user.id:
                return Response({"detail": "you cant edit this discussion"}, status=status.HTTP_404_NOT_FOUND)
        except Discussion.DoesNotExist:
            return Response({"detail": "discussion not found"}, status=status.HTTP_404_NOT_FOUND)

        disc.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReplyAPIView(APIView):
    authentication_classes = [TokenAuthentication]

    @swagger_auto_schema(request_body=ReplySerializer, responses={201: ReplySerializer, 400: 'Bad Request'})
    def post(self, request, class_id, discussion_id):
        serializer = ReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(request_body=ReplySerializer,
                         responses={200: ReplySerializer, 400: 'Bad Request', 404: 'Reply not found'})
    def put(self, request, class_id, discussion_id, pk):
        try:
            reply = Reply.objects.get(pk=pk)
            if reply.author != request.user.id:
                return Response({"detail": "you cant edit this reply"}, status=status.HTTP_404_NOT_FOUND)
        except Reply.DoesNotExist:
            return Response({"detail": "reply not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ReplySerializer(reply, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={204: 'No Content', 404: 'Reply not found'})
    def delete(self, request, class_id, discussion_id, pk):
        try:
            reply = Reply.objects.get(pk=pk)
            if reply.author != request.user.id:
                return Response({"detail": "you cant edit this reply"}, status=status.HTTP_404_NOT_FOUND)
        except Reply.DoesNotExist:
            return Response({"detail": "reply not found"}, status=status.HTTP_404_NOT_FOUND)

        reply.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExerciseAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsProfessorTAOrReadOnly]
    parser_classes = (MultiPartParser, )

    @swagger_auto_schema(responses={200: ExerciseSerializer(many=True), 404: 'Not found'})
    def get(self, request, class_id, pk=None):
        if pk:
            try:
                exercise = Exercise.objects.get(pk=pk, classroom=class_id)
            except Exercise.DoesNotExist:
                return Response({"detail": "Exercise not found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = ExerciseSerializer(exercise)
        else:
            exercises = Exercise.objects.filter(classroom=class_id)
            serializer = ExerciseSerializer(exercises, many=True)

        return Response(serializer.data)

    @swagger_auto_schema(request_body=ExerciseSerializer, responses={201: ExerciseSerializer, 400: 'Bad Request'},
                         parser_classes=[MultiPartParser], consumes=['multipart/form-data'])
    def post(self, request, class_id):
        serializer = ExerciseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(request_body=ExerciseSerializer,
                         responses={200: ExerciseSerializer, 400: 'Bad Request', 404: 'Exercise not found'})
    def put(self, request, pk):
        try:
            exer = Exercise.objects.get(pk=pk)
        except Exercise.DoesNotExist:
            return Response({"detail": "exe not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ExerciseSerializer(exer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={204: 'No Content', 404: 'Exercise not found'})
    def delete(self, request, pk):
        try:
            exer = Exercise.objects.get(pk=pk)
        except Exercise.DoesNotExist:
            return Response({"detail": "exercise not found"}, status=status.HTTP_404_NOT_FOUND)

        exer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SubmissionAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsProfessorTAOrReadOnly]
    parser_classes = (MultiPartParser, )

    @swagger_auto_schema(responses={200: SubmissionSerializer(many=True), 404: 'Not found'})
    def get(self, request, exercise_id, pk=None):
        if pk:
            try:
                submission = Submission.objects.get(pk=pk, exercise_id=exercise_id, student=request.user)
            except Submission.DoesNotExist:
                return Response({"detail": "Submission not found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = SubmissionSerializer(submission)
        else:
            submissions = Submission.objects.filter(exercise_id=exercise_id)
            serializer = SubmissionSerializer(submissions, many=True)

        return Response(serializer.data)

    @swagger_auto_schema(request_body=SubmissionSerializer, responses={201: SubmissionSerializer, 400: 'Bad Request'})
    def post(self, request, exercise_id):
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(student=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(request_body=SubmissionSerializer,
                         responses={200: SubmissionSerializer, 400: 'Bad Request', 404: 'Submission not found'})
    def put(self, request, exercise_id, pk):
        try:
            submission = Submission.objects.get(pk=pk, student=request.user)
        except Submission.DoesNotExist:
            return Response({"detail": "submission not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = SubmissionSerializer(submission, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={204: 'No Content', 404: 'Submission not found'})
    def delete(self, request, exercise_id, pk):
        try:
            submission = Submission.objects.get(pk=pk, student=request.user)
        except Submission.DoesNotExist:
            return Response({"detail": "submission not found"}, status=status.HTTP_404_NOT_FOUND)

        submission.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class GradeAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsProfessorTAOrReadOnly]

    @swagger_auto_schema(responses={200: GradeSerializer, 404: 'Grade not found'})
    def get(self, request, submission_id, pk=None):
        if pk:
            try:
                grade = Grade.objects.get(pk=pk, submission=submission_id)
            except Grade.DoesNotExist:
                return Response({"detail": "Grade not found"}, status=status.HTTP_404_NOT_FOUND)
            serializer = GradeSerializer(grade)
            return Response(serializer.data)
        else:
            # Existing code to handle getting all grades for a submission
            try:
                grade = Grade.objects.get(submission=submission_id)
            except Grade.DoesNotExist:
                return Response({"detail": "Grade not found"}, status=404)
            serializer = GradeSerializer(grade)
            return Response(serializer.data)

    @swagger_auto_schema(request_body=GradeSerializer, responses={201: GradeSerializer, 400: 'Bad Request'})
    def post(self, request, submission_id):
        serializer = GradeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(request_body=GradeSerializer,
                         responses={200: GradeSerializer, 400: 'Bad Request', 404: 'Grade not found'})
    def put(self, request, submission_id):
        try:
            grade = Grade.objects.get(submission=submission_id)
        except Grade.DoesNotExist:
            return Response({"detail": "grade not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = GradeSerializer(grade, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(responses={204: 'No Content', 404: 'Grade not found'})
    def delete(self, request, submission_id):
        try:
            grade = Grade.objects.get(submission=submission_id)
        except Grade.DoesNotExist:
            return Response({"detail": "grade not found"}, status=status.HTTP_404_NOT_FOUND)

        grade.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class GraphAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsProfessorTAOrReadOnly]

    @swagger_auto_schema(responses={200: 'successful', 400: 'bad request'})
    def get(self, request):
        graph_processor = GraphProcessing()
        search_algos = SearchAlgos()

        adjacent_matrix = graph_processor.gen_rand_graph()
        graph_dict = graph_processor.convert_matrix_to_dict(adjacent_matrix)

        algorithm = request.query_params.get('algorithm')
        if algorithm == 'bfs':
            bfs_seq = search_algos.bfs(graph_dict)
            return Response({
                'adjecencymatrix': adjacent_matrix,
                'visitseq': bfs_seq,
            }, status=status.HTTP_200_OK)
        elif algorithm == 'dfs':
            dfs_seq = search_algos.dfs(graph_dict)
            return Response({
                'adjecencymatrix': adjacent_matrix,
                'visitseq': dfs_seq,
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid or missing algorithm parameter."}, status=status.HTTP_400_BAD_REQUEST)

