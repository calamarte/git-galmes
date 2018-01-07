const sonidos = document.querySelectorAll('audio');
let notas = new Notas();
let timeOuts = [];
let video = document.getElementById('video');
let records;

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true,audio: true}).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.volume = 0;
        video.play();


        let mediaRecorder = new MediaRecorder(stream);

        document.querySelector('#record').onclick = ()=>{
            mediaRecorder.ondataavailable = (event)=>{
                if(event.data.size > 0)records = [event.data];
            };

            mediaRecorder.start();
            setTimeout(()=>{
                mediaRecorder.stop();
                let blob = new Blob(records);
                sentMedia(blob);
            },1000);
        }
    });
}

async function sentMedia(blob) {
    let fetchData = await fetch('http://35.194.72.13/scoremaker/backend.php',{
       method: 'post',
       body:{
           arxiu:blob
       }
    });

    console.log(await fetchData.json());
}

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
  };
  notas.setNota(nota);
  notas.print();
  console.log(notas.pentagrama);

  pasusaTodo();
  sonido.play();

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

function mouseDown (event)  {
    let tipoSostenido = findTipoAndSostenido(event.target.id);
    abajoTecla(event.target.id,tipoSostenido[0],tipoSostenido[1]);
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
  };

  this.reset = ()=>{
    this.pentagrama = [];
  };


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

function stopSound () {
  timeOuts.forEach((timeOut)=>{
    clearTimeout(timeOut);
  });
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
  stopSound();
  timeOuts = [];

  notas.pentagrama.forEach((nota)=>{

   timeOuts.push(setTimeout(()=>{
      pasusaTodo();
      nota.sonido.play();
     },time));

   time += 1000;
  });
});

document.querySelector('#stop').addEventListener('click',()=>{
  stopSound();
});

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

    let nota = {
        teclaId: teclaId,
        sonido: sonidos[parseInt(teclaId.split('-')[1])],
        tipo: ev.target.id,
        sostenido: sostenido
    };

    notas.setNota(nota);
    notas.print();

}

function findTecla(tipo,sostenido) {
  switch (tipo){
      case 'do': {
        if (!sostenido) return 't-0';
        else return 't-1';
      }
      case 're':{
        if (!sostenido) return 't-2';
        else return 't-3';
      }
      case 'mi':{
        if (!sostenido) return 't-4';
        else return null;
      }
      case 'fa':{
        if (!sostenido) return 't-5';
        else return 't-6';
      }
      case 'sol':{
        if (!sostenido) return 't-7';
        else return 't-8';
      }
      case 'la':{
        if (!sostenido) return 't-9';
        else return 't-10';
      }
      case 'si':{
        if (!sostenido) return 't-11';
        else return null;
      }
      case 'do-alto':{
        if (!sostenido) return 't-12';
        else return null;
      }
      default: return null;
  }
}

function findTipoAndSostenido(teclaId) {
    switch (teclaId){
        case 't-0': return ['do',false];
        case 't-1': return ['do',true];
        case 't-2': return ['re',false];
        case 't-3': return ['re',true];
        case 't-4': return ['mi',false];
        case 't-5': return ['fa',false];
        case 't-6': return ['fa',true];
        case 't-7': return ['sol',false];
        case 't-8': return ['sol',true];
        case 't-9': return ['la',false];
        case 't-10': return ['la',true];
        case 't-11': return ['si',false];
        case 't-12': return ['do-alto',false];
        default: return null;
    }
}