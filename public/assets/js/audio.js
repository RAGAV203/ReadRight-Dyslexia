const recordButton = document.getElementById('record-button');
  const stopButton = document.getElementById('stop-button');
  const audioDataInput = document.getElementById('audio-data');
  let mediaRecorder;
  let chunks = [];

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);

      recordButton.addEventListener('click', () => {
        mediaRecorder.start();
      });

      stopButton.addEventListener('click', () => {
        mediaRecorder.stop();
      });

      mediaRecorder.addEventListener('dataavailable', event => {
        chunks.push(event.data);
      });

      mediaRecorder.addEventListener('stop', () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
        const reader = new FileReader();

        reader.onload = () => {
          audioDataInput.value = reader.result;
        };

        reader.readAsDataURL(blob);
      });
    })
    .catch(err => {
      console.error(`Failed to get user media: ${err}`);
    });