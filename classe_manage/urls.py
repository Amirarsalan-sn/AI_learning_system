# urls.py

from django.urls import path
from .views import ClassAPIView

urlpatterns = [
    path('classes/<int:pk>/', ClassAPIView.as_view(), name='class-crud'),

    # Add other URLs as needed
]
