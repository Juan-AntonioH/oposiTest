import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import { styles } from '../../styles/exam.styles';

interface TestProgressCardProps {
    currentQuestion: number;
    totalQuestions: number;
    elapsedTime: number;
}

export function TestProgressCard({
    currentQuestion,
    totalQuestions,
    elapsedTime,
}: TestProgressCardProps) {

    const formatTime = (
        totalSeconds: number,
    ) => {

        const hours = Math.floor(
            totalSeconds / 3600,
        );

        const minutes = Math.floor(
            (totalSeconds % 3600) / 60,
        );

        const seconds =
            totalSeconds % 60;

        if (hours > 0) {

            return `${hours}:${minutes
                .toString()
                .padStart(2, '0')}:${seconds
                    .toString()
                    .padStart(2, '0')}`;

        }

        return `${minutes
            .toString()
            .padStart(2, '0')}:${seconds
                .toString()
                .padStart(2, '0')}`;

    };

    const progress =
        totalQuestions === 0
            ? 0
            : currentQuestion / totalQuestions;

    return (

        <View style={styles.progressCard}>

            <View style={styles.progressHeader}>

                <Text style={styles.progressTitle}>
                    Pregunta {currentQuestion} de {totalQuestions}
                </Text>

                <Text style={styles.timerText}>
                    {formatTime(elapsedTime)}
                </Text>

            </View>

            <View style={styles.progressBarBackground}>

                <View
                    style={[
                        styles.progressBarFill,
                        {
                            width: `${progress * 100}%`,
                        },
                    ]}
                />

            </View>

        </View>

    );

}