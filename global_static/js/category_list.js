$(function (){
    $('#datatable').DataTable({
        responsive: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        ajax: {
            url: window.location.pathname,//Obtenemos la url obsoluta
            type: 'POST',
            data: {
                'action': 'searchdata' //Mandamos la accion para que django sepa que tiene que buscar
            }, // parametros
            dataSrc: ""
        },
        columns: [ //Columnas de nuestro modelo/Tabla aqui retorna o pinta los valores en la datables
            { "data": "id"},  //0
            { "data": "name"}, //1
            { "data": "desc"}, //2
            { "data": "desc"},//3 esta no existe en los modelos porque son los botones tenemos que personalizarlo
        ],
        columnDefs: [ //Personalizar una columna
            {
                targets: [3], //Personalizar la colummna numero 3
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var buttons = `<a  href="/category/update/${row.id}/" class="btn btn-warning btn-sm btn-flat">
                                    <i class="fas fa-edit"></i></a> `;
                        buttons += `<a  href="/category/delete/${row.id}/" class='btn btn-danger btn-sm btn-flat'>
                                    <i class="fas fa-trash-alt"></i></a>`;
                        return buttons;
                }
            },
        ],
        initComplete: function(settings, json) {
            //Aqui es cuando se ha cargado todos los datos
          }
    });
});