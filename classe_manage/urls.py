# urls.py

from django.urls import path
from .views import ClassAPIView , DiscussionAPIView , ReplyAPIView

urlpatterns = [
    path('classes/<int:pk>/', ClassAPIView.as_view(), name='class-crud'),
    path('classes/<int:class_id>/discussion/<int:pk>', DiscussionAPIView.as_view(), name='discussion-crud'),
    path('classes/<int:class_id>/discussion/<int:discussion_id>/reply/<int:pk>', ReplyAPIView.as_view(), name='reply-crud'),

    # Add other URLs as needed
]
