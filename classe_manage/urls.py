# urls.py

from django.urls import path
from .views import ClassAPIView , DiscussionAPIView , ReplyAPIView ,ExerciseAPIView

urlpatterns = [
    path('classes/', ClassAPIView.as_view(), name='class-crud'),
    path('classes/<int:pk>/', ClassAPIView.as_view(), name='class-crud2'),
    path('classes/<int:class_id>/discussion/', DiscussionAPIView.as_view(), name='discussion-crud'),
    path('classes/<int:class_id>/discussion/<int:pk>', DiscussionAPIView.as_view(), name='discussion-crud2'),
    path('classes/<int:class_id>/discussion/<int:discussion_id>/reply/<int:pk>', ReplyAPIView.as_view(), name='reply-crud'),
    path('classes/<int:class_id>/discussion/<int:discussion_id>/reply/', ReplyAPIView.as_view(),
         name='reply-crud2'),
    path('classes/<int:class_id>/exercise/', ExerciseAPIView.as_view(),
         name='exer-crud'),
    path('classes/<int:class_id>/exercise/<int:pk>/', ExerciseAPIView.as_view(),
         name='exer-crud2'),

    # Add other URLs as needed
]
