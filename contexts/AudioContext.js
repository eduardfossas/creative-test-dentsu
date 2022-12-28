import { createContext } from "react";

export const AudioContext = createContext({
  analyser: null,
  dataArray: [],
  isReady: false,
  play: () => {},
});
