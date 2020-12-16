from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User

# Serializers define the API representation.


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  # ['url', 'username', 'email', 'is_staff']


class ConsultaSerializer(serializers.Serializer):
    email = serializers.EmailField()
    cuadro = serializers.JSONField()
    mensaje = serializers.CharField()
