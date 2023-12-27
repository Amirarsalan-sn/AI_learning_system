from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ClassRoom , Discussion , Reply
from .serializers import ClassRoomDetailedSerializer, ClassRoomSerializer, DiscussionSerializer, \
    DiscussionDetailedSerializer, ReplySerializer
from .permissions import IsProfessorTAOrReadOnly


class ClassAPIView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsProfessorTAOrReadOnly]

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

    def post(self, request):
        serializer = ClassRoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

    def get(self, request, class_id,pk=None):
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

    def post(self, request,class_id):
        serializer = DiscussionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

    def post(self, request,class_id,discussion_id):
        serializer = ReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request,class_id,discussion_id, pk):
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

    def delete(self, request,class_id,discussion_id,pk):
        try:
            reply = Reply.objects.get(pk=pk)
            if reply.author != request.user.id:
                return Response({"detail": "you cant edit this reply"}, status=status.HTTP_404_NOT_FOUND)
        except Reply.DoesNotExist:
            return Response({"detail": "reply not found"}, status=status.HTTP_404_NOT_FOUND)

        reply.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)