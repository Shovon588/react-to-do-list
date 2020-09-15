from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from . serializers import ToDoSerializer
from . models import ToDo


class ToDoApiView(APIView):
    def delete(self, request, timestamp):
        item = ToDo.objects.get(timestamp=timestamp)
        item.delete()

        return Response({'message': 'Delete Successful'},
                        status=status.HTTP_200_OK)
