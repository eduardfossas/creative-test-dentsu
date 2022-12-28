import { StartButton } from "components/StartButton";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 10;
  text-align: center;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 120px;
  font-weight: 300;
  margin: 0 0 20px;
`;

const Intro = ({ setIsStarted }) => {
  return (
    <Container>
      <Title>Ask an atom</Title>
      <StartButton setIsStarted={setIsStarted} />
    </Container>
  );
};

export { Intro };
