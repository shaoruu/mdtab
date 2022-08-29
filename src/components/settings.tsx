import styled from 'styled-components';
import { SiVim } from 'react-icons/si';
import { FiSettings, FiTrash2, FiSave, FiSun, FiMoon } from 'react-icons/fi';
import { FaPen } from 'react-icons/fa';
import { useTheme } from '../contexts';
import { useStorage } from '../hooks';
import { OPEN_KEY } from '../core';
import { useEffect, useRef } from 'react';
import { useEditing } from '../contexts/editing';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 32px 16px;
  z-index: 10000000000;
`;

const Toggle = styled.button`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.3rem;
  color: ${(p) => p.theme.light};
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease, color 0.2s ease;
  outline: none;

  &::before {
    content: attr(data-tooltip);
    position: absolute;
    left: 100%;
    font-size: 0.6em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    z-index: 1000000;
    padding: 4px 8px;
    min-width: 300px;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    background: ${(p) => p.theme.gray3}55;
    color: ${(p) => p.theme.dark};
  }
`;

const Controls = styled.div`
  transition: all 0.2s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin-bottom: 0.5em;
`;

const Spacer = styled.div`
  margin: 24px auto;
`;

export const Settings = () => {
  const [open, setOpen] = useStorage(OPEN_KEY, true);
  const { editing, setEditing, setVimOn, vimOn, setContent } = useEditing();
  const { toggle, theme } = useTheme();
  const vimRef = useRef<any>(null);

  useEffect(() => {
    if (!editing) {
      vimRef.current;
    }
  }, [editing]);

  return (
    <Wrapper>
      <Controls
        style={{
          opacity: open ? 1 : 0,
        }}
      >
        {editing && (
          <>
            <Toggle onClick={() => setContent('')} data-tooltip="Clear content">
              <FiTrash2 />
            </Toggle>
            <Toggle
              onClick={() => setVimOn(!vimOn)}
              data-tooltip={`Vim is ${vimOn ? 'ON' : 'OFF'}`}
            >
              <SiVim />
            </Toggle>
          </>
        )}
        <Spacer />
        <Toggle onClick={toggle} data-tooltip={`Using ${theme.name} mode`}>
          {theme.name === 'dark' ? <FiMoon /> : <FiSun />}
        </Toggle>
        {editing ? (
          <Toggle
            onClick={() => setEditing(false)}
            data-tooltip="Save document (⌘S)"
          >
            <FiSave />
          </Toggle>
        ) : (
          <Toggle
            onClick={() => setEditing(true)}
            data-tooltip="Edit document (⌘X)"
          >
            <FaPen />
          </Toggle>
        )}
      </Controls>

      <Toggle onClick={() => setOpen(!open)} data-tooltip="Toggle settings">
        <FiSettings />
      </Toggle>
    </Wrapper>
  );
};
