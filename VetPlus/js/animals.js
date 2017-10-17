let datos = [];
function createHeader() {
  const cabeceras = ['Id', 'Nom', 'Numero de registre', 'espècie'];
  const fila = document.createElement('tr');
  for (let i = 0; i < cabeceras.length; i += 1) {
    const celda = document.createElement('th');
    celda.textContent = cabeceras[i];
    fila.appendChild(celda);
  }
  return fila;
}

function createTable(datos) {
  const tabla = document.createElement('table');
  tabla.id = 'table';
  tabla.appendChild(createHeader());
}

const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = () => {
  if (this.readyState === 4 && this.status === 200) {
    datos = JSON.parse(this.responseText);
  }
};
xhttp.open('POST', "", true);
xhttp.send();
