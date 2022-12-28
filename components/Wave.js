import styled, { css, keyframes } from "styled-components";

const createAnimation = () => {
  let styles = "";

  for (let i = 0; i < 4; i += 1) {
    styles += `
        &:nth-child(${i}) {
          animation-delay: ${i * 0.1}s;
        }
      `;
  }

  return css`
    ${styles}
  `;
};

const pulse = keyframes`
0% {
  transform: scaleY(1);
}

50% {
  transform: scaleY(0.5);
}

100% {
  transform: scaleY(1);
}
`;

const animation = () =>
  css`
    ${pulse} 1s infinite alternate;
  `;

const WaveIcon = styled.svg`
  flex: 0 0 25px;
  height: 24px;
  path {
    fill: currentColor;
    transform: ${(props) => (props.isPlaying ? "scaleY(0.1)" : "scaleY(1)")};
    transform-origin: center;

    animation: ${(props) => (props.isPlaying ? animation : "")};
    ${createAnimation()};
  }
`;

const Wave = ({
  isPlaying,
  className,
  showMobile = false,
  width = 21,
  height = 24,
}) => {
  return (
    <WaveIcon
      className={className}
      isPlaying={isPlaying}
      width={width}
      height={height}
      viewBox="0 0 21 24"
    >
      <path strokeWidth="2" stroke="currentColor" d="M1 4 1 20" />
      <path strokeWidth="2" stroke="currentColor" d="M7 6 7 18" />
      <path strokeWidth="2" stroke="currentColor" d="M13 2 13 22" />
      <path strokeWidth="2" stroke="currentColor" d="M19 5 19 19" />
    </WaveIcon>
  );
};

export { Wave };
