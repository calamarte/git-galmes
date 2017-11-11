setInterval(async ()=>{
  let fetchDatos = await fetch('http://35.194.72.13/pra_WW.php');
  let datos = await fetchDatos.json();
  postMessage(datos);
},60000);