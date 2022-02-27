from rest_framework import serializers

from .models import Todo, Todo2


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
        
        
class Todo2ChildrenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo2 
        fields = ('id', 'title', 'memo', 'order',
                  'date_add', 'is_completed', 'is_delete')
        
        
class Todo2Serializer(serializers.ModelSerializer):
    # children = Todo2ChildrenSerializer(many=True)
    
    class Meta:
        model = Todo2 
        fields = ('id', 'title', 'memo', 'order', 'date_add', 
                  'is_completed', 'is_delete', 'parent')