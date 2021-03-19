import uuid

from django.db import models
from datetime import datetime


class DeviceType(models.Model):

    title = models.CharField(
        max_length=100,
        default='',
        null=False,
        blank=False
    )

    code = models.IntegerField(
        default=0,
        null=False,
        blank=False
    )

    def __str__(self):
        return f'{self.code} - {self.title}'


class Device(models.Model):

    GUID = models.CharField(
        max_length=255,
        default='',
        null=True,
        blank=True
    )

    notificationID = models.CharField(
        max_length=255,
        default='',
        null=True,
        blank=True
    )

    type = models.ForeignKey(
        DeviceType,
        on_delete=models.CASCADE,
        default=None,
        null=False
    )

    verified = models.BooleanField(
        default=False,
        null=True,
        blank=False
    )

    active = models.BooleanField(
        default=True,
        null=False,
        blank=False
    )

    verification_code = models.CharField(
        max_length=100,
        default='',
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def save(self, *args, **kwargs):
        if not self.GUID:
            self.GUID = str(uuid.uuid1())
        super(Device, self).save(*args, **kwargs)

    def __str__(self):
        return f'{self.GUID} - {self.type.title}'


class Language(models.Model):

    GUID = models.CharField(
        max_length=255,
        default='',
        null=True,
        blank=True
    )

    title = models.CharField(
        max_length=100,
        default='',
        null=False,
        blank=False
    )

    active = models.BooleanField(
        default=True,
        null=False,
        blank=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def save(self, *args, **kwargs):
        if not self.GUID:
            self.GUID = str(uuid.uuid1())
        super(Language, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class ProfilePhoto(models.Model):

    GUID = models.CharField(
        max_length=255,
        default='',
        null=True,
        blank=True
    )

    photo = models.ImageField(
        upload_to='photo/profile/'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def save(self, *args, **kwargs):
        if not self.GUID:
            self.GUID = str(uuid.uuid1())
        super(ProfilePhoto, self).save(*args, **kwargs)

    def __str__(self):
        return self.GUID


class User(models.Model):

    GUID = models.CharField(
        max_length=255,
        default='',
        null=True,
        blank=True
    )

    email = models.EmailField(
        null=True,
        blank=True,
        default=None
    )

    language = models.ForeignKey(
        Language,
        on_delete=models.CASCADE,
        default=None,
        blank=False
    )

    phone = models.BigIntegerField(
        null=False,
        blank=False,
        default=0
    )

    firstname = models.CharField(
        max_length=100,
        default='',
        null=False,
        blank=False
    )

    surname = models.CharField(
        max_length=100,
        default='',
        null=True,
        blank=True
    )

    active = models.BooleanField(
        default=True,
        null=False,
        blank=False
    )

    photo = models.ForeignKey(
        ProfilePhoto,
        on_delete=models.CASCADE,
        default=None,
        blank=True
    )

    devices = models.ManyToManyField(
        Device,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def save(self, *args, **kwargs):
        if not self.GUID:
            self.GUID = str(uuid.uuid1())
        super(User, self).save(*args, **kwargs)

    def __str__(self):
        return self.firstname
