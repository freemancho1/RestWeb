from rest_framework.viewsets import ModelViewSet 

from .models import Todo
from .serializers import TodoSerializer


class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.filter(is_delete=False)
    serializer_class = TodoSerializer
