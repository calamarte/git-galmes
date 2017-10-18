let datos = [];
function createHeader() {
  const cabeceras = ['Nom', 'Sexe', 'Numero de registre', 'Espècie'];
  const fila = document.createElement('tr');
  for (let i = 0; i < cabeceras.length; i += 1) {
    const celda = document.createElement('th');
    celda.textContent = cabeceras[i];
    fila.appendChild(celda);
  }
  return fila;
}

function editB() {
  console.log('editando');
}

// Necesito encontrar el objeto y no puedo sino paso un parametro
// Yo digo que aqui hay que hacer cosas con callback

function deleteB() {
  console.log('borrando');
}

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
    editar.onclick = editB;
    borrar.type = 'button';
    borrar.value = 'borrar';
    borrar.onclick = deleteB;

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
  document.body.appendChild(tabla);
}

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    datos = JSON.parse(this.responseText);
    console.log(datos);
    createTable();
  }
};

xhttp.open('POST', 'http://35.194.72.13/vetplus/serveis.php', true);
xhttp.send(JSON.stringify({
  MethodName: 'getAnimals',
  params: ''
}));

