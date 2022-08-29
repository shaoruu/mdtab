import { defineManifest } from '@crxjs/vite-plugin';
import packageJson from './package.json';
const { version } = packageJson;

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: env.mode === 'staging' ? '[INTERNAL] MDTab' : 'MDTab',
  description: 'Write quick notes in Markdown on any new tabs!',
  icons: {
    16: 'public/mdtab_16x16.png',
    32: 'public/mdtab_32x32.png',
    48: 'public/mdtab_48x48.png',
    128: 'public/mdtab_128x128.png',
  },
  version: version,
  version_name: version,
  permissions: ['storage'],
  chrome_url_overrides: {
    newtab: 'index.html',
  },
}));
