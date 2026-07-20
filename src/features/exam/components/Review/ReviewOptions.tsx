import React from 'react';

import {
    Text,
    View,
} from 'react-native';

import {
    TestQuestion,
} from '../../types';

import {
    styles,
} from '../../styles/exam.styles';

interface ReviewOptionsProps {

    question: TestQuestion;

}

export function ReviewOptions({
    question,
}: ReviewOptionsProps) {

    return (

        <View style={styles.optionsWrapper}>

            {question.options.map((
                option,
                index,
            ) => {

                const isCorrectAnswer =
                    index ===
                    question.correctAnswer;

                const isUserResponse =
                    index ===
                    question.userResponse;

                const optionLetter =
                    String.fromCharCode(
                        65 + index,
                    );

                return (

                    <View
                        key={index}
                        style={[
                            styles.optionCardReview,
                            styles.optionCardNormal,

                            isCorrectAnswer &&
                            styles.optionCardCorrectReview,

                            isUserResponse &&
                            !isCorrectAnswer &&
                            styles.optionCardIncorrectReview,
                        ]}
                    >

                        <View
                            style={[
                                styles.letterBadge,
                                styles.badgeNormal,

                                isCorrectAnswer &&
                                styles.badgeCorrect,

                                isUserResponse &&
                                !isCorrectAnswer &&
                                styles.badgeIncorrect,
                            ]}
                        >

                            <Text
                                style={[
                                    styles.letterBadgeText,
                                    styles.badgeTextNormal,

                                    (
                                        isCorrectAnswer ||

                                        (
                                            isUserResponse &&
                                            !isCorrectAnswer
                                        )

                                    ) &&
                                    styles.badgeTextWhite,
                                ]}
                            >

                                {optionLetter}

                            </Text>

                        </View>

                        <Text
                            style={
                                styles.optionContentText
                            }
                        >

                            {option}

                        </Text>

                    </View>

                );

            })}

        </View>

    );

}