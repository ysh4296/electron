import { Theme } from '@radix-ui/themes/dist/cjs/components/index.js'
import './assets/global.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme appearance="dark" accentColor="indigo" grayColor="slate" hasBackground={false}>
      <App />
    </Theme>
  </StrictMode>
)
