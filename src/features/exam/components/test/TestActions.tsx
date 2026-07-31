import React from 'react';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

import { styles } from '../../styles/exam.styles';

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

        <View style={styles.actionsContainer}>

            {showNextButton ? (

                <Pressable
                    style={[
                        styles.primaryButton,
                        {
                            width: '100%',
                        },
                    ]}
                    onPress={onNext}
                >
                    <Text
                        style={
                            styles.primaryButtonText
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
                                ? styles.primaryButton
                                : styles.primaryButtonDisabled
                        }
                        disabled={!canAnswer}
                        onPress={onAnswer}
                    >
                        <Text
                            style={
                                styles.primaryButtonText
                            }
                        >
                            Confirmar respuesta
                        </Text>
                    </Pressable>

                    <Pressable
                        style={
                            styles.secondaryButton
                        }
                        onPress={onLeaveBlank}
                    >
                        <Text
                            style={
                                styles.secondaryButtonText
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