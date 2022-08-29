import { CodeComponent } from 'react-markdown/lib/ast-to-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';

const Content = styled(SyntaxHighlighter)`
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const Inline = styled.code`
  padding: 0.1em 0.2em;
  color: #e64848;
  background: rgba(175, 184, 193, 0.2);
  border-radius: 6px;
`;

export const Code: CodeComponent = ({
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || '');

  return !inline && match ? (
    <Content
      children={String(children).replace(/\n$/, '')}
      style={coldarkDark as any}
      language={match[1]}
      {...props}
    />
  ) : (
    <Inline className={className} {...props}>
      {children}
    </Inline>
  );
};
