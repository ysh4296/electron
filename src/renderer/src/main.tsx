import { Theme } from '@radix-ui/themes/dist/cjs/components/index.js';
import './assets/global.css';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <Theme accentColor="indigo" grayColor="slate" hasBackground={false}>
    <App />
  </Theme>
);
