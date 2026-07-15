import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { styles } from '../../styles/exam.styles';

interface ExplanationCardProps {
    explanation?: string;
}

export function ExplanationCard({
    explanation,
}: ExplanationCardProps) {

    if (!explanation) {
        return null;
    }

    return (

        <View style={styles.explanationCard}>

            <View style={styles.explanationHeader}>

                <MaterialCommunityIcons
                    name="lightbulb-on-outline"
                    size={22}
                    color="#2563EB"
                />

                <Text style={styles.explanationTitle}>
                    Explicación
                </Text>

            </View>

            <Text style={styles.explanationText}>
                {explanation}
            </Text>

        </View>

    );

}