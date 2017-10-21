let especies = [];
const searchParams = new URLSearchParams(window.location.search);
let id = false;

if (searchParams.get('id'))id = searchParams.get('id');

async function selectOptions() {
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
async function init() {
  await selectOptions();
  for (let i = 0; i < especies.length; i += 1) {
    const option = document.createElement('option');
    option.textContent = especies[i].nom;
    document.getElementById('especie').appendChild(option);
  }
}

document.getElementById('enviar').addEventListener('click', () => {

});

init();
