const sonidos = document.querySelectorAll('audio');


function pasusaTodo () {
  sonidos.forEach((sonido)=> {
    sonido.pause();
    sonido.currentTime = 0;
  });
}

function abajoTecla (id) {
  pasusaTodo();
  let sonido = sonidos[parseInt(id.split('-')[1])];
  sonido.play();

  let tecla = document.getElementById(id);
  if(tecla.className.includes('tecla')){
    tecla.style.backgroundColor = '#17a2b8';
  }else {
    tecla.style.backgroundColor = '#868e96';
  }
}

function arribaTecla (id) {
  let tecla = document.getElementById(id);
  if(tecla.className.includes('tecla')){
    tecla.style.backgroundColor = '#ffffff';
  }else {
    tecla.style.backgroundColor = '#343a40';
  }
}

function mouseDown (event) {
  abajoTecla(event.target.id);
}

function mouseUp (event) {
  arribaTecla(event.target.id);
}

function switchKey (key) {
  switch (key){
    case 'a': return 't-0';
    case 'w': return 't-1';
    case 's': return 't-2';
    case 'e': return 't-3';
    case 'd': return 't-4';
    case 'f': return 't-5';
    case 't': return 't-6';
    case 'g': return 't-7';
    case 'y': return 't-8';
    case 'h': return 't-9';
    case 'u': return 't-10';
    case 'j': return 't-11';
    case 'k': return 't-12';
    default: return null;
  }
}

function notas () {
  this.pentagrama = [];

  this.setNota = (nota)=> {

    if(pentagrama.length >= 6){

      pentagrama.unshift(nota);
      pentagrama.pop();

    }
    else pentagrama.push(nota);
  }

  this.reset = ()=>{
    this.pentagrama = [];
  }

  this.print = ()=>{

  }
}

addEventListener('keydown',(event)=>{
  let id = switchKey(event.key);
  if(id)abajoTecla(id);
});

addEventListener('keyup',(event)=>{
  let id = switchKey(event.key);
  if(id)arribaTecla(id);
});