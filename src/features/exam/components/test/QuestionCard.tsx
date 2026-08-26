import React from 'react';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

import { TestQuestion } from '../../types';
import { blockStyles, testStyles } from '../../styles/';

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
                return testStyles.optionCardSelected;

            case 'correct':
                return testStyles.optionCardCorrect;

            case 'incorrect':
                return testStyles.optionCardIncorrect;

            default:
                return testStyles.optionCard;

        }

    };

    const getOptionCircleStyle = (
        state: OptionState,
    ) => {

        switch (state) {

            case 'selected':
                return testStyles.optionCircleSelected;

            case 'correct':
                return testStyles.optionCircleCorrect;

            case 'incorrect':
                return testStyles.optionCircleIncorrect;

            default:
                return testStyles.optionCircle;

        }

    };

    const getOptionTextStyle = (
        state: OptionState,
    ) => {

        switch (state) {

            case 'selected':
            case 'correct':
            case 'incorrect':
                return testStyles.optionTextSelected;

            default:
                return testStyles.optionText;

        }

    };
    const getOptionLetterStyle = (
        state: OptionState,
    ) => {

        switch (state) {

            case 'selected':
            case 'correct':
            case 'incorrect':
                return blockStyles.optionLetterSelected;

            default:
                return blockStyles.optionLetter;

        }

    };
    return (

        <View style={testStyles.questionCard}>

            <Text style={testStyles.questionText}>
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
                                    style={getOptionLetterStyle(
                                        optionState,
                                    )}
                                >
                                    {letter}
                                </Text>
                            </View>

                            <Text
                                style={[
                                    testStyles.optionLabel,
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