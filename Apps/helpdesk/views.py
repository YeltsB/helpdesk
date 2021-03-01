from Apps.helpdesk.lib import *

# Create your views here.
@login_required
def inicio (request):
    if request.method == 'POST' and request.is_ajax():
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

def login(request):
    if request.user.is_authenticated:
        return redirect('Apps/helpdesk:inicio')
    if request.method == 'POST':
        username = request.POST['correo']
        password = request.POST['contrasena']
        user = authenticate(username=username, password=password)
        if user is not None:
            auth_login(request,user)
            return redirect('Apps/helpdesk:inicio')
        else:
            data = {'error':'Correo o contraseña inválidos'}
            return render(request,'login.html',data)
    elif request.method == 'GET':
        return render(request, 'login.html')


def cerrar_sesion(request):
    logout(request)
    return redirect('Apps/helpdesk:login')

#Vista para el manejo de paginas no encontradas, renderiza a la vista principal que esta haga el trabajo
def error_404_view(request, exception):
    return redirect('Apps/helpdesk:login')

def usuario(request):
    usuarios = User.objects.all()
    data = {'titulo':'Usuarios',
            'entidad':'Lista de usuarios',
            'usuarios':usuarios}

    return render(request, 'usuarios.html',data)