from django.shortcuts import render

from rest_framework.schemas.views import APIView
from rest_framework.response import Response
from rest_framework import status

from datetime import datetime

from authentification import models
from core import models as CoreModels
import api.serializers as serializers

from django.contrib.auth import authenticate

import json
import random

import os
# from twilio.rest import Client as TwilioClient

import logging
logger = logging.getLogger(__name__)

# push_service = FCMNotification(api_key=os.environ.get("FCM_TOKEN", "empty_key"))


class DeviceView(APIView):

    def get(self, request, version):
        device_list = models.Device.objects.all()
        return Response(
            serializers.DeviceSerializer(device_list, many=True).data,
            status=status.HTTP_200_OK
        )

    def post(self, request, version):

        try:
            data = json.loads(request.body)
        except Exception as e:
            return Response(
                'request body not set',
                status=status.HTTP_400_BAD_REQUEST
                )

        try:
            device_type = str(data['device_type'])
        except Exception as e:
            return Response(
                'device_type is not set',
                status=status.HTTP_400_BAD_REQUEST
                )

        if models.DeviceType.objects.filter(title=device_type).count() == 0:
            return Response(
                'no selected device_type found',
                status=status.HTTP_404_NOT_FOUND
                )
        else:
            DeviceType = models.DeviceType.objects.get(title=device_type)

        NewDevice = models.Device()

        NewDevice.type = DeviceType

        NewDevice.save()

        content = serializers.DeviceSerializer(NewDevice).data

        return Response(
            {
                'content': content
            },
            status=status.HTTP_201_CREATED
            )


class AuthDeviceView(APIView):

    def post(self, request, version, GUID):

        data = json.loads(request.body)

        try:
            Device = models.Device.objects.get(GUID=GUID)
        except models.Device.DoesNotExist:
            return Response(
                'device with selected GUID not found',
                status=status.HTTP_404_NOT_FOUND
                )

        if not Device.active:
            return Response(
                'device with selected GUID is inactive',
                status=status.HTTP_403_FORBIDDEN
                )

        try:
            phone = str(data['phone'])
        except Exception as e:
            return Response(
                'phone is not set',
                status=status.HTTP_400_BAD_REQUEST
                )

        if not phone.isdigit():
            return Response(
                'wrong data format',
                status=status.HTTP_400_BAD_REQUEST
                )

        verification_code = random.randint(100000, 999999)

        Device.verification_code = verification_code
        Device.save()

        account_sid = os.environ.get('TWILIO_ACCOUNT_SID', '')
        auth_token = os.environ.get('TWILIO_AUTH_TOKEN', '')
        sms_phone_number = os.environ.get('TWILIO_PHONE_NUMBER', '')

        # TODO add SMS integration
        # client = TwilioClient(account_sid, auth_token)

        try:
            message = client.messages.create(
                body=f'Your verification code in MoveMe: {verification_code}',
                from_=sms_phone_number,
                to=f'+{phone}'
            )
        except Exception as e:
            logger.error(e)

        try:
            User = models.User.objects.get(phone=phone)
        except models.User.DoesNotExist as e:
            logger.error('created new, `cause: ' + str(e))
            logger.error(phone)
            User = models.User()
            User.email = ''
            User.language = models.Language.objects.get(id=1)
            User.phone = phone
            User.firstname = ''
            User.surname = ''
            User.photo = models.ProfilePhoto.objects.get(id=1)
            User.save()

        User.devices.add(Device)

        return Response(
            str(verification_code),
            status=status.HTTP_200_OK
        )


