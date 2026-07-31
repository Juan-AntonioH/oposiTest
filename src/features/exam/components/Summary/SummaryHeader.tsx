import React from 'react';

import {
    Text,
    View,
} from 'react-native';

import {
    MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
    CompletedTest,
} from '../../types';

import {
    styles,
} from '../../styles/exam.styles';

interface SummaryHeaderProps {

    summary: CompletedTest;

}

export function SummaryHeader({
    summary,
}: SummaryHeaderProps) {

    return (

        <View style={styles.headerContainer}>

            <View style={styles.titleRow}>

                <MaterialCommunityIcons
                    name="file-document-check-outline"
                    size={32}
                    color="#1C2434"
                />

                <Text style={styles.mainTitle}>
                    Resumen del examen
                </Text>

            </View>

            <Text style={styles.mainSubtitle}>
                {summary.oppositionName}
            </Text>

            <Text style={styles.examName}>
                {summary.examName}
            </Text>

        </View>

    );

}