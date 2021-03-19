from django.db import models
from mptt.models import MPTTModel, TreeForeignKey

from authentification.models import User as AuthUser

import uuid


class GoodPhoto(models.Model):

    GUID = models.CharField(
        max_length=255,
        default='',
        null=True,
        blank=True
    )

    photo = models.ImageField(
        upload_to='photo/product/'
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
        super(GoodPhoto, self).save(*args, **kwargs)

    def __str__(self):
        return self.GUID


class CategoryPhoto(models.Model):

    GUID = models.CharField(
        max_length=255,
        default='',
        null=True,
        blank=True
    )

    photo = models.ImageField(
        upload_to='photo/category/'
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
        super(CategoryPhoto, self).save(*args, **kwargs)

    def __str__(self):
        return self.GUID


class UserPhoto(models.Model):

    GUID = models.CharField(
        max_length=255,
        default='',
        null=True,
        blank=True
    )

    photo = models.ImageField(
        upload_to='photo/user/'
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
        super(UserPhoto, self).save(*args, **kwargs)

    def __str__(self):
        return self.GUID


class Category(MPTTModel):

    GUID = models.CharField(
        max_length=128,
        default='',
        blank=False,
        null=False
    )

    title = models.CharField(
        max_length=256,
        default='',
        blank=False,
        null=False
    )

    parent = TreeForeignKey(
        'self',
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    photo = models.ForeignKey(
        CategoryPhoto,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    description = models.TextField(
        blank=False,
        null=False
    )

    def save(self, *args, **kwargs):
        if not self.GUID:
            self.GUID = str(uuid.uuid1())
        super(Category, self).save(*args, **kwargs)


class GoodStatus(models.Model):

    code = models.IntegerField(
        default=0,
        blank=False,
        null=False
    )

    GUID = models.CharField(
        max_length=128,
        default='',
        blank=False,
        null=False
    )

    title = models.CharField(
        max_length=256,
        default='',
        blank=False,
        null=False
    )

    def save(self, *args, **kwargs):
        if not self.GUID:
            self.GUID = str(uuid.uuid1())
        super(GoodStatus, self).save(*args, **kwargs)


class Good(models.Model):

    GUID = models.CharField(
        max_length=128,
        default='',
        blank=False,
        null=False
    )

    title = models.CharField(
        max_length=256,
        default='',
        blank=False,
        null=False
    )

    category = models.ManyToManyField(
        Category,
        blank=True
    )

    barcode = models.CharField(
        max_length=256,
        default='',
        blank=False,
        null=False
    )

    price = models.IntegerField(
        default=0,
        null=False,
        blank=False
    )

    status = models.ForeignKey(
        GoodStatus,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )

    photo = models.ForeignKey(
        GoodPhoto,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    description = models.TextField(
        blank=False,
        null=False
    )

    def save(self, *args, **kwargs):
        if not self.GUID:
            self.GUID = str(uuid.uuid1())
        super(Good, self).save(*args, **kwargs)


class Position(models.Model):

    good = models.ForeignKey(
        Good,
        on_delete=models.CASCADE,
        blank=False,
        null=True,
        default=None
    )

    amount = models.IntegerField(
        null=False,
        blank=False,
        default=0
    )

    def price(self):
        return self.amount * self.good.price

    def save(self, *args, **kwargs):
        if not self.GUID:
            self.GUID = str(uuid.uuid1())
        super(Position, self).save(*args, **kwargs)


class User(models.Model):

    GUID = models.CharField(
        max_length=128,
        default='',
        blank=False,
        null=False
    )

    user = models.ForeignKey(
        AuthUser,
        on_delete=models.CASCADE,
        blank=False,
        null=True,
        default=None
    )

    ITN = models.CharField(
        max_length=128,
        default='',
        blank=False,
        null=False
    )

    photo = models.ForeignKey(
        UserPhoto,
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    def save(self, *args, **kwargs):
        if not self.GUID:
            self.GUID = str(uuid.uuid1())
        super(User, self).save(*args, **kwargs)



class Order(models.Model):

    GUID = models.CharField(
        max_length=128,
        default='',
        blank=False,
        null=False
    )

    positions = models.ManyToManyField(
        Position
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=False
    )

    def price(self):
        price = 0

        for position in self.positions:
            price += position.price

        return price

    def save(self, *args, **kwargs):
        if not self.GUID:
            self.GUID = str(uuid.uuid1())
        super(Order, self).save(*args, **kwargs)
