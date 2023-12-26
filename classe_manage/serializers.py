from rest_framework import serializers
from .models import ClassRoom, ChatRoom, Chat
from ..userApp.serializers import SimpleUserSerializer


# because this serializer is used only when we are creating a classroom, and when we are creating a classroom there
# is only one attendant, I think there would be no problem if we just use SimpleUserSerializer().
# but in case we wanted to send all the attendants of a class along with its title an id in one response, we can use it.
class ClassRoomCreateSerializer(serializers.ModelSerializer):
    class_attendants = SimpleUserSerializer(many=True)

    class Meta:
        model = ClassRoom
        fields = ('id', 'class_title', 'class_attendants')


class ClassRoomGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = ('id', 'class_title')


class ChatRoomSerializer(serializers.ModelSerializer):
    chat_class = ClassRoomGetSerializer()

    class Meta:
        model = ChatRoom
        fields = ('id', 'chat_class')


class ChatSerializer(serializers.ModelSerializer):
    chat_room = ChatRoomSerializer()
    chat_author = SimpleUserSerializer()

    class Meta:
        model = Chat
        fields = ('chat_room', 'chat_author', 'chat_body', 'created_time')
