//import logo from "./logo.svg";
import "./App.css";
import Webcam from "react-webcam";
import { useRef } from "react";
import * as handTrack from "handtrackjs";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const defaultParams = {
    flipHorizontal: false,
    outputStride: 16,
    imageScaleFactor: 1,
    maxNumBoxes: 20,
    iouThreshold: 0.2,
    scoreThreshold: 0.6,
    modelType: "ssd320fpnlite",
    modelSize: "large",
    bboxLineWidth: "2",
    fontSize: 17,
  };

  const runHandtrack = async () => {
    const model = await handTrack.load(defaultParams);
    console.log("Model loaded");
    setInterval(() => {
      runDetection(model);
    }, 100);
  };

  const runDetection = async (model) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const predictions = await model.detect(video);
      console.log(predictions);
    //   [
    //     {
    //         "bbox": [
    //             306.45503997802734,
    //             134.62892532348633,
    //             138.41323852539062,
    //             198.1304168701172
    //         ],
    //         "class": 5,
    //         "label": "face",
    //         "score": "0.99"
    //     },
    //     {
    //         "bbox": [
    //             277.717227935791,
    //             336.8393611907959,
    //             119.59280014038086,
    //             132.94200897216797
    //         ],
    //         "class": 1,
    //         "label": "open",
    //         "score": "0.75"
    //     }
    // ]
    // open down, close up next
    }
  };

  runHandtrack();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
