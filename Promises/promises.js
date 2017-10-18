function ajax () {
    for (let i = 0; i < 10; i += 1) {
      let promise = new Promise((resolve, reject) => {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            // console.log(this.responseText);
          }
        };
        xhttp.open("GET", "http://35.194.72.13/asincron.php", true);
        xhttp.send();
      });
    }
  return promise;
}

Promise.all([ajax()]).then(()=>{
  alert("listooooo");
});
