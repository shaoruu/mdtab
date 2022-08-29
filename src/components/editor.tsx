import styled from 'styled-components';
import AceEditor from 'react-ace';

export const Editor = styled(AceEditor)`
  display: block;
  width: 100%;
  padding: 32px 10vw;
  min-height: 100vh;
  margin: 0 auto;
  outline: none;
  border: none;
  line-height: 1.4em;
  color: ${(p) => p.theme.darkest};
  background-color: ${(p) => p.theme.gray1};
  resize: none;

  & * {
    font-family: 'Source Code Pro', monospace;
  }

  ::selection {
    background: #b9b9b9;
    color: #000000;
  }

  ::-moz-selection {
    background: #b9b9b9;
    color: #000000;
  }

  ::-webkit-selection {
    background: #b9b9b9;
    color: #000000;
  }
`;
