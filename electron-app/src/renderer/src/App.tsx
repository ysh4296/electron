import '@radix-ui/themes/styles.css';
import { OverlayCanvas } from './components/OverlayCanvas';
import SettingPanel from './components/SettingPanel';
import SettingContent from './components/SettingContent';
import { useEffect, useState } from 'react';
import i18n from './locales/i18n';
import './locales/i18n';

export type GuideSize = 'small' | 'medium' | 'large';
export type GuideColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue';

declare global {
  interface Window {
    customAPI?: {
      onToggleSettings?: (cb: () => void) => void;
      onToggleOverlay?: (cb: () => void) => void;
      get: () => Promise<{
        guideSize?: GuideSize;
        guideColor?: GuideColor;
        language?: string;
      }>;
      save: (settings: {
        guideSize?: GuideSize;
        guideColor?: GuideColor;
        language?: string;
      }) => void;
    };
  }
}

export default function App() {
  const [focused, setFocused] = useState(true);

  const [guideSize, setGuideSize] = useState<GuideSize>(() => {
    try {
      return (localStorage.getItem('guideSize') as GuideSize) ?? 'medium';
    } catch {
      return 'medium';
    }
  });

  const [guideColor, setGuideColor] = useState<GuideColor>(() => {
    try {
      return (localStorage.getItem('guideColor') as GuideColor) ?? 'yellow';
    } catch {
      return 'yellow';
    }
  });

  // const [language, setLanguage] = useState<string>(() => {
  //   try {
  //     return localStorage.getItem('language') ?? 'en';
  //   } catch {
  //     return 'en';
  //   }
  // });

  useEffect(() => {
    const load = async () => {
      try {
        const s = await window.customAPI?.get();
        if (s) {
          setGuideSize(s.guideSize ?? 'medium');
          setGuideColor(s.guideColor ?? 'yellow');
          // setLanguage(s.language ?? 'en');
          i18n.changeLanguage(s.language ?? 'en');
        }
      } catch (e) {
        console.error('load settings error', e);
      }
    };
    load();
  }, []);

  // ✅ 변경될 때마다 저장
  useEffect(() => {
    window.customAPI?.save({
      guideSize,
      guideColor
    });
  }, [guideSize, guideColor]);

  return (
    <div className="min-h-screen min-w-screen">
      <SettingPanel open={focused} setOpen={setFocused} height={600}>
        <SettingContent
          guideSize={guideSize}
          setGuideSize={setGuideSize}
          guideColor={guideColor}
          setGuideColor={setGuideColor}
        />
      </SettingPanel>
      <OverlayCanvas
        focused={focused}
        guideSize={guideSize}
        guideColor={guideColor}
      />
    </div>
  );
}
