from django.contrib import admin

# Register your models here.
from .models import Submission, Discussion, Reply, Exercise, Grade, ClassRoom
admin.site.register(ClassRoom)
