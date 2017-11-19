let w = new Worker('worker.js');
let data = false;
let keys = [];
let allCities = [];
let mark;



w.onmessage = (event)=>{
  data = event.data;

  for (let key in data){
    keys.push(key);
    allCities = allCities.concat(data[key]);
  }
};

document.querySelector('#search').addEventListener('change',(e)=>{
  if(data && e.target.value.length >= 3)onHtml(search());
});

function search() {
  let set;
  let citiesCountry = [];


  const keyFilter = keys.filter((country)=>{
    return country.toLowerCase().includes(document.querySelector('#search')
    .value.toLowerCase());
  });

  const citiesFilter = allCities.filter((city)=>{
    return city.toLowerCase().includes(document.querySelector('#search')
    .value.toLowerCase());
  });


  for (let i = 0; i < keyFilter.length;i++){
    citiesCountry = citiesCountry.concat(data[keyFilter[i]]);
  }

  set = new Set(citiesCountry.concat(citiesFilter));
  return set.toArray();
}

function onHtml(divs) {
  if(document.querySelector('#cities')){
    document.body.removeChild(document.querySelector('#cities'));
  }

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
