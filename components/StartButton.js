import { AudioContext } from "contexts/AudioContext";
import { useContext } from "react";

const StartButton = () => {
  const { play } = useContext(AudioContext);
  return <button onClick={play}>Start</button>;
};

export { StartButton };
