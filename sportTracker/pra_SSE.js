  let source = new EventSource("http://35.194.72.13/pra_SSE.php");
  source.onmessage = function (event) {
    console.log(event.data);
  }