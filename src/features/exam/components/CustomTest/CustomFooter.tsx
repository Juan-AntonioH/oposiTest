import React from 'react';

import {
    Pressable,
    Text,
} from 'react-native';

import { customStyles } from '../../styles/customTest.styles';

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

                customStyles.startButton,

                !canStart &&
                customStyles.startButtonDisabled,

            ]}

            disabled={!canStart}

            onPress={onStartTest}

        >

            <Text style={customStyles.startButtonText}>

                Iniciar Test ({questionCount} preg. · {timeLimit} min)

            </Text>

        </Pressable>

    );

}