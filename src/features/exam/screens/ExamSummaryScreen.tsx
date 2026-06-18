import React, { useMemo } from 'react';
import { View, Text, FlatList, Pressable, Dimensions, StyleSheet } from 'react-native';
import { useExamStore } from '../store/useExamStore';
import { useAuthStore } from '@/store/authStore';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../styles/exam.styles';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 10;
// Cálculo dinámico para que la cuadrícula del mapa encaje simétricamente en cualquier pantalla
const BUTTON_SIZE = (width - 64 - (COLUMN_COUNT - 1) * 8) / COLUMN_COUNT;

interface ExamSummaryScreenProps {
    navigation: {
        navigate: (screen: string, params?: object) => void;
    };
}

export function ExamSummaryScreen({ navigation }: ExamSummaryScreenProps) {
    const uid = useAuthStore((state) => state.uid);
    const { questions, getExamSummary, resetExam } = useExamStore();

    // Genera el objeto final listo para Firebase con la estructura exacta que definiste
    const summary = useMemo(() => getExamSummary(uid), [questions, uid]);

    // Transforma los segundos de las preguntas a formato legible de string corto
    const formatTimeSpent = (totalSeconds: number) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const handleSaveToFirestore = async () => {
        console.log("Estructura salvada en tests_completed:", summary);
        // Aquí conectará con features/exam/services/examService.ts posteriormente
    };

    // Renderizamos las métricas superiores como cabecera estática del listado
    const renderSummaryHeader = () => (
        <View style={styles.headerContainer}>
            <View style={[styles.titleRow, { marginBottom: 0 }]}>
                <MaterialCommunityIcons name="file-document-edit-outline" size={32} color="#1C2434" />
                <Text style={styles.mainTitle}>Resumen del Examen</Text>
            </View>
            <Text style={styles.mainSubtitle}>{summary.oppositionName}</Text>

            {/* Tarjeta Principal de Calificación */}
            <View style={styles.scoreCard}>
                <View style={styles.badgeContainer}>
                    <MaterialCommunityIcons name="medal" size={36} color="#2F70F2" />
                </View>
                <Text style={styles.scoreNumber}>{summary.note.toFixed(2)}</Text>
                <Text style={styles.scoreLabel}>Nota Final</Text>
            </View>

            {/* Cuadrícula de Contadores de Estado (2x2) */}
            <View style={styles.gridContainer}>
                <View style={styles.metricBox}>
                    <MaterialCommunityIcons name="clock-outline" size={20} color="#64748B" />
                    <Text style={styles.metricValue}>
                        {formatTimeSpent(summary.answers.reduce((acc, q) => acc + (q.questionTimeSpent || 0), 0))}
                    </Text>
                    <Text style={styles.metricLabel}>Tiempo</Text>
                </View>

                <View style={[styles.metricBox, { backgroundColor: '#E8F5E9' }]}>
                    <MaterialCommunityIcons name="check-circle-outline" size={20} color="#2E7D32" />
                    <Text style={[styles.metricValue, { color: '#2E7D32' }]}>{summary.successes}</Text>
                    <Text style={[styles.metricLabel, { color: '#2E7D32' }]}>
                        Aciertos ({((summary.successes / summary.numberOfConfiguredQuestions) * 100).toFixed(1)}%)
                    </Text>
                </View>

                <View style={[styles.metricBox, { backgroundColor: '#FFEBEE' }]}>
                    <MaterialCommunityIcons name="close-circle-outline" size={20} color="#C62828" />
                    <Text style={[styles.metricValue, { color: '#C62828' }]}>{summary.errors}</Text>
                    <Text style={[styles.metricLabel, { color: '#C62828' }]}>Errores</Text>
                </View>

                <View style={styles.metricBox}>
                    <MaterialCommunityIcons name="minus-circle-outline" size={20} color="#64748B" />
                    <Text style={styles.metricValue}>{summary.unanswered}</Text>
                    <Text style={styles.metricLabel}>Sin responder</Text>
                </View>
            </View>

            <Text style={[styles.mainTitle, { fontSize: 18, marginTop: 16, marginBottom: 12 }]}>Mapa de Respuestas</Text>
        </View>
    );

    // Componente de pie de página que dibuja la leyenda de colores y el botón de acción
    const renderSummaryFooter = () => (
        <View style={styles.footerContainer}>
            {/* Leyenda de Colores */}
            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#2ECC71' }]} />
                    <Text style={styles.legendText}>Correcta</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#E74C3C' }]} />
                    <Text style={styles.legendText}>Incorrecta</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#CBD5E1' }]} />
                    <Text style={styles.legendText}>Sin responder</Text>
                </View>
            </View>

            {/* Botón de Finalización */}
            <View style={[styles.backButtonContainerSumary, { marginTop: 24 }]}>
                <Pressable
                    style={[styles.backButtonSumary, { backgroundColor: '#2F70F2', alignItems: 'center', width: '100%', padding: 14 }]}
                    android_ripple={{ color: '#1C54C4' }}
                    onPress={() => {
                        handleSaveToFirestore();
                        resetExam();
                        navigation.navigate('Dashboard');
                    }}
                >
                    <Text style={[styles.backButtonTextSumary, { color: '#FFF', fontWeight: 'bold' }]}>Volver al inicio</Text>
                </Pressable>
            </View>
        </View>
    );

    return (
        <ScreenLayout title="Resultados">
            <FlatList
                data={summary.answers}
                keyExtractor={(item, index) => item.questionId || index.toString()}
                numColumns={COLUMN_COUNT}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={renderSummaryHeader}
                ListFooterComponent={renderSummaryFooter}
                columnWrapperStyle={{ gap: 8, marginBottom: 8, justifyContent: 'flex-start' }}
                renderItem={({ item, index }) => {
                    let customStyle = { backgroundColor: '#F8F9FA' }; // Por defecto: Sin responder
                    let textStyle = { color: '#444' };

                    if (item.userResponse !== null && item.userResponse !== undefined) {
                        if (item.userResponse === item.correctAnswer) {
                            customStyle = { backgroundColor: '#2ECC71' };
                            textStyle = { color: '#FFF' };
                        } else {
                            customStyle = { backgroundColor: '#E74C3C' };
                            textStyle = { color: '#FFF' };
                        }
                    }

                    return (
                        <Pressable
                            style={[{
                                width: BUTTON_SIZE,
                                height: BUTTON_SIZE,
                                borderRadius: BUTTON_SIZE / 2,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }, customStyle]}
                            android_ripple={{ color: '#E0E0E0' }}
                            onPress={() => navigation.navigate('ExamReviewScreen', { startIndex: index })}
                        >
                            <Text style={[{ fontSize: 12, fontWeight: 'bold' }, textStyle]}>{index + 1}</Text>
                        </Pressable>
                    );
                }}
            />
        </ScreenLayout>
    );
}