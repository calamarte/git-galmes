w = new Worker('workerCon.js');
w.onmessage = (e)=>{
  let men = document.createElement('div');
  men.textContent = e.data.user + " : "+ e.data.message;
  document.getElementById('chat').appendChild(men);

  if(window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission(function(status) {
      let n = new Notification(e.data.user , {
        body: e.data.message,
        icon: 'img/muscle.png'
    });

      setTimeout(n.close.bind(n),5000);
    });
  }

}

