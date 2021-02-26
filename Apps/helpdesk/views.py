from Apps.helpdesk.lib import *

# Create your views here.

@method_decorator(csrf_exempt)
def inicio (request):
    if request.method == 'POST':
        action = request.POST['action']
        if action == 'buscardatos':
            data = []
            for i in Empleado.objects.all():
                data.append(i.toJSON())
            return JsonResponse(data, safe=False)
        elif action == 'crear':
            print('Esta creando :o');
            pass;
        else:
            return render(request, 'inicio.html',{'titulo':'Inicio'})
    elif request.method == 'GET':
        print('Entra a get');
        return render(request, 'inicio.html',{'titulo':'Inicio'})
