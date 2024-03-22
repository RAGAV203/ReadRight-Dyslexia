const recordButton = document.getElementById('recordButton');
const stopButton = document.getElementById('stopButton');
let chunks = [];

recordButton.addEventListener('click', () => {
  const stream = navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.start();

  recordButton.disabled = true;
  stopButton.disabled = false;

  mediaRecorder.addEventListener('dataavailable', event => {
    chunks.push(event.data);
  });

  mediaRecorder.addEventListener('stop', () => {
    const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
    const formData = new FormData();
    formData.append('audio', blob);

    fetch('/test', {
      method: 'POST',
      body: formData
    }).then(response => {
      console.log(response);
    });

    recordButton.disabled = false;
    stopButton.disabled = true;
    chunks = [];
  });

  stopButton.addEventListener('click', () => {
    mediaRecorder.stop();
  });
});