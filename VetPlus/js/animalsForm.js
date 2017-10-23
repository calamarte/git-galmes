let especies = [];
const searchParams = new URLSearchParams(window.location.search);
let idAnimal = false;

async function selectCreateOptions() {
  const fetchOptions = await fetch('http://35.194.72.13/vetplus/serveis.php', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({
      MethodName: 'getTipus',
      params: ''
    })
  });
  especies = await fetchOptions.json();
}

async function getAnimal() {
  const fetchAnimal = await fetch('http://35.194.72.13/vetplus/serveis.php', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:JSON.stringify({
      MethodName: 'getAnimalById',
      params: {
        id: '' + idAnimal
      }
    })
  });
  return fetchAnimal.json();
}

function searchEspecieIndex(especie) {
  for (let i = 0; i < especies.length; i += 1) {
    if (especie === especies[i].nom) return i;
  }
  return null;
}

async function animalOnForm() {
  const animal = await getAnimal();
  document.getElementById('nombre').value = animal.nomAnimal;
  if (animal.sexe === 'MASC')document.getElementById('m').checked = true;
  else document.getElementById('m').checked = false;
  document.getElementById('numRegistro').value = animal.numregistre;
  document.getElementById('especie')
    .selectedIndex = searchEspecieIndex(animal.nomTipus);
}

function mascOrFem() {
  if (document.getElementById('m').checked) return 'MASC';
  return 'FEM';
}

async function init() {
  await selectCreateOptions();
  for (let i = 0; i < especies.length; i += 1) {
    const option = document.createElement('option');
    option.textContent = especies[i].nom;
    document.getElementById('especie').appendChild(option);
  }

  if (searchParams.get('idAnimal')) {
    idAnimal = searchParams.get('idAnimal');
    animalOnForm();
  }
}

async function updateAnimal() {
  let fetchUpdate = await fetch('http://35.194.72.13/vetplus/serveis.php', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({
      MethodName: 'updateAnimal',
      params: {
        id: '' + idAnimal,
        nom: document.getElementById('nombre').value,
        sexe: mascOrFem(),
        reg: document.getElementById('numRegistro').value,
        tipus: especies[searchEspecieIndex(document.getElementById('especie')[
          document.getElementById('especie').selectedIndex].value)].idtipus
      }
    })
  });
  alert('Actualizado con exito');
  // console.log(await fetchUpdate.json());
}

async function insertAnimal() {
  let fetchInsert = await fetch('http://35.194.72.13/vetplus/serveis.php', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({
      MethodName: 'insertAnimal',
      params: {
        nom: document.getElementById('nombre').value,
        sexe: mascOrFem(),
        reg: document.getElementById('numRegistro').value,
        tipus: especies[searchEspecieIndex(document.getElementById('especie')[
          document.getElementById('especie').selectedIndex].value)].idtipus
      }
    })
  });
  if (await fetchInsert.json()) alert('Insertado con exito');
}

document.getElementById('enviar').addEventListener('click', (e) => {
  e.preventDefault();
  let resultado;
  if (document.getElementById('nombre').value !== null) {
    if (idAnimal)updateAnimal(); // No hace falta esperar
    else insertAnimal();
  }
});

init();
