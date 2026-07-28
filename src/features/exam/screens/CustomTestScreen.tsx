import React, { useCallback } from 'react';
import { ScrollView, } from 'react-native';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import {
    useNavigation,
    useRoute,
    RouteProp,
} from '@react-navigation/native';
import {
    RootStackParamList,
} from '@/navigation/types';
import { BackButton } from '@/shared/components/Button/BackButton';
import { useCustomTest } from '../hooks/useCustomTest';
import { CustomBody, CustomFooter, CustomHeader } from '../components/CustomTest';
import { useCustomSelection } from '../hooks/useCustomSelection';
import { prepareExam } from '../services/examPreparationService';

interface CustomTestScreenProps {
    route: RouteProp<RootStackParamList, 'CustomTestScreen'>;
}

export function CustomTestScreen({ route }: CustomTestScreenProps) {
    const navigation = useNavigation<any>();
    const { oppositionId, name } = route.params || { oppositionId: '', name: 'Oposición' };

    // Selección de preguntas, tiempo y solución inmediata.
    const {

        questionCount,

        timeLimit,

        immediateSolution,

        autoTime,

        setImmediateSolution,

        handleQuestionCountChange,

        handleTimeLimitChange,

    } = useCustomTest();

    // Selección de bloques y temas
    const {

        loading,

        groups,

        selectedBlocks,

        selectedThemes,

        handleToggleBlock,

        handleToggleTheme,

    } = useCustomSelection(oppositionId);

    const handleStartTest = useCallback(async () => {

        await prepareExam({

            examType: 'custom',

            oppositionId,

            selectedBlocks,

            selectedThemes,

            limit: questionCount,

        });

        navigation.navigate(

            'TestScreen',

            {

                oppositionId,

                name,

                titleParam: 'Test Personalizado',

                setTime: timeLimit,

                examType: 'custom',

                immediateSolution,

            },

        );

    }, [

        navigation,

        oppositionId,

        name,

        selectedBlocks,

        selectedThemes,

        questionCount,

        timeLimit,

        immediateSolution,

    ]);

    return (
        <ScreenLayout title="Test Personalizado" showSidebar={true}>
            <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: '#F8FAFC' }} showsVerticalScrollIndicator={false}>

                <BackButton />

                <CustomHeader

                    questionCount={questionCount}

                    timeLimit={timeLimit}

                    immediateSolution={immediateSolution}

                    autoTime={autoTime}

                    onQuestionCountChange={handleQuestionCountChange}

                    onTimeLimitChange={handleTimeLimitChange}

                    onImmediateSolutionChange={setImmediateSolution}

                />

                <CustomBody

                    loading={loading}

                    groups={groups}

                    selectedBlocks={selectedBlocks}

                    selectedThemes={selectedThemes}

                    onToggleBlock={handleToggleBlock}

                    onToggleTheme={handleToggleTheme}

                />

                <CustomFooter

                    questionCount={questionCount}

                    timeLimit={timeLimit}

                    canStart={selectedBlocks.length > 0}

                    onStartTest={handleStartTest}

                />

            </ScrollView>
        </ScreenLayout>
    );
}