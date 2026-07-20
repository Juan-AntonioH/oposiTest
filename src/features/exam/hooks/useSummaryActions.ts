import {
    useCallback,
} from 'react';

import {
    Alert,
} from 'react-native';

import {
    useNavigation,
} from '@react-navigation/native';

import {
    NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { RootStackParamList } from '@/navigation/types';

import {
    CompletedTest,
} from '../types';

import {
    useSaveCompletedTest,
} from './useSaveCompletedTest';

import {
    useTestStore,
} from '../store/useTestStore';

type NavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

interface UseSummaryActionsProps {

    summary: CompletedTest;

}

export function useSummaryActions({
    summary,
}: UseSummaryActionsProps) {

    const navigation =
        useNavigation<NavigationProp>();

    const resetTest =
        useTestStore(
            state => state.resetTest,
        );

    const {
        save,
    } = useSaveCompletedTest();

    const openQuestion =
        useCallback((
            index: number,
        ) => {

            navigation.navigate(
                'ExamReviewScreen',
                {
                    startIndex: index,
                },
            );

        }, [
            navigation,
        ]);

    const finish =
        useCallback(() => {

            Alert.alert(
                'Finalizar examen',
                '¿Qué deseas hacer con este examen?',
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                    },
                    {
                        text: 'No guardar',
                        style: 'destructive',
                        onPress: () => {

                            resetTest();

                            navigation.reset({

                                index: 0,

                                routes: [
                                    {
                                        name: 'Dashboard',
                                    },
                                ],

                            });

                        },
                    },
                    {
                        text: 'Guardar',
                        onPress: async () => {

                            try {

                                await save(
                                    summary,
                                );

                                resetTest();

                                navigation.reset({

                                    index: 0,

                                    routes: [
                                        {
                                            name: 'Dashboard',
                                        },
                                    ],

                                });

                            } catch (error) {

                                Alert.alert(
                                    'Error',
                                    'No se pudo guardar el examen. Inténtalo de nuevo.',
                                );

                            }

                        },
                    },
                ],
            );

        }, [
            navigation,
            resetTest,
            save,
            summary,
        ]);

    return {

        openQuestion,

        finish,

    };

}