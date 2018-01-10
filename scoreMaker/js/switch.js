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
