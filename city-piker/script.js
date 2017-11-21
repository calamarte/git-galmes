let w = new Worker('worker.js');
let data = false;
let keys = [];
let allCities = [];
let mark;

if(localStorage.getItem('divs')) {
  let local = JSON.parse(localStorage.getItem('divs'));
  document.querySelector('#search').value = local[1];
  onHtml(local[0]);
}

  w.onmessage = (event) => {
    data = event.data;

    for (let key in data) {
      keys.push(key);
      allCities = allCities.concat(data[key]);
    }
  };

document.querySelector('#search').addEventListener('keyup',(e)=>{
  if(data && e.target.value.length >= 3)onHtml(search());
});

function search() {

  const keyFilter = keys.filter((country)=>{
    return country.toLowerCase().includes(document.querySelector('#search')
    .value.toLowerCase());
  });

  const citiesFilter = allCities.filter((city)=>{
    return city.toLowerCase().includes(document.querySelector('#search')
    .value.toLowerCase());
  });

  return keyFilter.concat(citiesFilter);
}

function onHtml(divs) {
  if(document.querySelector('#cities')){
    document.body.removeChild(document.querySelector('#cities'));
  }

  localStorage.setItem('divs',JSON.stringify([
    divs,
    document.querySelector('#search').value
  ]));

  let div = document.createElement('div');
  div.id = 'cities';

  for(let i = 0; i < divs.length;i++){
    let ciudad = document.createElement('div');

    ciudad.textContent = divs[i];
    div.appendChild(ciudad);
  }

  document.body.appendChild(div);
  mark = new Mark(document.querySelector('div'));
  mark.mark(document.querySelector('#search').value);
}
