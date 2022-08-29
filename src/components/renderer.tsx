import ReactMarkdown, { Options } from 'react-markdown';
import { HeadingComponent } from 'react-markdown/lib/ast-to-react';
import RehypeRaw from 'rehype-raw';
import RehypeKatex from 'rehype-katex';
import RemarkMath from 'remark-math';
import RemarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { Code } from './code';
import { H1, H2, H3, H4, H5, H6 } from './heading';
import { ListItem, OrderedList, UnorderedList } from './lists';
import { Anchor, BlockQuote, Paragraph } from './paragraph';
import { Image } from './image';
import { KBD } from './html';

const Content = styled(ReactMarkdown)`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 80vw;
  padding: 32px 0;
  margin: 0 auto;
`;

export const Renderer = (props: Options) => {
  return (
    <Content
      remarkPlugins={[RemarkGfm, RemarkMath]}
      rehypePlugins={[RehypeRaw, RehypeKatex]}
      components={{
        code: Code,
        h1: H1 as HeadingComponent,
        h2: H2 as HeadingComponent,
        h3: H3 as HeadingComponent,
        h4: H4 as HeadingComponent,
        h5: H5 as HeadingComponent,
        h6: H6 as HeadingComponent,
        a: Anchor as any,
        p: Paragraph as any,
        ol: OrderedList as any,
        ul: UnorderedList as any,
        li: ListItem as any,
        img: Image as any,
        kbd: KBD as any,
        blockquote: BlockQuote as any,
      }}
      {...props}
    />
  );
};
