from django.contrib import admin
from authentification import models


admin.site.register(models.DeviceType)
admin.site.register(models.Device)
admin.site.register(models.Language)
admin.site.register(models.ProfilePhoto)
admin.site.register(models.User)
