import {
  Box,
  Flex,
  Text,
  RadioGroup,
  Kbd,
  Button,
  Slider
} from '@radix-ui/themes';
import * as Tooltip from '@radix-ui/react-tooltip';
import { GuideColor, GuideSize } from '@renderer/App';
import { useTranslation } from 'react-i18next';
import i18n from '@renderer/locales/i18n';
import { useState } from 'react';

const colorHex: Record<GuideColor, string> = {
  red: '#ef4444',
  orange: '#f97316',
  yellow: '#fbbf24',
  green: '#22c55e',
  blue: '#3b82f6'
};

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'ru', label: 'Русский' },
  { code: 'pt', label: 'Português' }
];

export default function SettingContent({
  guideSize,
  setGuideSize,
  guideColor,
  setGuideColor,
  guideOpacity,
  setGuideOpacity,
  guideType,
  setGuideType
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  return (
    <Flex
      direction="column"
      width="fit-content"
      gap="5"
      p="4"
      style={{
        backgroundColor: `rgba(200,200,200)`
      }}
    >
      {/* 단축키 안내 */}
      <Flex direction="column" gap="1">
        <Flex justify="between" align="center">
          <Text weight="bold" size="3">
            {t('키 안내')}
          </Text>

          <Box style={{ position: 'relative', width: 'fit-content' }}>
            <Button variant="soft" size="2" onClick={() => setOpen(!open)}>
              🌐 <Text ml="2">{i18n.language.toUpperCase()}</Text>
            </Button>

            {open && (
              <Box
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  background: 'rgba(240,240,240,0.95)',
                  borderRadius: 6,
                  padding: 6,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                  zIndex: 9999
                }}
              >
                <Flex direction="column" gap="1">
                  {languages.map((lang) => (
                    <Box
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setOpen(false);
                      }}
                      style={{
                        cursor: 'pointer',
                        padding: '4px 8px',
                        borderRadius: 4,
                        backgroundColor:
                          i18n.language === lang.code
                            ? 'rgba(100,100,100,0.1)'
                            : 'transparent'
                      }}
                    >
                      <Text size="2">{lang.label}</Text>
                    </Box>
                  ))}
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
        <Text color="gray" size="2">
          <Kbd>F1</Kbd> {t('종료')}
        </Text>
        <Text color="gray" size="2">
          <Kbd>F2</Kbd> {t('설정창 켜기/끄기')}
        </Text>
        <Text color="gray" size="2">
          <Kbd>F3</Kbd> {t('오버레이 켜기/끄기')}
        </Text>
      </Flex>

      {/* 보조선 종류 (드롭다운) */}
      <Flex direction="column" gap="1" width="100%">
        <Text weight="bold" size="3">
          {t('보조선 종류')}
        </Text>

        <Box style={{ position: 'relative', width: 'fit-content' }}>
          <Button
            variant="soft"
            size="2"
            onClick={() => setTypeOpen(!typeOpen)}
          >
            <Text style={{ textTransform: 'capitalize' }}>{guideType}</Text>
            <Text ml="2" size="2">
              {typeOpen ? '▲' : '▼'}
            </Text>
          </Button>

          {typeOpen && (
            <Box
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                background: 'rgba(240,240,240,0.95)',
                borderRadius: 6,
                padding: 6,
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                zIndex: 9999,
                minWidth: 140
              }}
            >
              <Flex direction="column" gap="1">
                {[
                  { code: 'basic', label: 'Basic' },
                  { code: 'crossHair', label: 'Crosshair' },
                  { code: 'cross', label: 'Cross' },
                  { code: 'grid', label: 'Grid' },
                  { code: 'hexRing', label: 'Hex Ring' },
                  { code: 'perimeterFrame', label: 'Frame' },
                  { code: 'tripleHorizon', label: 'Triple Horizon' },
                  { code: 'columnFocus', label: 'Columns' }
                ].map((item) => (
                  <Box
                    key={item.code}
                    onClick={() => {
                      setGuideType(item.code);
                      setTypeOpen(false);
                    }}
                    style={{
                      cursor: 'pointer',
                      padding: '6px 10px',
                      borderRadius: 4,
                      backgroundColor:
                        guideType === item.code
                          ? 'rgba(100,100,100,0.1)'
                          : 'transparent'
                    }}
                  >
                    <Text size="2">{item.label}</Text>
                  </Box>
                ))}
              </Flex>
            </Box>
          )}
        </Box>
      </Flex>

      {/* 보조선 크기 */}
      <Flex direction="column" gap="1">
        <Text weight="bold" size="3">
          {t('보조선 크기')}
        </Text>

        <RadioGroup.Root
          value={guideSize}
          onValueChange={(v) => setGuideSize(v as GuideSize)}
        >
          <Flex gap="2">
            {(['small', 'medium', 'large'] as GuideSize[]).map((s) => (
              <RadioGroup.Item key={s} value={s}>
                <Text size="2" weight={guideSize === s ? 'medium' : 'regular'}>
                  {s[0].toUpperCase() + s.slice(1)}
                </Text>
              </RadioGroup.Item>
            ))}
          </Flex>
        </RadioGroup.Root>
      </Flex>

      {/* 보조선 색상 */}
      <Flex direction="column" gap="1">
        <Text weight="bold" size="3">
          {t('보조선 색상')}
        </Text>

        <Tooltip.Provider delayDuration={200}>
          <Flex gap="3" align="center">
            {(['red', 'orange', 'yellow', 'green', 'blue'] as GuideColor[]).map(
              (color) => (
                <Tooltip.Root key={color}>
                  <Tooltip.Trigger asChild>
                    <Box
                      onClick={() => setGuideColor(color as GuideColor)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: colorHex[color as GuideColor],
                        border:
                          guideColor === color
                            ? '3px solid white'
                            : '2px solid #404040',
                        cursor: 'pointer'
                      }}
                    />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      sideOffset={6}
                      style={{
                        backgroundColor: 'rgba(20,20,20,0.9)',
                        color: 'white',
                        borderRadius: 6,
                        padding: '4px 8px',
                        fontSize: 12,
                        userSelect: 'none'
                      }}
                    >
                      {color}
                      <Tooltip.Arrow
                        width={8}
                        height={4}
                        fill="rgba(20,20,20,0.9)"
                      />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              )
            )}
          </Flex>
        </Tooltip.Provider>
      </Flex>
      {/* 보조선 투명도 */}
      <Flex direction="column" gap="1" width="100%">
        <Text weight="bold" size="3">
          {t('보조선 투명도')}
        </Text>

        <Flex align="center" gap="3">
          <Slider
            value={[Math.round((guideOpacity ?? 1) * 100)]}
            min={0}
            max={100}
            step={1}
            onValueChange={(val) => {
              const v = val[0] ?? 100;
              setGuideOpacity(v / 100);
            }}
          />

          <Text size="2" style={{ minWidth: 40 }}>
            {Math.round((guideOpacity ?? 1) * 100)}%
          </Text>
        </Flex>
      </Flex>
      {/* 언어 변경 */}
      <Flex direction="column" gap="1"></Flex>
    </Flex>
  );
}
