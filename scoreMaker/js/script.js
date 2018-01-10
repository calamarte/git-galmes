const sonidos = document.querySelectorAll('audio');
let notas = new Notas();
let timeOuts = [];
let video = document.getElementById('video');

let press = false;


if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true,audio: true}).then((stream)=> {
        video.src = window.URL.createObjectURL(stream);
        video.volume = 0;
        video.play();

        let mediaRecorder = new MediaRecorder(stream);
        let records = [];

        mediaRecorder.ondataavailable = (event)=>{
            records.push(event.data);
        };

        mediaRecorder.onstop = () => {
            let blob = new Blob(records);
            records.pop();
            sentMedia(blob);
        };

        document.querySelector('#record').onclick = ()=>{
            if(mediaRecorder.state !== 'recording')mediaRecorder.start();
            else mediaRecorder.stop();
        };
    });
}

async function sentMedia(blob) {
    let formData = new FormData();
    formData.append('arxiu',blob);
    let fetchData = await fetch('http://35.194.72.13/scoremaker/backend.php',{
       method: 'post',
       body:formData
    });

    responseFormat(await fetchData.json());
}

function responseFormat(response) {
    console.log(response[0].transcripcio,response[0].confianca);
    if(response[0].confianca > 0.8) {
        let info = response[0].transcripcio.split(' ');

        for (let i = 0; i < info.length; i++) {
            let nota = new Nota();

            let data = info[i].toLocaleLowerCase();

            switch (data) {
                case 'do':
                    if(i !== info.length -1 && info[i + 1].toLocaleLowerCase() === 'agudo'){
                        data = 'do-alto';
                    }
                case 're':
                case 'mi':
                case 'fa':
                case 'sol':
                case 'la':
                case 'si': {
                    nota.tipo = data;

                    if (i !== info.length - 1) {
                        if (info[i + 1].toLocaleLowerCase() === 'sostenido') {
                            nota.sostenido = true;
                            i++;
                        } else nota.sostenido = false;
                    } else nota.sostenido = false;

                    nota.teclaId = findTecla(nota.tipo, nota.sostenido);
                    nota.sonido = sonidos[parseInt(nota.teclaId.split('-')[1])];
                    notas.setNota(nota);
                    break;
                }
            }
        }

        notas.print();
    }
}

function pausaTodo () {
  sonidos.forEach((sonido)=> {
      sonido.pause();
    sonido.currentTime = 0;
  });
}

function stopSound () {
    timeOuts.forEach((timeOut)=>{
        clearTimeout(timeOut);
    });
}

function abajoTecla (teclaId,tipo,sostenido) {
    if(!press) {
        let sonido = sonidos[parseInt(teclaId.split('-')[1])];
        let nota = new Nota (teclaId,sonido,tipo,sostenido);

        notas.setNota(nota);
        notas.print();
        console.log(notas.pentagrama);

        pausaTodo();
        sonido.play();
        press = true;

        let tecla = document.getElementById(teclaId);
        if (tecla.className.includes('tecla')) {
            tecla.style.backgroundColor = '#17a2b8';
        } else {
            tecla.style.backgroundColor = '#868e96';
        }
    }
}

function arribaTecla (id) {
    press = false;
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
      pausaTodo();
      nota.sonido.play();
     },time));

   time += 1000;
  });
});

document.querySelector('#stop').addEventListener('click',()=>{
  stopSound();
});



