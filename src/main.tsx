import ReactDOM from 'react-dom/client';
import { App, Comps } from './containers';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from './contexts';
import { EditingProvider } from './contexts/editing';

import './index.css';

import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/keybinding-vim';
import 'ace-builds/src-noconflict/keybinding-vscode';
import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/ext-keybinding_menu';
import 'ace-builds/src-noconflict/ext-elastic_tabstops_lite';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <EditingProvider>
      <BrowserRouter>
        <Routes>
          <Route path="comps" element={<Comps />} />
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </EditingProvider>
  </ThemeProvider>,
);
