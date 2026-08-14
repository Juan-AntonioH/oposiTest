import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { testStyles } from '../../styles';

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

        <View style={testStyles.explanationCard}>

            <View style={testStyles.explanationHeader}>

                <MaterialCommunityIcons
                    name="lightbulb-on-outline"
                    size={22}
                    color="#2563EB"
                />

                <Text style={testStyles.explanationTitle}>
                    Explicación
                </Text>

            </View>

            <Text style={testStyles.explanationText}>
                {explanation}
            </Text>

        </View>

    );

}