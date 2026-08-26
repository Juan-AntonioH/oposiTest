import React, { useState } from 'react';

import {
    prepareExam,
} from '../services/examPreparationService';

import {
    ScrollView,
    Switch,
    Text,
    View,
} from 'react-native';

import {
    RouteProp,
    useNavigation,
} from '@react-navigation/native';

import {
    NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '@/navigation/types';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { ScreenState } from '@/shared/components/ScreenState/ScreenState';
import { BackButton } from '@/shared/components/Button/BackButton';

import { useOfficialExams } from '../hooks/useOfficialExams';
import { ExamCard } from '../components/ExamCard';
import { OfficialExam } from '../types';

import { styles } from '../styles/exam.styles';

interface ExamsScreenProps {
    route: RouteProp<
        RootStackParamList,
        'ExamsScreen'
    >;
}

type NavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

export function ExamsScreen({
    route,
}: ExamsScreenProps) {

    const {
        oppositionId,
        name,
    } = route.params;

    const navigation =
        useNavigation<NavigationProp>();

    const [immediateSolution, setImmediateSolution] =
        useState(false);

    const {
        exams,
        loading,
        error,
        reload,
    } = useOfficialExams(oppositionId);

    const [isPreparingExam, setIsPreparingExam] =
        useState(false);

    async function handleExamPress(
        exam: OfficialExam,
    ) {
        try {

            setIsPreparingExam(true);

            await prepareExam({

                examType: 'official',

                oppositionId,

                year: exam.year,

                convocatoria: exam.convocatoria,

            });

            navigation.navigate(

                'TestScreen',

                {

                    oppositionId,

                    name,

                    setTime: exam.setTime,

                    examType: 'official',

                    year: exam.year,

                    convocatoria: exam.convocatoria,

                    immediateSolution,

                    titleParam: `Examen Oficial ${exam.year}`,

                },

            );
        } catch (error) {

            console.error(
                'EXAMS: error preparando examen',
                error,
            );

        } finally {

            setIsPreparingExam(false);

        }
    }

    return (

        <ScreenLayout title="Seleccionar examen">

            <BackButton />

            <ScreenState
                loading={loading || isPreparingExam}
                error={error}
                onRetry={reload}
                isEmpty={
                    !loading &&
                    !isPreparingExam &&
                    exams.length === 0
                }
                emptyText="No hay exámenes disponibles."
            >

                <ScrollView
                    style={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                >

                    <Text style={styles.mainTitle}>
                        Exámenes oficiales
                    </Text>

                    <View style={styles.toggleCard}>

                        <View style={styles.toggleHeader}>

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

                            <Text style={styles.toggleTitle}>
                                Mostrar solución inmediata
                            </Text>

                            <Switch
                                value={immediateSolution}
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
                            Si está activado,
                            verás la respuesta
                            correcta después
                            de cada pregunta.
                        </Text>

                    </View>

                    <View
                        style={{
                            gap: 4,
                            paddingBottom: 32,
                        }}
                    >

                        {exams.map((exam) => (

                            <ExamCard
                                key={exam.idDocument}
                                exam={exam}
                                onPress={() => handleExamPress(exam)}
                            />

                        ))}

                    </View>

                </ScrollView>

            </ScreenState>

        </ScreenLayout>

    );

}