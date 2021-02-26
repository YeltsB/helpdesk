from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from Apps.helpdesk.models import *
from django.utils.decorators import method_decorator
from django.http import HttpResponseRedirect,JsonResponse, HttpResponse 
from django.urls import reverse_lazy
from Apps.helpdesk.urls import *
