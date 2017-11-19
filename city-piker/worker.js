async function getCities() {
  let fetchCities = await fetch('https://raw.githubusercontent.com/David-Haim/CountriesToCitiesJSON/master/countriesToCities.json');
  let cities = await fetchCities.json();
  postMessage(cities);
}

getCities();