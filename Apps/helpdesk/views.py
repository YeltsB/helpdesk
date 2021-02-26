from Apps.helpdesk.lib import *

# Create your views here.

def inicio (request):
    return render(request, 'inicio.html',{'titulo':'Inicio'})
