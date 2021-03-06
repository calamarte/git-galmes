

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
  return animals[input.target.parentNode
    .parentNode.rowIndex - 1];
}

function createTable() {
  if(document.getElementById('tabla')){
    document.getElementById('tablaDiv')
    .removeChild(document.getElementById("tabla"));
  }
  const tabla = document.createElement('table');
  tabla.id = 'tabla';
  tabla.appendChild(createHeader());
  for (let i = 0; i < animals.length; i += 1) {
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
    borrar.onclick = async (e) => {
      let aceptar = window.confirm('Esta seguro de que desea borrar a ' +
        targetAnimal(e).nomAnimal);

      if (aceptar){
        await deleteAnimal(targetAnimal(e).idanimal);

        init();
      }
    };

    nombre.textContent = animals[i].nomAnimal;
    sexo.textContent = animals[i].sexe;
    if (animals[i].numregistre)num.textContent = animals[i].numregistre;
    else num.textContent = 'Sense número';
    especie.textContent = animals[i].nomTipus;
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

async function init() {
  await getAnimals()
  createTable();
}

document.getElementById('new').addEventListener('click', () => {
  window.location = 'animalsForm.html';
});

document.getElementById('refresh').addEventListener('click', () => {
  init();
});

init();

