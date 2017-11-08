w = new Worker('workerCon.js');
w.onmessage = (e)=>{
  let men = document.createElement('div');
  men.textContent = e.data.user + " : "+ e.data.message;
  document.getElementById('chat').appendChild(men);

  if(window.Notification && Notification.permission !== "denied") {
    Notification.requestPermission(function(status) {  // status is "granted", if accepted by user
      let n = new Notification(e.data.user , {
        body: e.data.message,
        sound: 'sounds/notification.wav'
        // icon: '/path/to/icon.png' // optional
      });
      n.sound;
    });

  }
}

