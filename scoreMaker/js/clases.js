class Notas {

    constructor() {
        this.pentagrama = [];
        this.index = 0;
    }

    setNota (nota) {

        if(this.pentagrama.length >= 4){

            this.pentagrama[this.index] = nota;

            if(this.index >= 3)this.index = 0;
            else this.index++;

        }
        else this.pentagrama.push(nota);
    };

    reset (){
        this.pentagrama = [];
    };


    print (){

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

class Nota{

    constructor(teclaId,sonido,tipo,sostenido){
        this.teclaId = teclaId;
        this.sonido = sonido;
        this.tipo = tipo;
        this.sostenido = sostenido;
    }
}