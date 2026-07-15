import React from 'react';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

import { TestQuestion } from '../../types';

import { styles } from '../../styles/exam.styles';

interface QuestionCardProps {
    question: TestQuestion;

    selectedOption: number | null;

    showCorrection: boolean;

    onSelectOption?: (
        optionIndex: number,
    ) => void;
}

type OptionState =
    | 'default'
    | 'selected'
    | 'correct'
    | 'incorrect';

export function QuestionCard({
    question,
    selectedOption,
    showCorrection,
    onSelectOption,
}: QuestionCardProps) {

    const getOptionState = (
        index: number,
    ): OptionState => {

        if (!showCorrection) {

            return selectedOption === index
                ? 'selected'
                : 'default';

        }

        if (index === question.correctAnswer) {
            return 'correct';
        }

        if (
            selectedOption === index &&
            selectedOption !== question.correctAnswer
        ) {
            return 'incorrect';
        }

        return 'default';

    };

    const getOptionCardStyle = (
        state: OptionState,
    ) => {

        switch (state) {

            case 'selected':
                return styles.optionCardSelected;

            case 'correct':
                return styles.optionCardCorrect;

            case 'incorrect':
                return styles.optionCardIncorrect;

            default:
                return styles.optionCard;

        }

    };

    const getOptionCircleStyle = (
        state: OptionState,
    ) => {

        switch (state) {

            case 'selected':
                return styles.optionCircleSelected;

            case 'correct':
                return styles.optionCircleCorrect;

            case 'incorrect':
                return styles.optionCircleIncorrect;

            default:
                return styles.optionCircle;

        }

    };

    const getOptionTextStyle = (
        state: OptionState,
    ) => {

        switch (state) {

            case 'selected':
            case 'correct':
            case 'incorrect':
                return styles.optionTextSelected;

            default:
                return styles.optionText;

        }

    };

    return (

        <View style={styles.questionCard}>

            <Text style={styles.questionText}>
                {question.question}
            </Text>

            {question.options.map(
                (option, index) => {

                    const letter =
                        String.fromCharCode(
                            65 + index,
                        );

                    const optionState =
                        getOptionState(index);

                    return (

                        <Pressable
                            key={index}
                            style={getOptionCardStyle(optionState)}
                            disabled={showCorrection}
                            onPress={() =>
                                onSelectOption?.(index)
                            }
                        >

                            <View
                                style={getOptionCircleStyle(
                                    optionState,
                                )}
                            >
                                <Text
                                    style={getOptionTextStyle(
                                        optionState,
                                    )}
                                >
                                    {letter}
                                </Text>
                            </View>

                            <Text
                                style={[
                                    styles.optionLabel,
                                    getOptionTextStyle(
                                        optionState,
                                    ),
                                ]}
                            >
                                {option}
                            </Text>

                        </Pressable>

                    );

                },
            )}

        </View>

    );

}