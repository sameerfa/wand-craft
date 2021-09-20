import Webcam from "react-webcam";
import { useRef, useState } from "react";
import * as handTrack from "handtrackjs";
import { CircularProgress } from "@material-ui/core";

export default function Header() {
  const [label, setLabel] = useState(null);
  const [loader, setLoader] = useState("secondary");

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
    }, 3000);
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
      //console.log(predictions);
      predictions.map((prediction) => setLabel(prediction.label));

      if (label === "open") {
        console.log("scrolling down");
        setLoader("primary");
        window.scrollBy(0, window.innerHeight);
      } else if (label === "closed") {
        console.log("scrolling up");
        setLoader("primary");
        window.scrollBy(0, -window.innerHeight);
      } else {
        console.log("detecting...");
        setLoader("secondary");
      }
    }
  };
  runHandtrack();
  return (
    <>
      <div className="header">
        <div>
          <h1>
            Wand Craft <small className="xsmall">Beta</small>
          </h1>
          <p className="small">Please grant camera access. 📸</p>
          <small className="xsmall">This page runs on your browser only.</small>
        </div>
        <div>
          <Webcam
            ref={webcamRef}
            style={{
              width: 100,
              height: 100,
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              width: 100,
              height: 100,
            }}
          />
        </div>
      </div>
      <CircularProgress color={loader} className="loader" />
    </>
  );
}
