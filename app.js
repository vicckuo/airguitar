const modelParams = {
  flipHorizontal: true,
  imageScaleFacoctor: 1,
  maxNumBoxes: 1,
  iouThreshold: 0.9,
  scoreThreshold: 0.9,
};

navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
let model;

handTrack.startVideo(video).then((status) => {
  if (status) {
    navigator.getUserMedia(
      { video: {} },
      (stream) => {
        video.srcObject = stream;

        setInterval(runDetection, 1000);
      },
      (err) => console.log(err)
    );
  }
});

function runDetection() {
  model.detect(video).then((predictions) => {
    if (predictions.length !== 0) {
      let hand1 = predictions[0].bbox;
      let x = hand1[0];
      let y = hand1[1];

      if (y > 300) {
        if (x < 150) {
          audio.src = 'G_Chord.mp3';
        } else if (x > 400) {
          audio.src = 'C_Chord.mp3';
        } else if (x > 300) {
          audio.src = 'Am_Chord.mp3';
        } else if (x > 100) {
          audio.src = 'F_Chord.mp3';
        }
      }
      // 播放聲音
      audio.play();
    }
    console.log(predictions);
  });
}

handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});
