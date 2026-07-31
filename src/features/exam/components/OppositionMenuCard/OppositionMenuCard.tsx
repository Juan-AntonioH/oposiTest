import React from 'react';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from '../../styles/exam.styles';
import { OppositionMenuItem } from '../../constants/oppositionMenu';

interface OppositionMenuCardProps {
    item: OppositionMenuItem;
    onPress: () => void;
}

export function OppositionMenuCard({
    item,
    onPress,
}: OppositionMenuCardProps) {

    return (
        <Pressable
            style={styles.card}
            android_ripple={{ color: '#E0E0E0' }}
            onPress={onPress}
        >
            <View
                style={[
                    styles.iconBox,
                    {
                        backgroundColor: item.color,
                    },
                ]}
            >
                <MaterialCommunityIcons
                    name={item.icon}
                    size={24}
                    color="#FFF"
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>
                    {item.title}
                </Text>

                <Text style={styles.cardSub}>
                    {item.subtitle}
                </Text>
            </View>
        </Pressable>
    );
}