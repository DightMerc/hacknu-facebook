"""cool_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import api.views as views


urlpatterns = [

    path('language/', views.LanguageListView.as_view()),
    path('devices/', views.DeviceView.as_view()),
    path('categories/', views.CategoryListView.as_view()),

    path('<str:GUID>/auth/phone/', views.AuthDeviceView.as_view()),
    path('<str:GUID>/auth/phone/check/', views.AuthDeviceCheckView.as_view()),

    path('<str:GUID>/user/', views.UserView.as_view()),
    path('<str:GUID>/user/pending/', views.TogglePending.as_view()),
    path('<str:GUID>/user/location/', views.UpdateLocation.as_view()),


    path('<str:GUID>/category/', views.CategoryView.as_view()),
    path('<str:GUID>/user/category/<category>/', views.GetUsersView.as_view()),

]
