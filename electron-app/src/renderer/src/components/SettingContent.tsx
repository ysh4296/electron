import { useEffect, useState } from 'react';
import { Box, Flex, Text, RadioGroup, Kbd } from '@radix-ui/themes';
import * as Tooltip from '@radix-ui/react-tooltip';
import { GuideColor, GuideSize } from './SettingPanel';


export default function SettingContent() {
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

    // ✅ 앱 시작 시 저장된 설정 불러오기
    useEffect(() => {
        const load = async () => {
            try {
                const s = await window.customAPI?.get()
                if (s) {
                    setGuideSize(s.guideSize)
                    setGuideColor(s.guideColor)
                }
            } catch (e) {
                console.error('load settings error', e)
            }
        }
        load()
    }, [])

    // ✅ 변경될 때마다 저장
    useEffect(() => {
        window.customAPI?.save({ guideSize, guideColor })
    }, [guideSize, guideColor])

    const sizeMap: Record<GuideSize, number> = { small: 1, medium: 2, large: 4 };
    const colorHex: Record<GuideColor, string> = {
        red: '#ef4444',
        orange: '#f97316',
        yellow: '#fbbf24',
        green: '#22c55e',
        blue: '#3b82f6'
    };

    return (
        <Flex
            direction="column"
            width="fit-content"
            gap="5"
            p="4"
            style={{ backgroundColor: `rgba(200,200,200)` }}
        >
            {/* 단축키 안내 */}
            <Flex direction="column" gap="1">
                <Text weight="bold" size="3">
                    키 안내
                </Text>
                <Text color="gray" size="2">
                    <Kbd>Esc</Kbd> 종료
                </Text>
                <Text color="gray" size="2">
                    <Kbd>F1</Kbd> 설정창 토글
                </Text>
            </Flex>

            {/* 보조선 크기 */}
            <Flex direction="column" gap="1">
                <Text weight="bold" size="3">
                    보조선 크기
                </Text>

                <RadioGroup.Root value={guideSize} onValueChange={(v) => setGuideSize(v as GuideSize)}>
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
                    보조선 색상
                </Text>

                <Tooltip.Provider delayDuration={200}>
                    <Flex gap="3" align="center">
                        {(['red', 'orange', 'yellow', 'green', 'blue'] as GuideColor[]).map((c) => (
                            <Tooltip.Root key={c}>
                                <Tooltip.Trigger asChild>
                                    <Box
                                        onClick={() => setGuideColor(c)}
                                        style={{
                                            width: 36,
                                            height: 36,
                                            borderRadius: '50%',
                                            backgroundColor: colorHex[c],
                                            border: guideColor === c ? '3px solid white' : '2px solid #404040',
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
                                        {c}
                                        <Tooltip.Arrow width={8} height={4} fill="rgba(20,20,20,0.9)" />
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        ))}
                    </Flex>
                </Tooltip.Provider>
            </Flex>
        </Flex>
    );
}
