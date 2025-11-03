import '@radix-ui/themes/styles.css';
import { OverlayCanvas } from './components/OverlayCanvas';
import SettingPanel from './components/SettingPanel';
import SettingContent from './components/SettingContent';

export default function App() {
  return (
    <div className="min-h-screen">
      <SettingPanel height={600} followMouse hotspotHeight={48}>
        <SettingContent />
      </SettingPanel>
      <OverlayCanvas />
    </div>
  );
}
