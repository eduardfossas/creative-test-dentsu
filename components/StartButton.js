import { AudioContext } from "contexts/AudioContext";
import { useContext, useEffect, useCallback } from "react";
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
  const { play, audioContext } = useContext(AudioContext);
  const handlePlay = useCallback(() => {
    setIsStarted(true);
    play();
  }, [play, setIsStarted]);

  useEffect(() => {
    document.body.addEventListener("click", () => {
      handlePlay();
    });
    document.body.click();
  }, [audioContext, handlePlay]);

  return <Button onClick={handlePlay}>Start Experience</Button>;
};

export { StartButton };
