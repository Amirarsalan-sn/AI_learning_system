from rest_framework import serializers
from .models import Submission, Discussion, Reply, Exercise, Grade, ClassRoom
from userApp.serializers import UserSerializer, UserSafeSerializer


class SubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Submission
        fields = '__all__'  # You can specify fields explicitly if needed


class DiscussionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discussion
        fields = '__all__'  # You can specify fields explicitly if needed


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = '__all__'  # You can specify fields explicitly if needed


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = '__all__'  # You can specify fields explicitly if needed


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'  # You can specify fields explicitly if needed


class ClassRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassRoom
        fields = '__all__'  # You can specify fields explicitly if needed


class ClassRoomDetailedSerializer(serializers.ModelSerializer):
    students_list = UserSafeSerializer(many=True ,source='students')
    assistants_list = UserSafeSerializer(many=True,source='assistants')
    professor = UserSafeSerializer(source='ProfessorID')
    class Meta:
        model = ClassRoom
        fields = ["id","ClassName" , "students_list","assistants_list" ,"professor"]


#
# class BlockDetailSerializer(serializers.ModelSerializer):
#     questions = serializers.SerializerMethodField()
#
#     class Meta:
#         model = Block
#         fields = ['title', 'number', 'description', 'questions']
#
#     def get_questions(self, obj):
#         # Retrieve and serialize the questions associated with the block
#         questions = Question.objects.filter(block=obj)
#         serializer = QuestionSerializer(questions, many=True)
#         return serializer.data
