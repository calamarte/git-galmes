function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let sostenido = ev.dataTransfer.getData("text") === 'sostenido';
    let teclaId = findTecla(ev.target.id,sostenido);
    if(!teclaId) {
        sostenido = !sostenido;
        teclaId = findTecla(ev.target.id,sostenido);
    }

    let nota = new Nota(
        teclaId,sonidos[parseInt(teclaId.split('-')[1])],
        ev.target.id,sostenido);

    notas.setNota(nota);
    notas.print();

}