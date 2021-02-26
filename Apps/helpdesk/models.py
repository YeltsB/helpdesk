from django.db import models

# Create your models here.
from django.db import models
from django.forms import model_to_dict
from datetime import datetime
# Create your models here.
class Genero(models.Model):
    descripcion = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Genero"
        verbose_name_plural = "Generos"

    def toJSON(self):
        item = model_to_dict(self) #Convertimos todos los objetos en diccionarios
        return item
        
    def __str__(self):
        return self.descripcion

class Empleado(models.Model):
    nombres = models.CharField(max_length=150, verbose_name='Nombres')
    apellidos = models.CharField(max_length=150, verbose_name='Apellidos')
    dni = models.CharField(max_length=10, unique=True, verbose_name='DNI')
    fecha_nacimiento = models.DateField(default=datetime.now, verbose_name='Fecha de nacimiento')
    direccion = models.CharField(max_length=150, null=True, blank=True, verbose_name='Dirección')
    genero = models.ForeignKey(Genero, verbose_name='Género', on_delete=models.CASCADE)


    class Meta:
        verbose_name = "Empleado"
        verbose_name_plural = "Empleados"
        ordering = ['id']

    def __str__(self):
        return self.nombres

    def toJSON(self):
        item = model_to_dict(self)
        if self.direccion == None:
            item['direccion'] = 'No Registrado'
        item['genero'] = {'id': self.genero.id, 'descripcion': self.genero.descripcion}
        item['fecha_nacimiento'] = self.fecha_nacimiento.strftime('%Y-%m-%d')
        return item


