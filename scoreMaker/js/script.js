let sonidos = document.querySelectorAll('audio');


function pasusaTodo () {
  sonidos.forEach((sonido)=> {
    sonido.pause();
    sonido.currentTime = 0;
  });
}

function abajoTecla (event) {
  pasusaTodo();
  let sonido = sonidos[parseInt(event.target.id.split('-')[1])];
  sonido.play();

  if(event.target.className.includes('tecla')){
    event.target.style.backgroundColor = '#17a2b8';
  }else {
    console.log('sostenido Down');
    event.target.style.backgroundColor = '#868e96';
  }
}

function arribaTecla (event) {
  if(event.target.className.includes('tecla')){
    event.target.style.backgroundColor = '#ffffff';
  }else {
    event.target.style.backgroundColor = '#343a40';
    console.log('sostenido Up');
  }
}