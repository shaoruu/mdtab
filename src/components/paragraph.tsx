import styled, { css } from 'styled-components';

const sharedParagraphStyles = css`
  color: ${(p) => p.theme.darkest};
`;

export const Paragraph = styled.p`
  ${sharedParagraphStyles};

  margin: 12px 0;
`;

export const Bold = styled.strong`
  ${sharedParagraphStyles};
`;

export const Anchor = styled.a`
  ${sharedParagraphStyles};

  color: #3b9ae1;
  text-decoration: none;
`;

export const BlockQuote = styled.blockquote`
  padding: 8px 24px;
  border-radius: 4px;
  background: ${(p) => p.theme.gray2};
  display: flex;
  align-items: center;
  border-left: 8px solid ${(p) => p.theme.gray3};
  margin: 12px 0;
`;
