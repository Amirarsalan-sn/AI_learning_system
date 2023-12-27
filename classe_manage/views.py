from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ClassRoom
from .serializers import ClassRoomDetailedSerializer


class ClassInfoView(APIView):
    def get(self, request, class_id):
        try:
            classroom = ClassRoom.objects.get(pk=class_id)
        except ClassRoom.DoesNotExist:
            return Response({"error": "Class not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ClassRoomDetailedSerializer(classroom)
        return Response(serializer.data, status=status.HTTP_200_OK)
