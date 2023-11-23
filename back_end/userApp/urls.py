from django.urls import path

from . import views

urlpatterns = [
    path("signin/", views.signin, name="sign-in"),
    path("login/", views.login, name="log-in"),
    path("logout/", views.logout, name="log-out"),
]
