import React from 'react';

import {
    View,
    Text,
    Pressable,
} from 'react-native';

import {
    MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
    styles,
} from '../../styles/exam.styles';

interface ReviewHeaderProps {

    currentIndex: number;

    totalQuestions: number;

    canGoPrev: boolean;

    canGoNext: boolean;

    onPrev: () => void;

    onNext: () => void;

    onBack: () => void;

}

export function ReviewHeader({

    currentIndex,

    totalQuestions,

    canGoPrev,

    canGoNext,

    onPrev,

    onNext,

    onBack,

}: ReviewHeaderProps) {

    return (

        <View style={styles.topControlBar}>

            <Pressable
                style={[
                    styles.navArrowButton,
                    !canGoPrev &&
                    styles.navArrowDisabled,
                ]}
                onPress={onPrev}
                disabled={!canGoPrev}
            >

                <MaterialCommunityIcons
                    name="chevron-left"
                    size={32}
                    color={
                        canGoPrev
                            ? '#2F70F2'
                            : '#CBD5E1'
                    }
                />

            </Pressable>

            <View style={styles.topButtonWrapper}>

                <Pressable
                    style={
                        styles.headerActionButton
                    }
                    onPress={onBack}
                >

                    <Text
                        style={
                            styles.headerActionText
                        }
                    >
                        Volver al resumen
                    </Text>

                </Pressable>

            </View>

            <Pressable
                style={[
                    styles.navArrowButton,
                    !canGoNext &&
                    styles.navArrowDisabled,
                ]}
                onPress={onNext}
                disabled={!canGoNext}
            >

                <MaterialCommunityIcons
                    name="chevron-right"
                    size={32}
                    color={
                        canGoNext
                            ? '#2F70F2'
                            : '#CBD5E1'
                    }
                />

            </Pressable>

        </View>

    );

}