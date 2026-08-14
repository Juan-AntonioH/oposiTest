import React from 'react';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

import { testStyles, styles, blockStyles } from '../../styles';

interface TestHeaderProps {
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

            <View style={blockStyles.headerTopRow}>

                <View style={{ flex: 1 }}>

                    {subtitle && (

                        <Text style={blockStyles.headerSubtitle}>
                            {subtitle}
                        </Text>

                    )}

                </View>

                <Pressable
                    style={blockStyles.closeButton}
                    onPress={onExit}
                >
                    <Text style={blockStyles.closeButton}>
                        Finalizar Test
                    </Text>

                </Pressable>

            </View>

        </View>

    );

}