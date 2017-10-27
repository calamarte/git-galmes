async function init() {
  await getAnimals();
  await getTractaments();
  createTable();

}

function createHeader1() {
  const fila = document.createElement('tr');
  let celda = document.createElement('th');
  celda.textContent = 'Animales';
  celda.colSpan = '3';
  fila.appendChild(celda);

  celda = document.createElement('th');
  celda.textContent = 'Tratamientos';
  celda.colSpan = '2';
  fila.appendChild(celda);

  celda = document.createElement('th');
  celda.textContent = 'Opciones';
  celda.rowSpan = '2';
  fila.appendChild(celda);

  return fila;
}

function createHeader2() {
  const cabeceras = ['Nombre', 'Numero de registro', 'Especie', 'descripción', 'Fecha'];
  const fila = document.createElement('tr');
  for (let i = 0; i < cabeceras.length; i += 1) {
    const celda = document.createElement('th');
    celda.textContent = cabeceras[i];
    fila.appendChild(celda);
  }
  return fila;
}



function createTable() {
  if(document.getElementById('tabla')){
    document.getElementById('tablaDiv')
    .removeChild(document.getElementById("tabla"));
  }
  const tabla = document.createElement('table');
  tabla.className = 'border';
  tabla.id = 'tabla';
  tabla.appendChild(createHeader1());
  tabla.appendChild(createHeader2());

  for (let i = 0; i < animals.length; i += 1){
    let  fila = document.createElement('tr');
    let animal = animals[i];
    let estosTratamientos = tratamientos.filter((tratamiento)=>{
        return tratamiento.animal_idanimal === animal.idanimal
    });
    console.log(animal.idanimal);
    console.log(estosTratamientos);

    let nombreAnimal = document.createElement('td');
    nombreAnimal.rowSpan = '' + (estosTratamientos.length + 1);
    nombreAnimal.textContent = animal.nomAnimal;

    fila.appendChild(nombreAnimal);

    let numeroRegistro = document.createElement('td');
    numeroRegistro.rowSpan = '' + (estosTratamientos.length + 1);
    if (animal.numregistre) {
      numeroRegistro.textContent = animal.numregistre;
    }else numeroRegistro.textContent = 'Sense numero';

    fila.appendChild(numeroRegistro);

    let especie = document.createElement('td');
    especie.rowSpan = '' + (estosTratamientos.length + 1);
    especie.textContent = animal.nomTipus;

    fila.appendChild(especie);

    tabla.appendChild(fila);

    if (estosTratamientos.length === 0){

      let no = document.createElement('td');
      no.textContent = 'No';

      fila.appendChild(no);

      let hiHa = document.createElement('td');
      hiHa.textContent = 'hi ha';

      fila.appendChild(hiHa);

      let tractamentss = document.createElement('td');
      tractamentss.textContent = 'tractaments';

      fila.appendChild(tractamentss);
    }

    tabla.appendChild(fila);

    for (let k = 0; k < estosTratamientos.length; k += 1) {
        let filaTratamientos = document.createElement('tr');
        let descripcion = document.createElement('td');
        descripcion.textContent = estosTratamientos[k].descripcio;

        filaTratamientos.appendChild(descripcion);

        let fecha = document.createElement('td');
        fecha.textContent = estosTratamientos[k].data;

        filaTratamientos.appendChild(fecha);

        let botones = document.createElement('td');
        botones.id = '' + estosTratamientos[k].idtractament
        let editar = document.createElement('input');
        editar.type = 'button';
        editar.value = 'editar';
        editar.onclick = (e)=>{
          window.location = 'tractamentForm.html?idTractament=' + e.target.parentNode.id;
        }

        let borrar = document.createElement('input');
        borrar.type = 'button';
        borrar.value = 'borrar';
        borrar.onclick = async (e) => {
          let aceptar = window.confirm('Esta seguro de que desea borrar' +
            ' este tratamiento');

          if (aceptar){
            await deleteTratamiento(e.target.parentNode.id);

            init();
          }
        }
        botones.appendChild(editar);
        botones.appendChild(borrar);

        filaTratamientos.appendChild(botones);

        tabla.appendChild(filaTratamientos);
      }
  }
  document.getElementById('tablaDiv').appendChild(tabla);

}

document.getElementById('refresh').addEventListener('click', () => {
  init();
});

init();
