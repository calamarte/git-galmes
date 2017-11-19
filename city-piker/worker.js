async function getCities() {
  let fetchCities = await fetch('https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json');
  let cities = await fetchCities.json();
  console.log(cities);
  // postMessage(cities);
}

getCities();