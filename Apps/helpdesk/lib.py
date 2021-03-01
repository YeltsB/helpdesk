from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from Apps.helpdesk.models import *
from django.utils.decorators import method_decorator
from django.http import HttpResponseRedirect,JsonResponse, HttpResponse 
from django.urls import reverse_lazy
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.contrib.auth import login as auth_login,logout,authenticate #Atenticacion Django
from django.contrib.auth.models import User
from Apps.helpdesk.urls import *
