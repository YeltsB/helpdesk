var tablaEmpleado;
var modalTitulo;
var token;
function obtenerDatos(){
    token = $('input[name="csrfmiddlewaretoken"]').val();
    tablaEmpleado = $('#datatable').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        bSortable: true,
        deferRender: true,
        ajax: {
            url: window.location.pathname,//Obtenemos la url obsoluta
            type: 'POST',
            data: {
                'action': 'buscardatos', //Mandamos la accion para que django sepa que tiene que buscar
                'csrfmiddlewaretoken': token
            }, // parametros
            dataSrc: ""
        },
        columns: [ //Columnas de nuestro modelo/Tabla aqui retorna o pinta los valores en la datables
            {   'className':      'details-control',
                'orderable':      false,
                'data':           null,
                'defaultContent': '<i class="fas fa-plus-circle"></i>'
            },//0
            { "data": "id"},  
            { "data": "nombres"}, 
            { "data": "apellidos"}, 
            { "data": "dni"}, 
            { "data": "fecha_nacimiento"}, 
            { "data": "direccion"}, 
            { "data": "genero.descripcion"}, 
            { "data": "id"},//3 esta no existe en los modelos porque son los botones tenemos que personalizarlo
        ],
        columnDefs: [ //Personalizar una columna
            {
                targets: [8], //Personalizar la colummna numero 3
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var buttons = `<a rel="editar" class="btn btn-warning btn-sm btn-flat">
                                    <i class="fas fa-edit"></i></a> `;
                        buttons += `<a  rel="eliminar" class='btn btn-danger btn-sm btn-flat'>
                                    <i class="fas fa-trash-alt"></i></a>`;
                        return buttons;
                }
            },
        ],
        initComplete: function(settings, json) {
            //Aqui es cuando se ha cargado todos los datos
        }
    });
}

$(function () {    
    obtenerDatos();
    modalTitulo = $('.modal-title');
    
    $('.modal').on('shown.bs.modal', function() {
        $(this).find('[autofocus]').focus();//Focus para el primer input en la modal
    });
    $('.btnRefrescar').on('click', function () {
        tablaEmpleado.ajax.reload(); //Accion de actualizar registros
        alerta('Registros actualizados');
    });

    $('.btnAdd').on('click', function () { //Creacion de un registro
        $('input[name="action"]').val('crear');
        modalTitulo.find('span').html('Creación de Empleado');
        modalTitulo.find('i').removeClass().addClass('fas fa-plus');
        $('form')[0].reset();
        $('#modalEmpleado').modal('show');
    });

    //Botones en la colummna opcción editar/eliminar
    $('#datatable tbody').on('click', 'a[rel="editar"]', function () {
            modalTitulo.find('span').html('Edición de Empleado');
            modalTitulo.find('i').removeClass().addClass('fas fa-edit');
            var tr = tablaEmpleado.cell($(this).closest('td, li')).index();
            var data = tablaEmpleado.row(tr.row).data();
            $('form')[0].reset();
            $('input[name="action"]').val('editar');
            $('input[name="id"]').val(data.id);
            $('input[name="nombres"]').val(data.nombres);
            $('input[name="apellidos"]').val(data.apellidos);
            $('input[name="identidad"]').val(data.dni);
            $('input[name="fecha_nacimiento"]').val(data.fecha_nacimiento);
            if(data.direccion != 'No Registrado')
                $('textarea[name="direccion"]').val(data.direccion);
            $('select[name="genero"]').val(data.genero.id);
            $('#modalEmpleado').modal('show');
            
        }).on('click', 'a[rel="eliminar"]', function () {
            var tr = tablaEmpleado.cell($(this).closest('td, li')).index();
            var data = tablaEmpleado.row(tr.row).data();
            var parametros = new FormData();
            parametros.append('action', 'eliminar');
            parametros.append('id', data.id);
            token = $('input[name="csrfmiddlewaretoken"]').val();
            parametros.append('csrfmiddlewaretoken',token);
        
            submit_con_ajax(window.location.pathname,`¿Está seguro de eliminar el registro Nro ${data.id}?`,parametros, function () {
                tablaEmpleado.ajax.reload();
                alerta('Registro eliminado');
            });
        });


    //Creación/Edición de Empleado
    $('form').on('submit', function (e) {
        e.preventDefault();
        var parametros = new FormData(this);
        submit_con_ajax(window.location.pathname,'¿Está seguro de realizar la siguiente acción?',parametros, function () {
            $('#modalEmpleado').modal('hide');
            $('form')[0].reset();
            tablaEmpleado.ajax.reload();

            if(parametros.get('action') == 'crear'){
                alerta('Registro creado');
            }else{
                alerta('Registro actualizado');
            }
        });
    });
 
   
    

});

function alerta(contenido){
    var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 7000
      });
    Toast.fire({
    icon: 'success',
    title: contenido
    })
}

//Función para enviar datos
function submit_con_ajax(url, contenido, parametros, callback) {
    $.confirm({
        theme: 'material',
        title: 'Notificación',
        icon: 'fa fa-info',
        content: contenido,
        columnClass: 'small',
        typeAnimated: true,
        cancelButtonClass: 'btn-primary',
        draggable: true,
        dragWindowBorder: false,
        buttons: {
            info: {
                text: "Si",
                btnClass: 'btn-primary',
                action: function () {
                    $.ajax({
                        url: url, //window.location.pathname
                        type: 'POST',
                        data: parametros,
                        dataType: 'json',
                        processData: false,
                        contentType: false,
                    }).done(function (data) {
                        if (!data.hasOwnProperty('error')) {
                            callback();
                            return false;
                        }
                        alert(data.error);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        alert(textStatus + ': ' + errorThrown);
                    }).always(function (data) {

                    });
                }
            },
            danger: {
                text: "No",
                btnClass: 'btn-red',
                action: function () {

                }
            },
        }
    })
}

