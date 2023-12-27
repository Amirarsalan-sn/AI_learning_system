# urls.py

from django.urls import path
from .views import ClassInfoView

urlpatterns = [
    path('class-info/<int:class_id>/', ClassInfoView.as_view(), name='class-info'),
    # Add other URLs as needed
]
