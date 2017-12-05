// let select = document.createElement('select');
// select.id = "select";
// const opciones = ["Todos","Menores de edad","Activos"];
//
// let datos = [];
// let information = false;
// for (let i = 0;i < 3;i++){
//   let option = document.createElement('option');
//   option.textContent = opciones[i];
//   select.appendChild(option);
// }
//
// if(localStorage.getItem("seleccion")){
//   select.selectedIndex = JSON.parse(localStorage.getItem("seleccion"));
// }
//
// document.body.appendChild(select);

let airports;
let saved  = [];
let map;
let marker;


function response () {
   $.ajax({url: 'http://35.194.72.13/airports/airports.json', success:(result)=>{
    airports = result;
    createTable(result);
  },
     dataType: 'json'
   });
}
response();


function createHeader(tabla) {
  let columnas = ["País","Ciudad",'Botones'];
  let tHead = document.createElement('thead');
  let cabecera = document.createElement('tr');

  for (let i = 0;i < columnas.length;i++){
    let celda = document.createElement('th');
    celda.textContent = columnas[i];
    cabecera.appendChild(celda);
  }
  tHead.appendChild(cabecera);
  tabla.appendChild(tHead);
}

function createTable(filtrado) {
  let tabla = document.createElement('table');
  tabla.id = 'tabla';
  tabla.className = 'display';
  createHeader(tabla);
  let tBody = document.createElement('tbody');

  for (let i = 0; i < filtrado.length; i++) {
    let tupla = document.createElement('tr');
    let pais = document.createElement('td');
    let ciudad = document.createElement('td');
    let botones = document.createElement('td');

    let mapa = document.createElement('input');
    mapa.type = 'button';
    mapa.value = 'Mapa';
    mapa.id = 'mapa-'+ i;
    mapa.onclick = (event)=>{
      let airport = airports[event.target.id.split('-')[1]];

      $('#mapModal').on('shown.bs.modal', function () {
        google.maps.event.trigger(map, "resize");
        let posicion = new google.maps.LatLng(
          airport.lat,
          airport.lon
        );
        map.setCenter(posicion);

        if (!marker){
          marker = new google.maps.Marker({
            position: posicion,
            map: map,
            title: 'airport'
          });
        }else marker.setPosition(posicion);

        marker.setMap(map);
      });
      $('#mapTitle').text(airport.name);
      $('#mapModal').modal('show');
    }

    let volar = document.createElement('input');
    volar.type = 'button';
    volar.value = 'Volar';
    volar.id = 'mapa-' + i;
    volar.onclick = (event)=>{
      $('#origen').val(event.target.id.split('-')[1]);
      $('#selects').modal('show');
    }

    botones.appendChild(mapa);
    botones.appendChild(volar);

    let option = document.createElement('option');
    option.value = i;
    option.textContent = filtrado[i].name;

    document.querySelector('#origen').appendChild(option);

    option = document.createElement('option');
    option.value = i;
    option.textContent = filtrado[i].name;

    document.querySelector('#destino').appendChild(option);


    pais.textContent = filtrado[i].country;
    ciudad.textContent = filtrado[i].city;

    tupla.appendChild(pais);
    tupla.appendChild(ciudad);
    tupla.appendChild(botones);
    tBody.appendChild(tupla);
  }

  tabla.appendChild(tBody);
  document.body.appendChild(tabla);

    $('#tabla').dataTable({
      stateSave: true,
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ],
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Catalan.json"
      }
    });

    $('#calendar').fullCalendar({
      events: [
        {
          title: 'Pepino',
          start: '2017-11-29T09:00:00',
          end: '2017-11-29T12:00:00',
          allDay: false,
          color: 'green',
        },
        {
          title: 'Pepino de 3 días',
          start: '2017-11-29T08:00:00',
          end: '2017-12-03T19:00:00',
          color: 'green'
        },
        {
          title: 'Todo el día',
          start: '2017-11-29',
          color: 'yellow',
          textColor: 'black',
          allDay: true
        },
        {
          title: "Rojo",
          start: '2017-11-29T09:00:00',
          end: '2017-11-29T12:00:00',
          color: 'red',
          textColor: 'black'
        }
      ],
      dayClick: (date) => {
        document.querySelector('#fecha-inicio').value = moment(date.format()).format('YYYY-MM-DDThh:mm');
        $('#selects').modal('show');
      },
      eventClick: () => {
        alert('evento');
      }
    });
    $('#origen').select2();
    $('#destino').select2();
}

function onSaved () {

}

$('#save').click(()=>{
  if($('#fecha-inicio').val() && $('#fecha-llegada').val() && $('#pasajeros').val()){
    onSaved({
      origen: airports[String($('#origen :selected').val())],
      destino: airports[String($('#destino :selected').val())],
      fechaInicial: $('#fecha-inicio').val(),
      fechaFinal: $('#fecha-llegada').val(),
      pasajeros: $('#pasajeros').val()
    })
  }
});

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 10
  });
}


