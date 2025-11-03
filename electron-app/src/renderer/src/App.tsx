import '@radix-ui/themes/styles.css';
import { OverlayCanvas } from './components/OverlayCanvas';
import SettingPanel from './components/SettingPanel';
import SettingContent from './components/SettingContent';
import { useState } from 'react';

export default function App() {
  const [focused, setFocused] = useState(true);

  return (
    <div className="min-h-screen min-w-screen">
      <SettingPanel open={focused} setOpen={setFocused} height={600}>
        <SettingContent />
      </SettingPanel>
      <OverlayCanvas focused={focused} />
    </div>
  );
}
