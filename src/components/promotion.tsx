import styled from 'styled-components';
import { Anchor } from './paragraph';

const Wrapper = styled.div`
  position: fixed;
  z-index: 10000;
  bottom: 0;
  right: 0;
  color: ${(p) => p.theme.light};
  background-color: ${(p) => p.theme.gray1};
  padding: 8px;
  border-radius: 6px;
`;

export const Promotion = () => {
  return (
    <Wrapper>
      Built with ♥ by{' '}
      <Anchor href="https://github.com/shaoruu" target="_blank">
        @shaoruu
      </Anchor>
    </Wrapper>
  );
};
