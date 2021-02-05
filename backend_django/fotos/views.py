from .models import Foto
from .serializers import FotoSerializer
from rest_framework import viewsets 



# ViewSets define the view behavior.
class FotoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Foto.objects.all()
    serializer_class = FotoSerializer
