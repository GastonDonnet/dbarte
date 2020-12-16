from django.conf import settings
from django.contrib.auth.models import User
from django.http.response import BadHeaderError, HttpResponse, HttpResponseRedirect
from rest_framework import response, viewsets, views
from django.core.mail import send_mail
from rest_framework import status
from .serializers import ConsultaSerializer, UserSerializer
# ViewSets define the view behavior.


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ComprarCuadro(views.APIView):
    def post(self, request):
        serializer = ConsultaSerializer(data=request.data)

        if serializer.is_valid():
            cuadro = serializer.data.get('cuadro')
            email = serializer.data.get('email')
            mensaje = serializer.data.get('mensaje')

            if cuadro and email and mensaje:

                message = f'<img src="{cuadro["imagenes"][0]}" /><br>Se ha consultado por el cuadro: <a href="{settings.FRONT_URL}cuadro/{cuadro["id"]}">{cuadro["titulo"]}</a>.<br>Email: {email}.<br>Mensaje: {mensaje}'
                try:
                    send_mail('Consulta de cuadros', message,
                              None, ['dbarte.shop@gmail.com'], html_message=message)
                    return HttpResponse('Email enviado!')
                except BadHeaderError:
                    return HttpResponse('Invalid header found.')
            else:
                return HttpResponse('Completa el cuadro y el email.')
        else:
            return response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
