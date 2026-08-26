
import React from 'react';

import {
    Text,
    TextInput,
    View,
} from 'react-native';

import {
    styles,
} from '../styles/questionForm.styles';

interface QuestionOptionsProps {

    options: string[];

    updateOption: (
        index: number,
        text: string,
    ) => void;

}

export function QuestionOptions({

    options,
    updateOption,

}: QuestionOptionsProps) {

    return (

        <View style={styles.container}>

            {options.map((option, index) => {

                const letter =
                    String.fromCharCode(
                        65 + index,
                    );

                return (

                    <View
                        key={index}
                        style={styles.optionContainer}
                    >

                        <View
                            style={styles.optionBadge}
                        >

                            <Text
                                style={
                                    styles.optionBadgeText
                                }
                            >
                                {letter}
                            </Text>

                        </View>

                        <TextInput
                            style={
                                styles.optionInput
                            }
                            value={option}
                            onChangeText={(text) =>
                                updateOption(
                                    index,
                                    text,
                                )
                            }
                            placeholder={
                                `Texto respuesta ${letter}`
                            }
                            multiline
                            numberOfLines={5}
                        />

                    </View>

                );

            })}

        </View>

    );

}