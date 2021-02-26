from django.urls import path #Libreria para utilizar path manejo de urls
from Apps.helpdesk.views import *
app_name = 'Apps/helpdesk' #El nombre de nuestra aplicacio

urlpatterns = [
    path("", inicio, name="inicio")
]
