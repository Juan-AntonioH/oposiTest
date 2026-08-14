import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { CustomCard } from '@/shared/components/Cards';

import { OfficialExam } from '../../types/officialExam';

import { styles } from '../../styles/exam.styles';

interface ExamCardProps {
    exam: OfficialExam;
    onPress: () => void;
}

export function ExamCard({
    exam,
    onPress,
}: ExamCardProps) {

    return (

        <CustomCard
            onPress={onPress}
            icon={
                <Ionicons
                    name="calendar-outline"
                    size={30}
                    color="#2F70F2"
                />
            }
            iconContainerStyle={{
                backgroundColor: '#EBF2FF',
            }}
            title={
                <>
                    <Text style={styles.customCardTitle}>
                        Examen{' '}
                        <Text style={styles.yearTextBold}>
                            {exam.year}
                        </Text>
                    </Text>
                </>
            }
            subtitle={`${exam.numberQuestions} preguntas · ${exam.setTime} minutos`}
            description={`Convocatoria: ${exam.convocatoria}`}
        />

    );

}