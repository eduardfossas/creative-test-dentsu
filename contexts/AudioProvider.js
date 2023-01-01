import { AudioContext } from "./AudioContext";
import { useRef, useState } from "react";

const AudioProvider = ({ children }) => {
  const analyser = useRef(false);
  const dataArray = useRef(false);
  const volumeData = useRef(false);
  const audioContext = useRef(false);
  let audioElement, source;

  const setupAudioContext = async () => {
    audioContext.current = new window.AudioContext();
    audioElement = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    source = audioContext.current.createMediaStreamSource(audioElement);
    analyser.current = audioContext.current.createAnalyser();
    source.connect(analyser.current);
    analyser.current.fftSize = 1024;
    dataArray.current = new Uint8Array(analyser.current.frequencyBinCount);
    volumeData.current = new Float32Array(analyser.current.fftSize);
  };

  const play = () => {
    if (!analyser.current) {
      setupAudioContext().then(() => audioContext.current.resume());
    }
  };

  return (
    <AudioContext.Provider
      value={{ play, analyser, dataArray, volumeData, audioContext }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export { AudioProvider };
