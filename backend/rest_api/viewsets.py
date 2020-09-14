from rest_framework.viewsets import ModelViewSet
from . serializers import ToDoSerializer
from . models import ToDo


class ToDoViewset(ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()