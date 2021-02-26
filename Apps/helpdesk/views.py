from Apps.helpdesk.lib import *

# Create your views here.


def inicio (request):
    if request.method == 'POST':
        data = []
        try:
            action = request.POST['action']
            if action == 'buscardatos':
                for i in Empleado.objects.all():
                    data.append(i.toJSON())
            elif action == 'crear':
                em = Empleado()
                em.nombres = request.POST['nombres']
                em.apellidos = request.POST['apellidos']
                em.dni = request.POST['identidad']
                if request.POST['direccion']:
                    em.direccion = request.POST['direccion']
                em.fecha_nacimiento = (request.POST['fecha_nacimiento'])
                em.genero = Genero.objects.get(pk=int(request.POST['genero']))
                em.save()
            elif action == 'editar':
                em = Empleado.objects.get(pk=request.POST['id'])
                em.nombres = request.POST['nombres']
                em.apellidos = request.POST['apellidos']
                em.dni = request.POST['identidad']
                if request.POST['direccion']:
                    em.direccion = request.POST['direccion']
                else:
                    em.direccion = None
                em.fecha_nacimiento = (request.POST['fecha_nacimiento'])
                em.genero = Genero.objects.get(pk=int(request.POST['genero']))
                em.save()
            elif action == 'eliminar':
                em = Empleado.objects.get(pk=request.POST['id'])
                em.delete()
            else:
                data['error'] = 'Ha ocurrido un error'
        except Exception as e:
            data['error'] = str(e)
        return JsonResponse(data, safe=False)
    elif request.method == 'GET':
        return render(request, 'inicio.html',{'titulo':'Inicio','entidad':'Lista de Empleados'})
