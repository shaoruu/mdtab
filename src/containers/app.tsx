import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CURSOR_KEY } from '../core';
import { Editor, KBD, Promotion, Renderer, Settings } from '../components';
import ReactAce from 'react-ace';
import { useStorage } from '../hooks';
import { useEditing } from '../contexts/editing';
import { useTheme } from '../contexts';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${(p) => p.theme.gray1};
`;

const Empty = styled.p`
  max-width: 80vw;
  padding: 32px 0;
  margin: 0 auto;
  color: ${(p) => p.theme.light};
  font-size: 1.2em;

  & kbd {
    color: ${(p) => p.theme.base};
  }
`;

export const App = () => {
  const { editing, setContent, content, vimOn } = useEditing();
  const [cursor, setCursor] = useStorage<{ row: number; column: number }>(
    CURSOR_KEY,
    { row: 0, column: 0 },
  );
  const editorRef = useRef<ReactAce>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (editorRef.current && editing) {
      editorRef.current.editor.focus();
      editorRef.current.editor.moveCursorTo(cursor.row, cursor.column);
    }
  }, [editorRef, editing]);

  return (
    <Wrapper>
      <Settings />
      {editing ? (
        <Editor
          mode="markdown"
          name="MDTAB-EDITOR"
          theme={theme.name === 'dark' ? 'dracula' : 'tomorrow'}
          style={{ padding: 32 }}
          onChange={(newValue) => {
            setContent(newValue);
          }}
          onSelectionChange={() => {
            if (editorRef.current)
              setCursor(editorRef.current.editor.getCursorPosition());
          }}
          width="80vw"
          fontSize="1.2em"
          ref={editorRef}
          value={content}
          keyboardHandler={vimOn ? 'vim' : 'vscode'}
          placeholder={`Type something like "# hi" and press ⌘ + S to save.`}
          setOptions={{
            wrap: true,
            fontFamily: `'Source Code Pro', monospace`,
            showGutter: false,
            showPrintMargin: false,
            useSoftTabs: true,
          }}
        />
      ) : content ? (
        <Renderer>{content}</Renderer>
      ) : (
        <Empty>
          Press <KBD>ctrl/cmd</KBD> + <KBD>x</KBD> to enter edit mode.
        </Empty>
      )}
      <Promotion />
    </Wrapper>
  );
};
