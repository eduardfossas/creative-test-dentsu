import { AudioContext } from "./AudioContext";
import { useRef, useState } from "react";

const AudioProvider = ({ children }) => {
  const analyser = useRef(false);
  const dataArray = useRef(false);
  const volumeData = useRef(false);
  let audioContext, audioElement, source;

  const setupAudioContext = async () => {
    audioContext = new window.AudioContext();
    audioElement = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    source = audioContext.createMediaStreamSource(audioElement);
    analyser.current = audioContext.createAnalyser();
    source.connect(analyser.current);
    analyser.current.fftSize = 1024;
    dataArray.current = new Uint8Array(analyser.current.frequencyBinCount);
    volumeData.current = new Float32Array(analyser.current.fftSize);
  };

  const play = () => {
    if (!analyser.current) {
      setupAudioContext();
    }
  };

  return (
    <AudioContext.Provider value={{ play, analyser, dataArray, volumeData }}>
      {children}
    </AudioContext.Provider>
  );
};

export { AudioProvider };
