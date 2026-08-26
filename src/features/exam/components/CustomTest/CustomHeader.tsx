import React from 'react';

import {
    Pressable,
    Switch,
    Text,
    TextInput,
    View,
} from 'react-native';

import {
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons';

import { customStyles } from '../../styles';
import { colors } from '@/core/theme/colors';

interface CustomHeaderProps {

    questionCount: number;

    timeLimit: number;

    immediateSolution: boolean;

    autoTime: boolean;

    onQuestionCountChange: (
        value: number,
    ) => void;

    onTimeLimitChange: (
        value: number,
    ) => void;

    onImmediateSolutionChange: (
        value: boolean,
    ) => void;

}

export function CustomHeader({

    questionCount,
    timeLimit,
    immediateSolution,
    autoTime,

    onQuestionCountChange,
    onTimeLimitChange,
    onImmediateSolutionChange,

}: CustomHeaderProps) {

    return (

        <>

            {/* CONFIGURACIÓN */}

            <View style={customStyles.configSection}>

                <Text style={customStyles.configSectionTitle}>
                    Configuración del test
                </Text>

                {/* Nº PREGUNTAS */}

                <Text style={customStyles.configLabel}>
                    <MaterialCommunityIcons
                        name="format-list-numbered"
                        size={14}
                    />
                    {' '}Número de preguntas
                </Text>

                <View style={customStyles.numberInputContainer}>

                    <TextInput
                        style={customStyles.numberInput}
                        keyboardType="numeric"
                        value={String(questionCount)}
                        onChangeText={(text) =>
                            onQuestionCountChange(
                                Number(
                                    text.replace(
                                        /[^0-9]/g,
                                        '',
                                    ),
                                ),
                            )
                        }
                    />

                    <View style={customStyles.numberInputControls}>

                        <Pressable
                            onPress={() =>
                                onQuestionCountChange(
                                    questionCount + 1,
                                )
                            }
                            style={customStyles.numberInputButton}
                        >
                            <Ionicons
                                name="chevron-up"
                                size={16}
                                color="#64748B"
                            />
                        </Pressable>

                        <Pressable
                            onPress={() =>
                                onQuestionCountChange(
                                    questionCount - 1,
                                )
                            }
                            style={customStyles.numberInputButton}
                        >
                            <Ionicons
                                name="chevron-down"
                                size={16}
                                color="#64748B"
                            />
                        </Pressable>

                    </View>

                </View>
                {/* TIEMPO */}

                <Text
                    style={{
                        fontSize: 14,
                        color: '#64748B',
                        marginBottom: 6,
                    }}
                >
                    <Ionicons
                        name="time-outline"
                        size={14}
                    />
                    {' '}Tiempo (minutos)
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: '#CBD5E1',
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        height: 48,
                    }}
                >

                    <TextInput
                        style={{
                            flex: 1,
                            color: '#1E293B',
                            fontSize: 16,
                            fontWeight: '500',
                        }}
                        keyboardType="numeric"
                        value={String(timeLimit)}
                        onChangeText={(text) =>
                            onTimeLimitChange(
                                Number(
                                    text.replace(
                                        /[^0-9]/g,
                                        '',
                                    ),
                                ),
                            )
                        }
                    />

                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >

                        <Pressable
                            onPress={() =>
                                onTimeLimitChange(
                                    timeLimit + 1,
                                )
                            }
                            style={{
                                padding: 2,
                            }}
                        >
                            <Ionicons
                                name="chevron-up"
                                size={16}
                                color="#64748B"
                            />
                        </Pressable>

                        <Pressable
                            onPress={() =>
                                onTimeLimitChange(
                                    Math.max(
                                        1,
                                        timeLimit - 1,
                                    ),
                                )
                            }
                            style={{
                                padding: 2,
                            }}
                        >
                            <Ionicons
                                name="chevron-down"
                                size={16}
                                color="#64748B"
                            />
                        </Pressable>

                    </View>

                </View>

                <Text
                    style={{
                        fontSize: 12,
                        color: '#94A3B8',
                        marginTop: 6,
                    }}
                >
                    {
                        autoTime
                            ? `Tiempo recomendado: ${questionCount} minutos`
                            : `Tiempo personalizado: ${timeLimit} minutos`
                    }
                </Text>

            </View>

            {/* SOLUCIÓN INMEDIATA */}

            <View style={customStyles.solutionCard}>

                <View style={customStyles.solutionContent}>

                    <Ionicons
                        name={
                            immediateSolution
                                ? 'eye-outline'
                                : 'eye-off-outline'
                        }
                        size={20}
                        color={
                            immediateSolution
                                ? colors.primary
                                : colors.textSecondary
                        }
                        style={customStyles.solutionIcon}
                    />

                    <Text style={customStyles.solutionText}>
                        Mostrar solución inmediata
                    </Text>

                </View>

                <Switch
                    value={immediateSolution}
                    onValueChange={onImmediateSolutionChange}
                    trackColor={{
                        false: colors.border,
                        true: colors.primary,
                    }}
                    thumbColor={colors.white}
                />

            </View>

        </>

    );

}