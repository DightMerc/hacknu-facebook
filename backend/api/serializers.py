from rest_framework import serializers

from authentification import models
from core import models as CoreModels
from django.conf import settings


class DeviceTypeSerializer(serializers.Serializer):

    title = serializers.CharField()
    code = serializers.IntegerField


class DeviceSerializer(serializers.Serializer):

    GUID = serializers.CharField()
    notificationID = serializers.CharField()


class UserStatusSerializer(serializers.Serializer):

    GUID = serializers.CharField()
    title = serializers.CharField()


class UserPhotoSerializer(serializers.Serializer):

    def to_representation(self, value):
        return f'{settings.MEDIA_SITE_URL}{settings.MEDIA_URL}{value.photo}'
        # return f'{value.photo}'


class LanguageSerializer(serializers.Serializer):

    GUID = serializers.CharField()
    title = serializers.CharField()


class UserSerializer(serializers.Serializer):

    GUID = serializers.CharField()
    language = LanguageSerializer()
    email = serializers.CharField()
    phone = serializers.CharField()
    firstname = serializers.CharField()
    surname = serializers.CharField()
    photo = UserPhotoSerializer()


class CategorySerializer(serializers.Serializer):

    GUID = serializers.CharField()
    title = serializers.CharField()