const audioForm = document.getElementById('audio-form');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const audioPreview = document.getElementById('audio-preview');
const audioData = document.getElementById('audio-data');

let mediaRecorder;
let chunks = [];

startBtn.addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.addEventListener('dataavailable', event => {
        chunks.push(event.data);
      });
      mediaRecorder.start();
      startBtn.disabled = true;
      stopBtn.disabled = false;
    });
});

stopBtn.addEventListener('click', () => {
  mediaRecorder.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

audioForm.addEventListener('submit', event => {
  event.preventDefault();
  const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
  const audioUrl = URL.createObjectURL(audioBlob);
  audioPreview.src = audioUrl;
  audioData.value = audioBlob;
  chunks = [];
  audioForm.submit();
});
