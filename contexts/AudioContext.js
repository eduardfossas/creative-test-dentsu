import { createContext } from "react";

export const AudioContext = createContext({
  analyser: null,
  dataArray: [],
  volumeData: [],
  isReady: false,
  play: () => {},
});
