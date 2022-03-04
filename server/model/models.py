from django.db import models
from django.core.files import File 

from django.contrib.auth.models import User 


class ModelInfo(models.Model):
    name = models.CharField(max_length=255)
    desc = models.CharField(max_length=9999, null=True, blank=True)
    writer = models.ForeignKey(User, related_name='infos', on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)
    
    class Meta:
        ordering = ('-date_added',)
        
    def __str__(self):
        return f'[ModelInfo({self.id}, {self.name}]'

    def get_absolute_url(self):
        return f'/model/{self.id}/'
