from django.db import models
from userApp.models import CustomUser


class ClassRoom(models.Model):
    ClassName = models.CharField(max_length=255)
    ProfessorID = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    students = models.ManyToManyField(CustomUser, related_name='classes')
    assistants = models.ManyToManyField(CustomUser, related_name='classes')

    def __str__(self):
        return self.ClassName


class Reply(models.Model):
    body = models.TextField()
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    discussion = models.ForeignKey(related_name='discussion_replies')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reply by {self.author.username}"


class Discussion(models.Model):
    title = models.CharField(max_length=255)
    question = models.TextField()
    creator = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    classroom = models.OneToOneField(ClassRoom, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Exercise(models.Model):
    exercise_name = models.CharField(max_length=255)
    description = models.CharField(max_length=512)
    created_at = models.DateTimeField(auto_now_add=True)
    exercise_file = models.FileField(null=True, blank=True)
    classroom = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)

    def __str__(self):
        return self.ExerciseName


class Submission(models.Model):
    student = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    exercise = models.ForeignKey(Exercise, on_delete=models.CASCADE)
    text = models.TextField(null=True, blank=True)
    submission_file = models.FileField(null=True, blank=True)
    submission_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Submission {self.SubmissionID} by {self.StudentID.username} for {self.ExerciseID.ExerciseName}"
