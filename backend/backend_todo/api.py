from rest_framework.routers import DefaultRouter
from rest_api.viewsets import ToDoViewset

router = DefaultRouter()
router.register("todos", ToDoViewset)

