import styled from "styled-components";
import Logo from "assets/svg/dentsu-logo.svg";
import MenuSvg from "assets/svg/menu.svg";
import { Wave } from "components/Wave";
import { motion } from "framer-motion";

const Container = styled(motion.header)`
  width: 100%;
  position: absolute;
  color: #fff;
  z-index: 10;
`;

const Navigation = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 32px 44px;
`;

const LogoWrapper = styled.div`
  width: 77px;
`;

const Header = ({ isStarted }) => {
  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.65 } }}
    >
      <Navigation>
        <div>
          <MenuSvg />
        </div>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <div>
          <Wave isPlaying={isStarted} />
        </div>
      </Navigation>
    </Container>
  );
};

export { Header };
