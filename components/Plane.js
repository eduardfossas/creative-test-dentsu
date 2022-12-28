import PlaneSvg from "assets/svg/plane.svg";
import styled from "styled-components";

const Perspective = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Plane = () => {
  return (
    <Perspective>
      <PlaneSvg />
    </Perspective>
  );
};

export { Plane };
