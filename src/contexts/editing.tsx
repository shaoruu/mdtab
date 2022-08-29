import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { retrieveContent, saveContent, VIM_KEY } from '../core';
import { useStorage } from '../hooks';

export const EditingContext = createContext<{
  editing: boolean;
  setEditing: (val: boolean) => void;
  content: string;
  setContent: (val: string) => void;
  vimOn: boolean;
  setVimOn: (val: boolean) => void;
}>({} as any);

export const EditingProvider = ({
  children,
  ...others
}: {
  children: ReactNode;
}) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState('');
  const [vimOn, setVimOn] = useStorage(VIM_KEY, false);

  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;

      if (e.key === 'x') {
        setEditing(true);
      } else if (e.key === 's') {
        setEditing(false);
        saveContent(content);
      } else {
        return;
      }

      e.preventDefault();
    };

    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };
  }, [editing, content]);

  useEffect(() => {
    const load = async () => {
      const prev = await retrieveContent();
      setContent(prev || '');
    };

    load();
  }, []);

  return (
    <EditingContext.Provider
      value={{ editing, setEditing, content, setContent, vimOn, setVimOn }}
      {...others}
    >
      {children}
    </EditingContext.Provider>
  );
};

export const useEditing = () => useContext(EditingContext);