class AuthDeviceCheckView(APIView):

    def post(self, request, version, GUID):

        try:
            data = json.loads(request.body)
        except Exception as e:
            return Response(
                'request body not set',
                status=status.HTTP_400_BAD_REQUEST
                )

        try:
            Device = models.Device.objects.get(GUID=GUID)
        except models.Device.DoesNotExist:
            return Response(
                'device with selected GUID not found',
                status=status.HTTP_404_NOT_FOUND
                )

        if not Device.active:
            return Response(
                'device with selected GUID is inactive',
                status=status.HTTP_403_FORBIDDEN
                )

        try:
            code = str(data['code'])
        except Exception as e:
            return Response(
                'code is not set',
                status=status.HTTP_400_BAD_REQUEST
                )

        if not code.isdigit():
            return Response(
                'wrong data format',
                status=status.HTTP_400_BAD_REQUEST
                )

        if Device.verification_code == code:
            Device.verified = True
            Device.save()
        else:
            return Response(
                'wrong verification code',
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            User = models.User.objects.get(devices=Device)
            for device in User.devices.all():
                if device.id != Device.id:
                    device.active = False
                    device.save()
        except Exception as e:
            User = None

        if User is not None:
            content = serializers.UserSerializer(User).data
        else:
            content = None

        return Response(
            content,
            status=status.HTTP_202_ACCEPTED
        )


class LanguageListView(APIView):

    def get(self, request, version):

        return Response(
            serializers.LanguageSerializer(models.Language.objects.all(), many=True).data
        )


class UserView(APIView):

    def get(self, request, version, GUID):

        try:
            Device = models.Device.objects.get(GUID=GUID)
        except models.Device.DoesNotExist:
            return Response(
                'device with selected GUID not found',
                status=status.HTTP_404_NOT_FOUND
                )

        if not Device.active:
            return Response(
                'device with selected GUID is inactive',
                status=status.HTTP_403_FORBIDDEN
                )

        try:
            User = models.User.objects.get(devices=Device)
        except models.User.DoesNotExist:
            return Response(
                'user not found',
                status=status.HTTP_404_NOT_FOUND
            )

        result = serializers.UserSerializer(User).data

        return Response(
            result,
            status=status.HTTP_200_OK
        )

    def post(self, request, version, GUID):

        try:
            data = json.loads(request.body)
        except Exception as e:
            return Response(
                'request body not set',
                status=status.HTTP_400_BAD_REQUEST
                )

        try:
            Device = models.Device.objects.get(GUID=GUID)
        except models.Device.DoesNotExist:
            return Response(
                'device with selected GUID not found',
                status=status.HTTP_404_NOT_FOUND
                )

        if not Device.active:
            return Response(
                'device with selected GUID is inactive',
                status=status.HTTP_403_FORBIDDEN
                )

        try:
            User = models.User.objects.get(devices=Device)
        except models.User.DoesNotExist:
            return Response(
                'user not found',
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            email = str(data['email'])
        except Exception as e:
            email = ''

        try:
            language = str(data['language'])
        except Exception as e:
            return Response(
                'language is not set',
                status=status.HTTP_400_BAD_REQUEST
                )

        try:
            language = models.Language.objects.get(title=language)
        except Exception as e:
            return Response(
                'selected language not found',
                status=status.HTTP_404_NOT_FOUND
                )

        try:
            phone = str(data['phone'])
        except Exception as e:
            return Response(
                'phone is not set',
                status=status.HTTP_400_BAD_REQUEST
                )

        if not phone.isdigit():
            return Response(
                'wrong data format: phone',
                status=status.HTTP_400_BAD_REQUEST
                )

        try:
            firstname = str(data['firstname'])
        except Exception as e:
            return Response(
                'firstname is not set',
                status=status.HTTP_400_BAD_REQUEST
                )

        try:
            surname = str(data['surname'])
        except Exception as e:
            return Response(
                'surname is not set',
                status=status.HTTP_400_BAD_REQUEST
                )

        User.email = email
        User.language = language
        User.phone = phone
        User.firstname = firstname
        User.surname = surname
        User.save()

        result = serializers.UserSerializer(User).data

        return Response(
            result,
            status=status.HTTP_201_CREATED
        )


def sendNotification(users, title, text):

    message_title = title
    message_body = text
    for user in users:

        device = user.devices.filter(active=True).first()
        registration_id = device.notificationID

        result = push_service.notify_single_device(
            registration_id=registration_id,
            message_title=message_title,
            message_body=message_body
            )


class CategoryListView(APIView):

    def get(self, request, version):
        categories = CoreModels.Category.objects.all()
        return Response(
            serializers.CategorySerializer(categories, many=True).data,
            status=status.HTTP_200_OK
        )


class CategoryView(APIView):

    def post(self, request, version):

        try:
            data = json.loads(request.body)
        except Exception as e:
            return Response(
                'request body not set',
                status=status.HTTP_400_BAD_REQUEST
                )

        try:
            category = str(data['category'])
        except Exception as e:
            return Response(
                'category is not set',
                status=status.HTTP_400_BAD_REQUEST
                )

        try:
            Device = models.Device.objects.get(GUID=GUID)
        except models.Device.DoesNotExist:
            return Response(
                'device with selected GUID not found',
                status=status.HTTP_404_NOT_FOUND
                )

        if not Device.active:
            return Response(
                'device with selected GUID is inactive',
                status=status.HTTP_403_FORBIDDEN
                )

        try:
            User = models.User.objects.get(devices=Device)
        except models.User.DoesNotExist:
            return Response(
                'user not found',
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            MobileUser = CoreModels.MobileUser.objects.get(user=User)
        except CoreModels.MobileUser.DoesNotExist:
            return Response(
                'user not found',
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            Category = CoreModels.Category.objects.get(title=category)
        except CoreModels.Category.DoesNotExist:
            return Response(
                'category not found',
                status=status.HTTP_404_NOT_FOUND
            )

        MobileUser.category = Category
        MobileUser.save()

        return Response(
            'ok',
            status==status.HTTP_200_OK
        )
