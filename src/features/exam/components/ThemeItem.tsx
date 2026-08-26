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
import { blockStyles } from '../styles/examBlock.styles';

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

                blockStyles.blockRowCard,

                selected &&
                blockStyles.blockRowCardSelected,

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
                    blockStyles.blockGridIconBox
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
                        blockStyles.blockRowTitle
                    }
                >

                    Tema {theme.order}

                </Text>

                <Text
                    style={
                        blockStyles.blockRowSub
                    }
                >

                    {theme.questionCount} preguntas

                </Text>

            </View>

        </Pressable>

    );

}