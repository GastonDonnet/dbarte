import io
import sys
from django.db import models
from django.core.files.uploadedfile import InMemoryUploadedFile
from .utils.image_process import process_image
from admin_ordering.models import OrderableModel



class Foto(OrderableModel):
    #path = models.CharField(max_length=100, unique=True, blank=False, null=False)
    imagen = models.ImageField(upload_to='galeria')
    active = models.BooleanField(default=True)

    # Para poder ver la imagen en admin
    def imagen_tag(self):
        from django.utils.html import mark_safe
        return mark_safe(f'<img src="{self.imagen.url}" style="height: 100px"/>')
    imagen_tag.short_description = 'Foto (visual)'

    def save(self):
        imagen_io = io.BytesIO()
        imagen = process_image(self.imagen, "© www.dbarte.com.ar")
        imagen.save(imagen_io, "JPEG", optimize=True, quality=95)
        imagen_dj = InMemoryUploadedFile(
            imagen_io, None, self.imagen.name, 'image/jpeg', sys.getsizeof(imagen_io), None)
        self.imagen.file = imagen_dj
        self.imagen.name = f'Foto_{self.id}.jpg'

        super(Foto, self).save()

    class Meta:
        verbose_name_plural = 'Fotos'
