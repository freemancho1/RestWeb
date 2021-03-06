from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=255)
    memo = models.CharField(max_length=9999, null=True)
    date_add = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)
    is_delete = models.BooleanField(default=False)
    
    class Meta:
        ordering = ('-date_add',)
        
    def __str__(self):
        return f'Todo({self.id}, {self.title}, {self.date_add})'
    
    def get_absolute_url(self):
        return f'/{self.id}/'
    
    
class Todo2(models.Model):
    title = models.CharField(max_length=255)
    memo = models.CharField(max_length=9999, null=True, blank=True)
    order = models.IntegerField(null=True, blank=True)
    date_add = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)
    is_delete = models.BooleanField(default=False)
    parent = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE, null=True, blank=True)
    
    class Meta:
        ordering = ('id',)
        
    def __str__(self):
        return f'Todo({self.id}, {self.title}, {self.date_add})'
    
    def get_absolute_url(self):
        return f'/{self.id}/'
    