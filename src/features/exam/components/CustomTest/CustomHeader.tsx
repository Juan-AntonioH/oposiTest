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

            <View

                style={{

                    backgroundColor: '#FFFFFF',

                    padding: 16,

                    borderRadius: 12,

                    marginBottom: 16,

                    borderWidth: 1,

                    borderColor: '#E2E8F0',

                }}

            >

                <Text

                    style={{

                        fontSize: 16,

                        fontWeight: '700',

                        color: '#1E293B',

                        marginBottom: 16,

                    }}

                >

                    Configuración del test

                </Text>

                {/* Nº PREGUNTAS */}

                <Text

                    style={{

                        fontSize: 14,

                        color: '#64748B',

                        marginBottom: 6,

                    }}

                >

                    <MaterialCommunityIcons

                        name="format-list-numbered"

                        size={14}

                    />

                    {' '}Número de preguntas

                </Text>

                <View

                    style={{

                        flexDirection: 'row',

                        alignItems: 'center',

                        borderWidth: 1,

                        borderColor: '#CBD5E1',

                        borderRadius: 8,

                        marginBottom: 14,

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

                    <View

                        style={{

                            flexDirection: 'column',

                            justifyContent: 'center',

                            height: '100%',

                        }}

                    >

                        <Pressable

                            onPress={() =>

                                onQuestionCountChange(

                                    questionCount + 1,

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

                                onQuestionCountChange(

                                    questionCount - 1,

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

            <View

                style={{

                    backgroundColor: '#FFFFFF',

                    padding: 14,

                    borderRadius: 12,

                    marginBottom: 16,

                    flexDirection: 'row',

                    alignItems: 'center',

                    justifyContent: 'space-between',

                    borderWidth: 1,

                    borderColor: '#E2E8F0',

                }}

            >

                <View

                    style={{

                        flexDirection: 'row',

                        alignItems: 'center',

                    }}

                >

                    <Ionicons

                        name={

                            immediateSolution

                                ? 'eye-outline'

                                : 'eye-off-outline'

                        }

                        size={20}

                        color={

                            immediateSolution

                                ? '#2F70F2'

                                : '#64748B'

                        }

                        style={{

                            marginRight: 8,

                        }}

                    />

                    <Text

                        style={{

                            fontSize: 14,

                            fontWeight: '600',

                            color: '#1E293B',

                        }}

                    >

                        Mostrar solución inmediata

                    </Text>

                </View>

                <Switch

                    value={immediateSolution}

                    onValueChange={

                        onImmediateSolutionChange

                    }

                    trackColor={{

                        false: '#CBD5E1',

                        true: '#2F70F2',

                    }}

                    thumbColor="#FFFFFF"

                />

            </View>

        </>

    );

}