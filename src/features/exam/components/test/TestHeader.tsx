import React from 'react';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from '../../styles/exam.styles';

interface TestHeaderProps {
    // title: string;
    subtitle?: string;
    onExit: () => void;
}

export function TestHeader({
    // title,
    subtitle,
    onExit,
}: TestHeaderProps) {

    return (

        <View style={styles.headerContainer}>

            <View style={styles.headerTopRow}>

                <View style={{ flex: 1 }}>

                    {/* <Text style={styles.headerTitle}>
                        {title}
                    </Text> */}

                    {subtitle && (

                        <Text style={styles.headerSubtitle}>
                            {subtitle}
                        </Text>

                    )}

                </View>

                <Pressable
                    style={styles.closeButton}
                    onPress={onExit}
                >
                    <Text style={styles.closeButton}>
                        Finalizar Test
                    </Text>
                    {/* <MaterialCommunityIcons
                        name="close"
                        size={24}
                        color="#FFFFFF"
                    /> */}

                </Pressable>

            </View>

        </View>

    );

}