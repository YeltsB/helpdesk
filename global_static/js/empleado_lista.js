var tablaCliente;
var modalTitulo;

function obtenerDatos(){

    tablaCliente = $('#datatable').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: window.location.pathname,//Obtenemos la url obsoluta
            type: 'POST',
            data: {
                'action': 'buscardatos' //Mandamos la accion para que django sepa que tiene que buscar
            }, // parametros
            dataSrc: ""
        },
        columns: [ //Columnas de nuestro modelo/Tabla aqui retorna o pinta los valores en la datables
            { "data": "id"},  //0
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
                targets: [7], //Personalizar la colummna numero 3
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
        tablaCliente.ajax.reload(); //Accion de actualizar registros
    });

    $('.btnAdd').on('click', function () {
        $('input[name="action"]').val('crear');
        modalTitulo.find('span').html('Creación de Empleado');
        console.log(modalTitulo.find('i'));
        modalTitulo.find('i').removeClass().addClass('fas fa-plus');
        $('form')[0].reset();
        $('#modalEmpleado').modal('show');
    });

    //Botones en la colummna opcción 
    $('#datatable tbody').on('click', 'a[rel="editar"]', function () {
            modalTitulo.find('span').html('Edición de Empleado');
            modalTitulo.find('i').removeClass().addClass('fas fa-edit');
            var tr = tablaCliente.cell($(this).closest('td, li')).index();
            var data = tablaCliente.row(tr.row).data();
            $('input[name="action"]').val('edit');
            $('#modalEmpleado').modal('show');
            
        }).on('click', 'a[rel="eliminar"]', function () {
            var tr = tablaCliente.cell($(this).closest('td, li')).index();
            var data = tablaCliente.row(tr.row).data();
            var parameters = new FormData();
            parameters.append('action', 'delete');
            parameters.append('id', data.id);

        });


    //Creación de Empleado
    $('form').on('submit', function (e) {
        e.preventDefault();
        var parametros = new FormData(this);
        //submit_con_ajax(parametros);
        submit_con_ajax( parametros, function () {
            $('#modalEmpleado').modal('hide');
            $('form')[0].reset();
            tablaCliente.ajax.reload();
        });
    });
});



function submit_con_ajax(parametros){
    $.ajax({
        url: window.location.pathname,
        type: 'POST',
        data: parametros,
        DataType: 'json'
    }).done(function(data) { //Cuando todo salió en orden
        console.log(data.error);
        if (!data.hasOwnProperty('error')){ //Si el data no contiene error "!"
            $('#modalEmpleado').modal('hide');
            $('form')[0].reset();
            tablaCliente.ajax.reload();
        }else{
            message_error(data.error);
        }
    }).fail(function(data){ //Cuando se recibe un error
        alert('error');
    }).always(function(data){ //Se ejecutara siempre
        console.log('complete');
    });
}