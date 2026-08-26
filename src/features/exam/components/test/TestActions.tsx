import React from 'react';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

import { testStyles } from '../../styles';

interface TestActionsProps {
    canAnswer: boolean;

    showNextButton: boolean;

    onAnswer: () => void;

    onLeaveBlank: () => void;

    onNext: () => void;
}

export function TestActions({
    canAnswer,
    showNextButton,
    onAnswer,
    onLeaveBlank,
    onNext,
}: TestActionsProps) {

    return (

        <View style={testStyles.actionsContainer}>

            {showNextButton ? (

                <Pressable
                    style={[
                        testStyles.primaryButton,
                        {
                            width: '100%',
                        },
                    ]}
                    onPress={onNext}
                >
                    <Text
                        style={
                            testStyles.primaryButtonText
                        }
                    >
                        Siguiente
                    </Text>
                </Pressable>

            ) : (

                <>

                    <Pressable
                        style={
                            canAnswer
                                ? testStyles.primaryButton
                                : testStyles.primaryButtonDisabled
                        }
                        disabled={!canAnswer}
                        onPress={onAnswer}
                    >
                        <Text
                            style={
                                testStyles.primaryButtonText
                            }
                        >
                            Confirmar respuesta
                        </Text>
                    </Pressable>

                    <Pressable
                        style={
                            testStyles.secondaryButton
                        }
                        onPress={onLeaveBlank}
                    >
                        <Text
                            style={
                                testStyles.secondaryButtonText
                            }
                        >
                            Dejar en blanco
                        </Text>
                    </Pressable>

                </>

            )}

        </View>

    );

}