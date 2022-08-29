import styled, { css } from 'styled-components';

const sharedHeadingStyle = css`
  color: ${(p) => p.theme.darkest};
`;

export const H1 = styled.h1`
  font-size: 2em;
  padding: 0.3rem 0;
  margin: 0.7rem 0;

  ${sharedHeadingStyle};
`;

export const H2 = styled.h2`
  padding: 0.3rem 0;
  margin: 0.5rem 0;

  ${sharedHeadingStyle};
`;

export const H3 = styled.h3`
  padding: 0.2rem 0;
  margin: 0.4rem 0;

  ${sharedHeadingStyle};
`;

export const H4 = styled.h4`
  padding: 0.15rem 0;
  margin: 0.35rem 0;

  ${sharedHeadingStyle};
`;

export const H5 = styled.h5`
  padding: 0.1rem 0;
  margin: 0.2rem 0;

  ${sharedHeadingStyle};
`;

export const H6 = styled.h6`
  padding: 0.08rem 0;
  margin: 0.16rem 0;

  ${sharedHeadingStyle};
`;
