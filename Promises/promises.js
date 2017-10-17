function ajax () {
   return new Promise((resolve, reject) => {
    for (let i = 0; i < 10; i += 1) {
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          // console.log(this.responseText);
        }
      };
      xhttp.open("GET", "http://35.194.72.13/asincron.php", true);
      xhttp.send();
    }
  });
}
Promise.all([ajax()]).then(()=>{
  alert("listooooo");
});
