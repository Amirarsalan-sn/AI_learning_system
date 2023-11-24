from django.urls import path

from .views import Logout, Login, Profile, SignUp

urlpatterns = [
    path("signup/", SignUp.as_view(), name="sign-up"),
    path("login/", Login.as_view(), name="log-in"),
    path("logout/",Logout.as_view(), name="log-out"),
    path("profile/", Profile.as_view(), name="log-out"),

]
