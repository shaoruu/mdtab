import { STORAGE_KEY } from './keys';

export const saveContent = (content: string) => {
  if (chrome && chrome.storage) {
    chrome.storage.sync.set({ [STORAGE_KEY]: content });
    return;
  }

  localStorage.setItem(STORAGE_KEY, content);
};

const DEFAULT_CONTENT = `# [Markdown Tab](https://github.com/shaoruu/mdtab)

You can now write *quick* notes in Markdown on **any** new tabs!

## Features
- Markdown preview
- Syntax highlighting
- Vim mode
- Dark mode
- Math expressions ([katex](https://katex.org/))
- Save to local storage/browser sync

Press <kbd>ctrl/cmd</kbd> + <kbd>x</kbd> to edit this note!`;

export const retrieveContent = async () => {
  if (chrome && chrome.storage) {
    const original = (await chrome.storage.sync.get(STORAGE_KEY))[STORAGE_KEY];

    return original !== '' && !original ? DEFAULT_CONTENT : original;
  }

  const original = localStorage.getItem(STORAGE_KEY);

  return original !== '' && !original ? DEFAULT_CONTENT : original;
};
