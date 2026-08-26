import React from 'react';

import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Switch,
    Text,
    View,
} from 'react-native';

import {
    Ionicons,
} from '@expo/vector-icons';

import {
    RouteProp,
    useNavigation,
} from '@react-navigation/native';

import {
    ScreenLayout,
} from '@/shared/layouts/ScreenLayout';

import {
    RootStackParamList,
} from '@/navigation/types';
import {
    styles, testStyles,
} from '../styles';

import {
    useThemes,
} from '../hooks/useThemes';

import {
    ThemeGroupList,
} from '../components/ThemeGroupList';

interface ThemesScreenProps {

    route: RouteProp<
        RootStackParamList,
        'ThemesScreen'
    >;

}

export function ThemesScreen({

    route,

}: ThemesScreenProps) {

    const navigation =
        useNavigation<any>();

    const {

        oppositionId,

        name,

    } = route.params;

    const {

        startingTest,

        loading,

        groups,

        selectedThemes,

        immediateSolution,

        setImmediateSolution,

        handleToggleTheme,

        handleStartTest,

    } = useThemes({

        navigation,

        oppositionId,

        name,

    });

    if (loading) {

        return (

            <ScreenLayout
                title="Test por Temas"
                showSidebar
            >

                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >

                    <ActivityIndicator
                        size="large"
                        color="#2F70F2"
                    />

                </View>

            </ScreenLayout>

        );

    }

    return (

        <ScreenLayout
            title="Test por Temas"
            showSidebar
        >

            <View
                style={
                    styles.backButtonContainer
                }
            >

                <Pressable

                    style={
                        styles.backButton
                    }

                    onPress={() =>
                        navigation.goBack()
                    }

                >

                    <Text
                        style={
                            styles.backButtonText
                        }
                    >

                        ← Volver

                    </Text>

                </Pressable>

            </View>

            <ScrollView

                contentContainerStyle={
                    testStyles.scrollContainer
                }

                showsVerticalScrollIndicator={
                    false
                }

            >

                <Text
                    style={
                        styles.mainTitle
                    }
                >

                    {name}

                </Text>

                <View
                    style={
                        styles.toggleCard
                    }
                >

                    <View
                        style={
                            styles.toggleHeader
                        }
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
                            style={
                                styles.toggleTitle
                            }
                        >

                            Mostrar solución inmediata

                        </Text>

                        <Switch

                            value={
                                immediateSolution
                            }

                            onValueChange={
                                setImmediateSolution
                            }

                            trackColor={{

                                false: '#CBD5E1',

                                true: '#2F70F2',

                            }}

                            thumbColor="#FFFFFF"

                        />

                    </View>

                    <Text
                        style={
                            styles.toggleSubtitle
                        }
                    >

                        Si está activado, verás la respuesta correcta después de cada pregunta

                    </Text>

                </View>

                <ThemeGroupList

                    groups={groups}

                    selectedThemes={
                        selectedThemes
                    }

                    onToggleTheme={
                        handleToggleTheme
                    }

                />

                <View
                    style={{
                        marginTop: 10,
                        marginBottom: 30,
                    }}
                >

                    <Pressable

                        style={

                            selectedThemes.length > 0 && !startingTest

                                ? testStyles.primaryButton

                                : testStyles.primaryButtonDisabled

                        }

                        disabled={
                            selectedThemes.length === 0 ||
                            startingTest
                        }

                        onPress={
                            handleStartTest
                        }

                    >

                        {startingTest ? (

                            <ActivityIndicator
                                size="small"
                                color="#FFFFFF"
                            />

                        ) : (

                            <Text
                                style={
                                    testStyles.primaryButtonText
                                }
                            >

                                Iniciar Test (

                                {selectedThemes.length}

                                {' '}

                                {

                                    selectedThemes.length === 1

                                        ? 'tema'

                                        : 'temas'

                                }

                                )

                            </Text>

                        )}

                    </Pressable>

                </View>

            </ScrollView>

        </ScreenLayout>

    );

}