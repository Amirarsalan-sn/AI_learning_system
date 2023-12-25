from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AbstractUser
from .choices import role_choices


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


# Create your models here.


class CustomUser(AbstractUser):
    role = models.CharField(choices=role_choices,
                            max_length=1)

    @property
    def fullname(self):
        return self.first_name + ' ' + self.last_name + " ," + self.username
