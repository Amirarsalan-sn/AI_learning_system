from django.contrib import admin

# Register your models here.
from .models import Submission, Discussion, Reply, Exercise, Grade, ClassRoom
admin.site.register(ClassRoom)
admin.site.register(Discussion)
admin.site.register(Reply)

