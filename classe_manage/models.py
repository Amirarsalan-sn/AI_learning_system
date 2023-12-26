from django.db import models
from userApp.models import CustomUser


# Create your models here.
class ClassRoom(models.Model):
    class_title = models.CharField(max_length=50)
    class_attendants = models.ManyToManyField(CustomUser)


class ChatRoom(models.Model):
    chat_room_title = models.CharField(max_length=70)
    chat_class = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)


class Chat(models.Model):
    chat_room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    # im not sure about this on change it if you have a better idea:
    chat_author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    chat_body = models.CharField(max_length=255)
    created_time = models.DateTimeField(auto_now_add=True)

    def author_name(self):
        return self.chat_author.username
