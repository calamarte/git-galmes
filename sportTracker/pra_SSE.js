  let source = new EventSource("http://35.194.72.13/pra_SSE.php");
  let ruta;
  let marker;
  source.onmessage = function (event) {
    let center = JSON.parse(event.data);
    addOnMap(center);
  }


  let map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.1534493, lng: -3.2222218},
      mapTypeId: 'satellite',
      zoom: 2,
      disableDefaultUI: true
    });
  }

 function addOnMap(poscion) {
    let latLng = new google.maps.LatLng(poscion.lat, poscion.lon);

    if (!marker){
      marker = new google.maps.Marker({
      position: latLng,
      map: map,
      title: 'Corredor',
      icon: 'img/run.png'
    });
    }else marker.setPosition(latLng);

   marker.setMap(map);


  if (!ruta) {
    ruta = new google.maps.Polyline({
      path: [latLng],
      geodesic: true,
      strokeColor: 'black',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    ruta.setMap(map);

  }else {
    ruta.getPath().push(latLng);
  }

   map.setCenter(latLng);
   map.setZoom(16)
 }

