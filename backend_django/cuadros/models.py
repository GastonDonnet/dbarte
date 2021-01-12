from django.db.models.fields import CharField
import io
import sys
from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields.related import ForeignKey
from django.core.files.uploadedfile import InMemoryUploadedFile
from .utils.image_process import process_image
from admin_ordering.models import OrderableModel


class Tamaño(models.Model):
    precio = models.DecimalField('Precio [$]', max_digits=6, decimal_places=2)
    ancho = models.IntegerField('Ancho [cm]')
    alto = models.IntegerField('Alto [cm]')
    ultima_actualizacion = models.DateTimeField(auto_now=True)

    active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.ancho}cm x {self.alto}cm: ${self.precio}'


class Tag(OrderableModel):
    tag = CharField(max_length=50)

    def __str__(self):
        return self.tag


class Cuadro(OrderableModel):
    titulo = models.CharField(max_length=50)
    descripcion = models.TextField(blank=True)
    ancho = models.IntegerField('Ancho (Original) [cm]')
    alto = models.IntegerField('Alto (Original) [cm]')
    creado = models.DateField('Fecha de creacion', blank=True, null=True)

    tamaños = models.ManyToManyField(
        Tamaño, through='TamañoCuadro', verbose_name="cuadros")
    tags = models.ManyToManyField(Tag, verbose_name="cuadros")
    active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.titulo} ({self.ancho}cm x {self.alto}cm)'


class Imagen(models.Model):
    #path = models.CharField(max_length=100, unique=True, blank=False, null=False)
    imagen = models.ImageField(upload_to='cuadros')
    cuadro = models.ForeignKey(
        Cuadro, on_delete=CASCADE, related_name='imagenes')
    active = models.BooleanField(default=True)

    # Para poder ver la imagen en admin
    def imagen_tag(self):
        from django.utils.html import mark_safe
        return mark_safe(f'<img src="{self.imagen.url}" style="height: 100px"/>')
    imagen_tag.short_description = 'Imagen (visual)'

    def save(self):
        imagen_io = io.BytesIO()
        imagen = process_image(self.imagen, "© www.dbarte.com.ar")
        imagen.save(imagen_io, "JPEG", optimize=True, quality=95)
        imagen_dj = InMemoryUploadedFile(
            imagen_io, None, self.imagen.name, 'image/jpeg', sys.getsizeof(imagen_io), None)
        self.imagen.file = imagen_dj
        self.imagen.name = f'{self.cuadro.titulo}.jpg'

        super(Imagen, self).save()

    class Meta:
        verbose_name_plural = 'Imagenes'

    def __str__(self):
        return f'{self.cuadro.titulo} - {self.id}'


class TamañoCuadro(models.Model):
    cuadro = ForeignKey(Cuadro, on_delete=CASCADE)
    tamaño = ForeignKey(Tamaño, on_delete=CASCADE)
    precio = models.DecimalField("Precio (sobreescribir) [$]",
                                 max_digits=6, decimal_places=2, blank=True, null=True)

    class Meta:
        unique_together = [['cuadro', 'tamaño']]

    def __str__(self):
        return f'Relacion [Ancho: {self.cuadro.ancho/self.tamaño.ancho}] [Alto: {self.cuadro.alto/self.tamaño.alto}]'
