from django.urls import include, path 
from rest_framework import routers

from . import views 


router = routers.DefaultRouter()
# router.register('', views.TodoViewSet)
router.register(r'todo', views.TodoViewSet)
router.register(r'todo2', views.Todo2ViewSet)

urlpatterns = [
    path('', include(router.urls))
] 