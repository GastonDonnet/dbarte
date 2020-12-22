
from .utils.custom_filters import ActiveFilter, DefaultFilter
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Cuadro, Tag, Tamaño
from .serializers import CuadroSerializer, TagSerializer, TamañoSerializer

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

# ViewSets define the view behavior.


class CuadroViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cuadro.objects.all()
    serializer_class = CuadroSerializer
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter, ActiveFilter]

    filterset_fields = ['active', 'tags']
#     filterset_fields = {
#        'returned': ['exact', 'lte', 'gte', 'isnull']
#    }
    ordering_fields = '__all__'
    search_fields = ['titulo']

    def get_queryset(self):
        qs = super().get_queryset()
        qs = self.get_serializer_class().setup_eager_loading(qs)
        return qs

    # Cache x 10 minutos
    @method_decorator(cache_page(60*10))
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)


class TamañoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tamaño.objects.all()
    serializer_class = TamañoSerializer


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
