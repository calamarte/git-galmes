function ajax () {
  let promises = [];
    for (let i = 1; i <= 10; i += 1) {

      let promise = new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            let div = document.createElement('div');
            div.textContent = this.responseText;
            document.body.appendChild(div);
            resolve();
          }
        };
        xhttp.open("GET", "http://35.194.72.13/asincron.php?num="+i, true);
        xhttp.send();
      });

      promises.push(promise);
    }
    return promises
}

Promise.all(ajax()).then(()=>{
  let div = document.createElement('div');
  div.textContent = "Es el fin!!!!";
  document.body.appendChild(div);
});
