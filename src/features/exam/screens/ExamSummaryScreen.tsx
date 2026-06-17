import React, { useMemo } from 'react';
import { View, Text, FlatList, Pressable, Dimensions, StyleSheet } from 'react-native';
import { useExamStore } from '../store/useExamStore';
import { useAuthStore } from '@/store/authStore';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
        <View style={localStyles.headerContainer}>
            <View style={localStyles.titleRow}>
                <MaterialCommunityIcons name="file-document-edit-outline" size={32} color="#1C2434" />
                <Text style={localStyles.mainTitle}>Resumen del Examen</Text>
            </View>
            <Text style={localStyles.mainSubtitle}>{summary.oppositionName}</Text>

            {/* Tarjeta Principal de Calificación */}
            <View style={localStyles.scoreCard}>
                <View style={localStyles.badgeContainer}>
                    <MaterialCommunityIcons name="medal" size={36} color="#2F70F2" />
                </View>
                <Text style={localStyles.scoreNumber}>{summary.note.toFixed(2)}</Text>
                <Text style={localStyles.scoreLabel}>Nota Final</Text>
            </View>

            {/* Cuadrícula de Contadores de Estado (2x2) */}
            <View style={localStyles.gridContainer}>
                <View style={localStyles.metricBox}>
                    <MaterialCommunityIcons name="clock-outline" size={20} color="#64748B" />
                    <Text style={localStyles.metricValue}>
                        {formatTimeSpent(summary.answers.reduce((acc, q) => acc + (q.questionTimeSpent || 0), 0))}
                    </Text>
                    <Text style={localStyles.metricLabel}>Tiempo</Text>
                </View>

                <View style={[localStyles.metricBox, { backgroundColor: '#E8F5E9' }]}>
                    <MaterialCommunityIcons name="check-circle-outline" size={20} color="#2E7D32" />
                    <Text style={[localStyles.metricValue, { color: '#2E7D32' }]}>{summary.successes}</Text>
                    <Text style={[localStyles.metricLabel, { color: '#2E7D32' }]}>
                        Aciertos ({((summary.successes / summary.numberOfConfiguredQuestions) * 100).toFixed(1)}%)
                    </Text>
                </View>

                <View style={[localStyles.metricBox, { backgroundColor: '#FFEBEE' }]}>
                    <MaterialCommunityIcons name="close-circle-outline" size={20} color="#C62828" />
                    <Text style={[localStyles.metricValue, { color: '#C62828' }]}>{summary.errors}</Text>
                    <Text style={[localStyles.metricLabel, { color: '#C62828' }]}>Errores</Text>
                </View>

                <View style={localStyles.metricBox}>
                    <MaterialCommunityIcons name="minus-circle-outline" size={20} color="#64748B" />
                    <Text style={localStyles.metricValue}>{summary.unanswered}</Text>
                    <Text style={localStyles.metricLabel}>Sin responder</Text>
                </View>
            </View>

            <Text style={[localStyles.mainTitle, { fontSize: 18, marginTop: 16, marginBottom: 12 }]}>Mapa de Respuestas</Text>
        </View>
    );

    // Componente de pie de página que dibuja la leyenda de colores y el botón de acción
    const renderSummaryFooter = () => (
        <View style={localStyles.footerContainer}>
            {/* Leyenda de Colores */}
            <View style={localStyles.legendContainer}>
                <View style={localStyles.legendItem}>
                    <View style={[localStyles.legendDot, { backgroundColor: '#2ECC71' }]} />
                    <Text style={localStyles.legendText}>Correcta</Text>
                </View>
                <View style={localStyles.legendItem}>
                    <View style={[localStyles.legendDot, { backgroundColor: '#E74C3C' }]} />
                    <Text style={localStyles.legendText}>Incorrecta</Text>
                </View>
                <View style={localStyles.legendItem}>
                    <View style={[localStyles.legendDot, { backgroundColor: '#F8F9FA', borderWidth: 1, borderColor: '#CBD5E1' }]} />
                    <Text style={localStyles.legendText}>Sin responder</Text>
                </View>
            </View>

            {/* Botón de Finalización */}
            <View style={[localStyles.backButtonContainer, { marginTop: 24 }]}>
                <Pressable
                    style={[localStyles.backButton, { backgroundColor: '#2F70F2', alignItems: 'center', width: '100%', padding: 14 }]}
                    android_ripple={{ color: '#1C54C4' }}
                    onPress={() => {
                        handleSaveToFirestore();
                        resetExam();
                        navigation.navigate('Dashboard');
                    }}
                >
                    <Text style={[localStyles.backButtonText, { color: '#FFF', fontWeight: 'bold' }]}>Volver al inicio</Text>
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
                contentContainerStyle={localStyles.listContainer}
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

const localStyles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        backgroundColor: '#F8F9FC',
        flexGrow: 1,
    },
    headerContainer: {
        marginTop: 24,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C2434',
    },
    mainSubtitle: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 16,
    },
    scoreCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
    },
    badgeContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    scoreNumber: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#1C2434',
    },
    scoreLabel: {
        fontSize: 13,
        color: '#64748B',
        fontWeight: '500',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    metricBox: {
        backgroundColor: '#FFFFFF',
        width: '48%',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
    },
    metricValue: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#1C2434',
        marginTop: 4,
    }, metricLabel: {
        fontSize: 11,
        color: '#64748B',
        marginTop: 2,
        textAlign: 'center',
        fontWeight: '500',
    },
    footerContainer: {
        marginTop: 12,
    },

    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        marginTop: 8,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    }, legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    legendText: {
        fontSize: 12,
        color: '#64748B',
        fontWeight: '500',
    },
    backButtonContainer: {
        width: '100%',
        marginBottom: 12,
    },
    backButton: {
        borderRadius: 10,
        paddingVertical: 12,
    },
    backButtonText: {
        fontSize: 15,
        fontWeight: '600',
    },
});