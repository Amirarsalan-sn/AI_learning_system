from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
"""
You may want to change the userApp view to a class based view.
"""


# the signin procedure.
def signin(request):
    return HttpResponse('User signin.')


# the login procedure.
def login(request):
    return HttpResponse('User login.')


# the logout procedure.
def logout(request):
    return HttpResponse('User logout.')


