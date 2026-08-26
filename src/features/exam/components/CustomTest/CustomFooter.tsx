import React from 'react';

import {
    ActivityIndicator,
    Pressable,
    Text,
} from 'react-native';

import { customStyles } from '../../styles/customTest.styles';

interface CustomFooterProps {

    questionCount: number;

    timeLimit: number;

    canStart: boolean;

    isPreparingExam: boolean;

    onStartTest: () => void;

}

export function CustomFooter({

    questionCount,

    timeLimit,

    canStart,

    isPreparingExam,

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

            {isPreparingExam ? (

                <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                />

            ) : (

                <Text style={customStyles.startButtonText}>

                    Iniciar Test ({questionCount} preg. · {timeLimit} min)

                </Text>

            )}

        </Pressable>

    );

}