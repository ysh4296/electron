import React, { useEffect, useState } from 'react';
import { Theme, Box, Flex, Text, Card, RadioGroup } from '@radix-ui/themes';
import * as Tooltip from '@radix-ui/react-tooltip';

type GuideSize = 'small' | 'medium' | 'large';
type GuideColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue';

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

    useEffect(() => {
        try {
            localStorage.setItem('guideSize', guideSize);
        } catch { }
    }, [guideSize]);

    useEffect(() => {
        try {
            localStorage.setItem('guideColor', guideColor);
        } catch { }
    }, [guideColor]);

    const sizeMap: Record<GuideSize, number> = { small: 1, medium: 2, large: 4 };
    const colorHex: Record<GuideColor, string> = {
        red: '#ef4444',
        orange: '#f97316',
        yellow: '#fbbf24',
        green: '#22c55e',
        blue: '#3b82f6'
    };

    return (
        <Flex direction="column" gap="5" p="4" style={{ backgroundColor: `rgba(200,200,200)` }}>
            {/* 단축키 안내 */}
            <Box>
                <Text weight="medium" size="3">
                    키 안내
                </Text>
                <Text color="gray" size="2">
                    Esc: 종료 (앱 종료 요청 전송) · F1: 오버레이 열기/닫기
                </Text>
            </Box>

            {/* 보조선 크기 */}
            <Box>
                <Text weight="medium" size="3">
                    보조선 크기
                </Text>
                <Text color="gray" size="2" mb="2">
                    Small / Medium / Large
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
            </Box>

            {/* 보조선 색상 */}
            <Box>
                <Text weight="medium" size="3">
                    보조선 색상
                </Text>
                <Text color="gray" size="2" mb="2">
                    빨강, 주황, 노랑(기본), 초록, 파랑
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
            </Box>

            {/* 미리보기 */}
            <Box>
                <Text weight="medium" size="3">
                    미리보기
                </Text>
                <Card mt="2" style={{ backgroundColor: '#1e1e1e' }}>
                    <Box
                        position="relative"
                        height="80px"
                        style={{ borderRadius: 8, background: '#0a0a0a80' }}
                    >
                        <Box
                            position="absolute"
                            style={{
                                left: 0,
                                right: 0,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                height: `${sizeMap[guideSize]}px`,
                                backgroundColor: colorHex[guideColor]
                            }}
                        />
                    </Box>
                </Card>
            </Box>
        </Flex>
    );
}
