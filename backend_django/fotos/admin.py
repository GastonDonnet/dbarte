from django.contrib import admin
from .models import Foto
from import_export.admin import ImportExportModelAdmin
from admin_ordering.admin import OrderableAdmin


@admin.register(Foto)
class FotoAdmin(OrderableAdmin, ImportExportModelAdmin):
    list_display = ('id', 'ordering', 'imagen', 'imagen_tag',)
    list_editable = ('ordering',)
    list_filter = ('active',)
    readonly_fields = ('imagen_tag',)
