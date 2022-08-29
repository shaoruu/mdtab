import styled, { css } from 'styled-components';

const sharedListStyles = css`
  margin: 0.4rem 1rem;

  color: ${(p) => p.theme.darkest};
`;

export const OrderedList = styled.ol`
  ${sharedListStyles};
`;

export const UnorderedList = styled.ul`
  ${sharedListStyles};
`;

export const ListItem = styled.li`
  margin: 0.4rem 0;

  & > input {
    margin-right: 4px;
  }
`;
