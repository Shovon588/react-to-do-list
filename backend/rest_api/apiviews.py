from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from . serializers import ToDoSerializer
from . models import ToDo


class DeleteApiView(APIView):
    def delete(self, request, timestamp):
        item = ToDo.objects.get(timestamp=timestamp)
        item.delete()

        return Response({'message': 'Delete Successful'},
                        status=status.HTTP_200_OK)


class PatchApiView(APIView):
    def patch(self, request, timestamp, patch_name):
        data = request.data
        patch_file = data[patch_name]
        item = ToDo.objects.get(timestamp=timestamp)

        if patch_name == 'name':
            item.name = patch_file
        else:
            item.done = patch_file

        item.save()

        return Response({'message': 'Update Successful'},
                        status=status.HTTP_200_OK)
