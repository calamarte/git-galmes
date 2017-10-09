let select = document.createElement('select');
select.id = "select";
let opciones = ["Todos","Menores de edad","Activos"];

let datos = [];
let information = false;
for (let i = 0;i < 3;i++){
    let option = document.createElement('option');
    option.textContent = opciones[i];
    select.appendChild(option);
}

if(localStorage.getItem("seleccion")){
    select.selectedIndex = JSON.parse(localStorage.getItem("seleccion"));
}
document.body.appendChild(select);


let xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        datos = JSON.parse(this.responseText);
        information = true;
        console.log(datos);
        createTable(document.getElementById('select').selectedIndex);
    }
};
xmlHttp.open('GET','http://35.196.61.71/usuari.php',true);
xmlHttp.send();

function createHeader(tabla) {
    let columnas = ["Nombre","Edad","Activo"];
    let cabecera = document.createElement('tr');

    for (let i = 0;i < columnas.length;i++){
        let celda = document.createElement('th');
        celda.textContent = columnas[i];
        celda.style.border = "2px solid black";
        cabecera.appendChild(celda);
    }
    cabecera.style.border = "2px solid black";
    tabla.appendChild(cabecera);
}

function createTable(filtro) {
    if(!information)return;
    let tabla = document.createElement('table');
    tabla.id = 'tabla';
    createHeader(tabla);
    let filtrado = [];
    switch (filtro){
        case 1:
            filtrado = tMenorEdad();
            break;
        case 2:
            filtrado = tActivo();
            break;
        default:
            filtrado = datos;
            break;
    }
        for(let i = 0;i < filtrado.length;i++){
            let tupla = document.createElement('tr');
            let nombre = document.createElement('td');
            let edad = document.createElement('td');
            let activo = document.createElement('td');
            nombre.textContent = filtrado[i].nom+" "+filtrado[i].cognom1+" "+filtrado[i].cognom2;
            edad.textContent = filtrado[i].edat;
            if(filtrado[i].actiu === "0")activo.textContent = "No";
            else activo.textContent = "Si";

            tupla.appendChild(nombre);
            tupla.appendChild(edad);
            tupla.appendChild(activo);
            tabla.appendChild(tupla);
        }
        tabla.style.backgroundColor = "#8C9EFF";
        tabla.style.borderCollapse = "collapse";
        tabla.style.border = "2px solid black";
        document.body.appendChild(tabla);
}

function tMenorEdad() {
    let menor = [];
    for(let i = 0;i < datos.length;i++){
        if(parseInt(datos[i].edat) < 18)menor.push(datos[i]);
    }
    return menor;
}

function tActivo() {
    let activo = [];
    for(let i = 0;i < datos.length;i++){
        if(datos[i].actiu === "1")activo.push(datos[i]);
    }
    return activo;
}

document.getElementById("select").addEventListener("change",() =>{
    let indice = document.getElementById("select").selectedIndex;
    localStorage.setItem("seleccion",JSON.stringify(indice));
    document.body.removeChild(document.getElementById("tabla"));
    createTable(indice);
});

