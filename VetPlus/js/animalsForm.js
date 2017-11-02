const searchParams = new URLSearchParams(window.location.search);

function searchEspecieIndex(especie) {
  for (let i = 0; i < especies.length; i += 1) {
    if (especie === especies[i].nom) return i;
  }
  return null;
}

async function animalOnForm() {
  const animal = await getAnimalById();
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
  await getTipus();
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

document.getElementById('enviar').addEventListener('click', (e) => {
  e.preventDefault();
  if (document.getElementById('nombre').value) {
    if (idAnimal)updateAnimal(); // No hace falta esperar
    else insertAnimal();
  }
});

init();
