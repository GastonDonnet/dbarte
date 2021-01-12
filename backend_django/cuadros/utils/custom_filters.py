from django.db.models import query
from rest_framework import filters


class DefaultFilter(filters.BaseFilterBackend):
    """
    Realiza filtros por defecto, mirando en la vista el diccionario "default_filter"
    """
    default_filter = None

    def filter_queryset(self, request, queryset, view):
        # Para poder implementar otros filtros basados en este colocando una variable default_filter como una variable de clase
        if not self.default_filter:
            self.default_filter = view.default_filter

        for key in self.default_filter.keys():
            if request.query_params.get(key) == None:
                queryset = queryset.filter(active=self.default_filter[key])

        return queryset


class ActiveFilter(DefaultFilter):
    """
    """
    default_filter = {'active': True}
