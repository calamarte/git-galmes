const searchParams = new URLSearchParams(window.location.search);

function searchAnimalIndex(animal) {
  for (let i = 0; i < animals.length; i += 1) {
    if (animal === animals[i].nomAnimal) return i;
  }
  return null;
}

async function tractamentOnForm () {
  const tractament = await getTrcatamentById();
  console.log(tractament);
  document.getElementById('fecha').value = tractament.data.replace(' ','T');

  document.getElementById('animales')
    .selectedIndex = searchAnimalIndex(tractament.nomAnimal);

  document.getElementById('descripcion').value = tractament.descripcio;
}

async function init() {
  await getAnimals();
  for (let i = 0; i < animals.length; i += 1) {
    const option = document.createElement('option');
    option.textContent = animals[i].nomAnimal;
    document.getElementById('animales').appendChild(option);
  }

  if (searchParams.get('idTractament')) {
    idTractament = searchParams.get('idTractament');
    await tractamentOnForm();
  }
}

init();

let ahora;
document.getElementById('ahora').addEventListener('click', (e) =>{
//YYYY-MM-DDThh:mm:ss.ms
  if (!ahora) {
    e.target.value = 'Para';
    ahora = setInterval(() => {
    let now = new Date();
    let arrayData = now.toString().split(' ');
    console.log(arrayData[3] + '-' + (now.getMonth() + 1) +
      '-'+  arrayData[2] +'T'+ arrayData[4]);

    document.getElementById('fecha').value = arrayData[3] + '-' + (now.getMonth() + 1) +
      '-'+  arrayData[2] +'T'+ arrayData[4];
    }, 1000)
  }else {
    clearInterval(ahora);
    e.target.value = 'Ahora';
    document.getElementById('fecha').value = null;
    ahora = null;
  }
});