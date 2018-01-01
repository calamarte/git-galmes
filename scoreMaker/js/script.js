const sonidos = document.querySelectorAll('audio');
let notas = new Notas();
let timeOuts = [];


function pasusaTodo () {
  sonidos.forEach((sonido)=> {
    sonido.pause();
    sonido.currentTime = 0;
  });
}

function abajoTecla (teclaId,tipo,sostenido) {
  let sonido = sonidos[parseInt(teclaId.split('-')[1])];
  let nota = {
    teclaId: teclaId,
    sonido: sonido,
    tipo: tipo,
    sostenido: sostenido
  }
  notas.setNota(nota);
  notas.print();
  console.log(notas.pentagrama);

  let tecla = document.getElementById(teclaId);
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
    case 'a': return ['t-0','do',false];
    case 'w': return ['t-1','do',true];
    case 's': return ['t-2','re',false];
    case 'e': return ['t-3','re',true];
    case 'd': return ['t-4','mi',false];
    case 'f': return ['t-5','fa',false];
    case 't': return ['t-6','fa',true];
    case 'g': return ['t-7','sol',false];
    case 'y': return ['t-8','sol',true];
    case 'h': return ['t-9','la',false];
    case 'u': return ['t-10','la',true];
    case 'j': return ['t-11','si',false];
    case 'k': return ['t-12','do-alto',false];
    default: return null;
  }
}

function Notas () {
  this.pentagrama = [];

  this.setNota = (nota)=> {

    if(this.pentagrama.length >= 4){

      this.pentagrama.unshift(nota);
      this.pentagrama.pop();

    }
    else this.pentagrama.push(nota);
  }

  this.reset = ()=>{
    this.pentagrama = [];
  }


  this.print = ()=>{

    //Elimina todas las notas del pentagrama
    let notasDom = document.querySelectorAll('.nota');
    notasDom.forEach((notaDom)=>{
      notaDom.parentNode.removeChild(notaDom);
    });

    for(let i = 0; i < this.pentagrama.length; i++){
      let img = document.createElement('img');

      let nota = this.pentagrama[i];
      img.className = 'nota '+nota.tipo;
      img.id = 'nota-'+(i+1);
      if(nota.tipo === 'do'){
        if(nota.sostenido)img.src = 'assets/nota2sust.png';
        else img.src = 'assets/nota2.png';

      }else if(nota.sostenido)img.src = 'assets/nota1sust.png';
      else img.src = 'assets/nota1.png';

      document.querySelector('#pentagramaContainer').appendChild(img);
    }

  }
}

addEventListener('keydown',(event)=>{
  let nota = switchKey(event.key);
  if(nota)abajoTecla(nota[0],nota[1],nota[2]);
});

addEventListener('keyup',(event)=>{
  let id = switchKey(event.key);
  if(id)arribaTecla(id[0]);
});

document.querySelector('#reset').addEventListener('click',()=>{
  notas.reset();
  notas.print();
});

document.querySelector('#play').addEventListener('click',()=>{
  let time = 1000;

  notas.pentagrama.forEach((nota)=>{

   timeOuts.push(setTimeout(()=>{
      pasusaTodo();
      nota.sonido.play();
     },time));

   time += 1000;
  });
});

document.querySelector('#stop').addEventListener('click',()=>{
  timeOuts.forEach((timeOut)=>{
    clearTimeout(timeOut);
  })
});
