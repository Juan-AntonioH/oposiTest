import React from 'react';
import { Pressable, Text, View } from 'react-native';

import { colors } from '@/core/theme';
import { styles } from '../../styles/exam.styles';
import { Opposition } from '../../types/opposition';

interface Props {
    opposition: Opposition;
    onPress: () => void;
}

export function OppositionCard({
    opposition,
    onPress,
}: Props) {

    return (
        <Pressable
            style={styles.card}
            android_ripple={{ color: '#E0E0E0' }}
            onPress={onPress}
        >
            <View
                style={[
                    styles.iconContainer,
                    {
                        backgroundColor: colors.primary,
                    },
                ]}
            >
                <Text
                    style={{
                        color: '#E0E0E0',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}
                >
                    {opposition.code}
                </Text>
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>
                    {opposition.name}
                </Text>

                <Text style={styles.cardSubtitle}>
                    {opposition.numBlocks} bloques
                </Text>
            </View>
        </Pressable>
    );
}