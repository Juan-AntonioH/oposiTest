import React from 'react';

import {
    Pressable,
    Text,
} from 'react-native';

import { styles } from '../../styles/customTest.styles';

interface CustomFooterProps {

    questionCount: number;

    timeLimit: number;

    canStart: boolean;

    onStartTest: () => void;

}

export function CustomFooter({

    questionCount,

    timeLimit,

    canStart,

    onStartTest,

}: CustomFooterProps) {

    return (

        <Pressable

            style={[

                styles.startButton,

                !canStart &&
                styles.startButtonDisabled,

            ]}

            disabled={!canStart}

            onPress={onStartTest}

        >

            <Text style={styles.startButtonText}>

                Iniciar Test ({questionCount} preg. · {timeLimit} min)

            </Text>

        </Pressable>

    );

}