from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

from authentification.models import User as AuthUser

import uuid


class Category(models.Model):

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
        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


class MobileUser(models.Model):

    user = models.ForeignKey(
        AuthUser,
        on_delete=models.CASCADE
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    def __str__(self):
        return self.user.firstname