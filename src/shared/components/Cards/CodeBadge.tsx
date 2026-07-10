import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './card.styles';

interface CodeBadgeProps {
    code: string;
}

export function CodeBadge({
    code,
}: CodeBadgeProps) {

    return (

        <View style={styles.badge}>

            <Text style={styles.badgeText}>
                {code}
            </Text>

        </View>

    );

}