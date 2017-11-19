//    w = new Worker('worker.js');
let data = false;
let keys = [];
let allCities = [];

getCities();

async function getCities() {
  let fetchCities = await fetch('https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json');
  data = await fetchCities.json();

  for (let key in data){
    keys.push(key);
    allCities = allCities.concat(data[key]);
  }

}

//    w.onmessage(function (event){
//      data = event.data;
//    });

document.querySelector('#search').addEventListener('change',(e)=>{
  if(data && e.target.value.length >= 3)search();
});

function search() {
  let set;
  let citiesCountry = [];


  const keyFilter = keys.filter((country)=>{
    return country.toLowerCase().startsWith(document.querySelector('#search').value.toLowerCase());
  });

  const citiesFilter = allCities.filter((city)=>{
    return city.toLowerCase().startsWith(document.querySelector('#search').value.toLowerCase());
  });


  for (let i = 0; i < keyFilter.length;i++){
    console.log(keyFilter[i],data[keyFilter[i]]);
    citiesCountry = citiesCountry.concat(data[keyFilter[i]]);
  }

  set = new Set(citiesCountry.concat(citiesFilter));
  onHtml(set.toArray());
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
}
