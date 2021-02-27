from django.urls import path #Libreria para utilizar path manejo de urls
from Apps.helpdesk.views import *
app_name = 'Apps/helpdesk' #El nombre de nuestra aplicacio

urlpatterns = [
    path("", login, name="login"),
    path("inicio", inicio, name="inicio"),
    path("cerrar/sesion", cerrar_sesion, name="cerrar_sesion")

]
