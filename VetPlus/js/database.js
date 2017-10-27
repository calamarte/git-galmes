let animals = [];
let tratamientos = [];
let especies = [];
let idAnimal = false;
let idTractament = false;

async function getTractaments() {
  const fetchTratamientos = await fetch('http://35.194.72.13/vetplus/serveis.php', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({
      MethodName: 'getTractaments',
      params: ''
    })
  });
  tratamientos = await fetchTratamientos.json();
}

async function deleteTratamiento(idTratamiento) {
  let deleteTratamientoFetch = await fetch('http://35.194.72.13/vetplus/serveis.php', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({
      MethodName: 'deleteTractament',
      params: {
        id: idTratamiento
      }
    })
  });
  // console.log(await deleteTratamientoFetch.json());
}

async function getAnimals() {
  const fetchDatos = await fetch('http://35.194.72.13/vetplus/serveis.php', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({
      MethodName: 'getAnimals',
      params: ''
    })
  });
  animals = await fetchDatos.json();
}

async function deleteAnimal(idAnimal) {
  let trataminetosBorrados = [];
  await getTractaments();

  let estosTratamientos = tratamientos.filter((tratamiento) => {
    return tratamiento.animal_idanimal === idAnimal;
  });

  console.log(estosTratamientos);
  for (let i = 0; i < estosTratamientos.length; i += 1) {
    trataminetosBorrados.
      push(deleteTratamiento(estosTratamientos[i].idtractament));
  }

  await Promise.all(trataminetosBorrados).then(async() => {
      await fetch('http://35.194.72.13/vetplus/serveis.php', {
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify({
          MethodName: 'deleteAnimal',
          params: {
            id: idAnimal
          }
        })
      });
    }
  );
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

async function getAnimalById() {
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

async function getTipus() {
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

async function getTrcatamentById() {
  const fetchTractament = await fetch('http://35.194.72.13/vetplus/serveis.php', {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body:JSON.stringify({
      MethodName: 'getTractamentById',
      params: {
        id: '' + idTractament
      }
    })
  });
  return fetchTractament.json();
}