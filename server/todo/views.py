from rest_framework.viewsets import ModelViewSet 

from .models import Todo, Todo2
from .serializers import TodoSerializer, Todo2Serializer


class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.filter(is_delete=False)
    serializer_class = TodoSerializer
    
    
class Todo2ViewSet(ModelViewSet):
    # queryset = Todo2.objects.filter(todo=None)
    queryset = Todo2.objects.filter(is_delete=False)
    serializer_class = Todo2Serializer
