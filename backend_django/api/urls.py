from django.urls import path, include
from rest_framework import routers, views
from .views import ComprarCuadro, UserViewSet, ComprarCuadro
from cuadros.views import CuadroViewSet, TamañoViewSet, TagViewSet


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'cuadros', CuadroViewSet)
router.register(r'tamaños', TamañoViewSet)
router.register(r'tags', TagViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('email/buy/', ComprarCuadro.as_view())

]
