import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import { testStyles, blockStyles } from '../../styles/';

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

        <View style={blockStyles.progressCard}>

            <View style={blockStyles.progressHeader}>

                <Text style={testStyles.progressTitle}>
                    Pregunta {currentQuestion} de {totalQuestions}
                </Text>

                <View style={testStyles.timerBadge}>

                    <Text style={testStyles.timerText}>
                        ⏱ {formatTime(elapsedTime)}
                    </Text>

                </View>

            </View>

            <View style={testStyles.progressBarBackground}>

                <View
                    style={[
                        testStyles.progressBarFill,
                        {
                            width: `${progress * 100}%`,
                        },
                    ]}
                />

            </View>

        </View>

    );

}