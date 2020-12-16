from rest_framework import serializers
from .models import Cuadro, Tag, Tamaño, Imagen

# Serializers define the API representation.


class TamañoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tamaño
        fields = '__all__'


class ImagenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imagen
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class CuadroSerializer(serializers.ModelSerializer):
    tamaños = TamañoSerializer(many=True, read_only=True)
    imagenes = ImagenSerializer(many=True, read_only=True)

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.prefetch_related('tamaños')
        queryset = queryset.prefetch_related('imagenes')

        return queryset

    class Meta:
        model = Cuadro
        fields = '__all__'
