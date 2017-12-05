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


function response () {
   $.ajax({url: 'http://35.194.72.13/airports/airports.json', success:(result)=>{

    createTable(result);
  },
     dataType: 'json'
   });
}
response();


function createHeader(tabla) {
  let columnas = ["País","Ciudad"];
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

    let option = document.createElement('option');
    option.value = filtrado[i].name;
    option.textContent = filtrado[i].name;

    document.querySelector('#origen').appendChild(option);

    option = document.createElement('option');
    option.value = filtrado[i].name;
    option.textContent = filtrado[i].name;

    document.querySelector('#destino').appendChild(option);


    pais.textContent = filtrado[i].country;
    ciudad.textContent = filtrado[i].city;

    tupla.appendChild(pais);
    tupla.appendChild(ciudad);
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

// select.addEventListener("change",() =>{
//   if(information) {
//     let indice = select.selectedIndex;
//     localStorage.setItem("seleccion", JSON.stringify(indice));
//     document.body.removeChild(document.getElementById("tabla"));
//     createTable(indice);
//   }
// });

