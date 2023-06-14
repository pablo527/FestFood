from rest_framework import routers
from django.urls import path
from .api import RestaurantViewSet

router = routers.DefaultRouter()

router.register('api/restaurants', RestaurantViewSet, 'restaurants')

urlpatterns = router.urls