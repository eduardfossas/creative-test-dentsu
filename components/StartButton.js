import { AudioContext } from "contexts/AudioContext";
import { useContext } from "react";
import styled from "styled-components";

const Button = styled.button`
  appearance: none;
  background: none;
  color: #fff;
  outline: none;
  box-shadow: none;
  border: 1px solid;
  padding: 10px 20px;
  border-radius: 9999px;
  font-size: 16px;
  transition: all 300ms ease;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background: #fff;
      color: #000;
    }
  }
`;

const StartButton = ({ setIsStarted }) => {
  const { play } = useContext(AudioContext);
  const handlePlay = () => {
    setIsStarted(true);
    play();
  };
  return <Button onClick={handlePlay}>Start</Button>;
};

export { StartButton };
