from django.urls import include, path 
from rest_framework import routers

from . import views 


router = routers.DefaultRouter()
router.register('todo', views.TodoViewSet)

urlpatterns = [
    path('', include(router.urls))
]