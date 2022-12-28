import { StartButton } from "components/StartButton";
import styled from "styled-components";
import { motion } from "framer-motion";

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

const Title = styled(motion.h1)`
  font-size: 120px;
  font-weight: 300;
  margin: 0 0 20px;
`;

const Intro = ({ setIsStarted }) => {
  return (
    <Container>
      <Title
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 1 },
        }}
        exit={{
          opacity: 0,
          filter: "blur(50px)",
          transition: { duration: 0.75 },
        }}
      >
        Ask an atom
      </Title>
      <motion.div
        initial={{ opacity: 0, filter: "blur(20px)" }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 1 },
        }}
        exit={{
          opacity: 0,
          filter: "blur(50px)",
          transition: { duration: 0.75 },
        }}
      >
        <StartButton setIsStarted={setIsStarted} />
      </motion.div>
    </Container>
  );
};

export { Intro };
