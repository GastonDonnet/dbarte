from django.contrib import admin
from .models import Cuadro, Imagen, Tag, Tamaño, TamañoCuadro
from import_export.admin import ImportExportModelAdmin
from admin_ordering.admin import OrderableAdmin


class ImagenInline(admin.TabularInline):
    model = Imagen
    extra = 1


class TamañoCuadroInline(admin.TabularInline):
    model = TamañoCuadro
    extra = 1


class CuadroTagsInline(admin.TabularInline):
    model = Cuadro.tags.through
    extra = 1


@admin.register(Cuadro)
class CuadroAdmin(OrderableAdmin, ImportExportModelAdmin):
    inlines = [
        TamañoCuadroInline,
        ImagenInline,
    ]
    list_display = ('id', 'active', 'titulo', 'ancho',
                    'alto', 'creado', 'ordering',)
    list_editable = ('active', 'ordering')
    list_filter = ('active', 'creado', )
    search_fields = ('titulo', 'ancho', 'alto')


@admin.register(Tamaño)
class TamañoAdmin(ImportExportModelAdmin):
    list_display = ('id', 'active', 'ancho', 'alto', 'precio')
    list_filter = ('active', 'precio', 'ancho', 'alto')
    list_editable = ('active', )
    search_fields = ('precio', 'ancho', 'alto')


@admin.register(Imagen)
class ImagenAdmin(ImportExportModelAdmin):
    list_display = ('id', 'active', 'cuadro', 'imagen', 'imagen_tag',)
    list_editable = ('active',)
    list_filter = ('active',)
    search_fields = ('cuadro',)
    readonly_fields = ('imagen_tag',)


@admin.register(Tag)
class TagAdmin(OrderableAdmin, ImportExportModelAdmin):
    inlines = [
        CuadroTagsInline
    ]
    list_display = ('id', 'tag', 'ordering',)
    list_editable = ('tag', 'ordering',)
    search_fields = ('tag',)
