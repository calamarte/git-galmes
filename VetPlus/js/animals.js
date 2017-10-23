let datos = [];
function createHeader() {
  const cabeceras = ['Nom', 'Sexe', 'Numero de registre', 'Espècie', 'Opcions'];
  const fila = document.createElement('tr');
  for (let i = 0; i < cabeceras.length; i += 1) {
    const celda = document.createElement('th');
    celda.textContent = cabeceras[i];
    fila.appendChild(celda);
  }
  return fila;
}

function targetAnimal(input) {
  return datos[input.target.parentNode
    .parentNode.rowIndex - 1];
}
//
// function deleteAnimal() {
//
// }
//
// function getTractaments () {
//
// }

function createTable() {
  const tabla = document.createElement('table');
  tabla.id = 'tabla';
  tabla.appendChild(createHeader());
  for (let i = 0; i < datos.length; i += 1) {
    const fila = document.createElement('tr');

    const nombre = document.createElement('td');
    const num = document.createElement('td');
    const especie = document.createElement('td');
    const sexo = document.createElement('td');
    const botones = document.createElement('td');

    const editar = document.createElement('input');
    const borrar = document.createElement('input');

    editar.type = 'button';
    editar.value = 'editar';
    editar.onclick = (e) => {
      window.location = 'animalsForm.html?idAnimal=' + targetAnimal(e).idanimal;
    };
    borrar.type = 'button';
    borrar.value = 'borrar';
    borrar.onclick = (e) => {
      let aceptar = window.confirm('Esta seguro de que desea borrar a ' +
        targetAnimal(e).nomAnimal);

      if (aceptar)deleteAnimal();
    };

    nombre.textContent = datos[i].nomAnimal;
    sexo.textContent = datos[i].sexe;
    if (datos[i].numregistre)num.textContent = datos[i].numregistre;
    else num.textContent = 'Sense número';
    especie.textContent = datos[i].nomTipus;
    botones.appendChild(editar);
    botones.appendChild(borrar);

    fila.appendChild(nombre);
    fila.appendChild(sexo);
    fila.appendChild(num);
    fila.appendChild(especie);
    fila.appendChild(botones);

    tabla.appendChild(fila);
  }
  document.getElementById('tablaDiv').appendChild(tabla);
}

// const xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function () {
//   if (this.readyState === 4 && this.status === 200) {
//     datos = JSON.parse(this.responseText);
//     console.log(datos);
//     createTable();
//   }
// };
//
// xhttp.open('POST', 'http://35.194.72.13/vetplus/serveis.php', true);
// xhttp.send(JSON.stringify({
//   MethodName: 'getAnimals',
//   params: ''
// }));

async function init() {
  const fetchDatos = await fetch('http://35.194.72.13/vetplus/serveis.php', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({
      MethodName: 'getAnimals',
      params: ''
    })
  });
  datos = await fetchDatos.json();
  createTable();
}

document.getElementById('new').addEventListener('click', () => {
  window.location = 'animalsForm.html';
});

init();

