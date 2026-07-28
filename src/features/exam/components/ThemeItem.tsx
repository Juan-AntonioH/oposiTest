import React from 'react';

import {
    Pressable,
    Text,
    View,
} from 'react-native';

import {
    MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
    ThemeWithCount,
} from '../types';

import {
    styles,
} from '../styles/exam.styles';

interface ThemeItemProps {

    theme: ThemeWithCount;

    selected: boolean;

    onPress: () => void;

}

export function ThemeItem({

    theme,

    selected,

    onPress,

}: ThemeItemProps) {

    return (

        <Pressable

            style={[

                styles.blockRowCard,

                selected &&
                styles.blockRowCardSelected,

                {
                    marginVertical: 6,
                },

            ]}

            onPress={() =>
                onPress()
            }

        >

            <MaterialCommunityIcons

                name={
                    selected
                        ? 'checkbox-marked'
                        : 'checkbox-blank-outline'
                }

                size={24}

                color={
                    selected
                        ? '#2F70F2'
                        : '#CBD5E1'
                }

                style={{
                    marginRight: 12,
                }}

            />

            <View
                style={
                    styles.blockGridIconBox
                }
            >

                <MaterialCommunityIcons

                    name="format-list-bulleted"

                    size={22}

                    color="#64748B"

                />

            </View>

            <View
                style={{
                    flex: 1,
                }}
            >

                <Text
                    style={
                        styles.blockRowTitle
                    }
                >

                    Tema {theme.order}

                </Text>

                <Text
                    style={
                        styles.blockRowSub
                    }
                >

                    {theme.questionCount} preguntas

                </Text>

            </View>

        </Pressable>

    );

}