from rest_framework.permissions import BasePermission
from userApp.models import CustomUser
from rest_framework import permissions


class IsProfessorOrTA(BasePermission):
    message = 'You Aren\'t TA or Professor'

    def has_permission(self, request, view):
        return request.user.role == 'T' or request.user.role == 'P'


class IsProfessor(BasePermission):
    message = 'You Aren\'t A Professor'

    def has_permission(self, request, view):
        return request.user.role == 'P'


class IsStudent(BasePermission):
    message = 'You Aren\'t An Student!'

    def has_permission(self, request, view):
        return request.user.role == 'S'


class IsProfileCompleted(BasePermission):
    message = 'لطفا اطلاعات شخصی خود را تکمیل کنید.'

    def has_permission(self, request, view):
        return CustomUser.objects.get(username=request.user.username).is_completed()


class IsProfessorTAOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allow GET requests to all users
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user and (request.user.role == 'T' or request.user.role == 'P')
