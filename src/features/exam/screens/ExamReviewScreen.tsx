import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { useExamStore } from '../store/useExamStore';
import { useAuthStore } from '@/store/authStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function ExamReviewScreen() {

    // Extraemos el parámetro index con su valor por defecto si viniera vacío
    const navigation = useNavigation<any>();

    // Obtener el rol del store de autenticación para restringir el botón de edición
    const userRole = useAuthStore((state) => state.userRole);
    const isAdminOrModerate = userRole === 'admin' || userRole === 'moderate';

    // Obtener las preguntas del examen resuelto
    const { questions } = useExamStore();

    // El mapa del resumen nos manda un "startIndex" opcional
    const route = useRoute<any>();

    // Extraemos el parámetro index con su valor por defecto si viniera vacío
    const { startIndex } = route.params || { startIndex: 0 };
    // const startIndex = route.params?.startIndex ?? 0;
    const [currentIndex, setCurrentIndex] = useState(startIndex);

    // Sincronizar el índice si cambia por parámetros externos del mapa
    useEffect(() => {
        if (route.params?.startIndex !== undefined) {
            setCurrentIndex(route.params.startIndex);
        }
    }, [route.params?.startIndex]);

    // Validación de seguridad por si no existen preguntas cargadas
    if (!questions || questions.length === 0) {
        return (
            <ScreenLayout title="Error">
                <View style={localStyles.centerContainer}>
                    <Text style={localStyles.errorText}>No hay datos de examen disponibles.</Text>
                    <Pressable style={localStyles.btnBack} onPress={() => navigation.goBack()}>
                        <Text style={localStyles.btnBackText}>Volver al resumen</Text>
                    </Pressable>
                </View>
            </ScreenLayout>
        );
    }

    const currentQuestion = questions[currentIndex];
    const totalQuestions = questions.length;

    // Lógica para cambiar entre preguntas mediante las flechas laterales
    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    };

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) setCurrentIndex(currentIndex + 1);
    };

    return (
        <ScreenLayout title={`Pregunta ${currentIndex + 1}`}>
            {/* BARRA SUPERIOR DE CONTROL NAVEGACIONAL */}
            <View style={localStyles.topControlBar}>
                <Pressable
                    style={[localStyles.navArrowButton, currentIndex === 0 && localStyles.navArrowDisabled]}
                    onPress={handlePrev}
                    disabled={currentIndex === 0}
                >
                    <MaterialCommunityIcons
                        name="chevron-left"
                        size={32}
                        color={currentIndex === 0 ? '#CBD5E1' : '#2F70F2'}
                    />
                </Pressable>

                <View style={localStyles.topButtonWrapper}>
                    <Pressable
                        style={localStyles.headerActionButton}
                        onPress={() => navigation.navigate('ExamSummaryScreen')}
                    >
                        <Text style={localStyles.headerActionText}>Volver al resumen</Text>
                    </Pressable>
                </View>

                <Pressable
                    style={[localStyles.navArrowButton, currentIndex === totalQuestions - 1 && localStyles.navArrowDisabled]}
                    onPress={handleNext}
                    disabled={currentIndex === totalQuestions - 1}
                >
                    <MaterialCommunityIcons
                        name="chevron-right"
                        size={32}
                        color={currentIndex === totalQuestions - 1 ? '#CBD5E1' : '#2F70F2'}
                    />
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={localStyles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* TARJETA PRINCIPAL DEL CONTENIDO */}
                <View style={localStyles.questionMainCard}>

                    {/* Encabezado: Contador interno */}
                    <View style={localStyles.progressRow}>
                        <Text style={localStyles.progressText}>
                            Pregunta {currentIndex + 1} de {totalQuestions}
                        </Text>
                    </View>

                    {/* Enunciado de la Pregunta */}
                    <Text style={localStyles.questionStatement}>
                        Pregunta {currentQuestion.numQuestion}: {currentQuestion.question}
                    </Text>

                    {/* LISTADO DE OPCIONES CON VALIDACIÓN VISUAL */}
                    <View style={localStyles.optionsWrapper}>
                        {currentQuestion.options.map((option, index) => {
                            const isCorrectAnswer = index === currentQuestion.correctAnswer;
                            const isUserResponse = index === currentQuestion.userResponse;

                            // Convertir índice numérico a letras (0->A, 1->B, 2->C, 3->D)
                            const optionLetter = String.fromCharCode(65 + index);

                            return (
                                <View
                                    key={index}
                                    style={[
                                        localStyles.optionCard,
                                        localStyles.optionCardNormal,
                                        isCorrectAnswer && localStyles.optionCardCorrect,
                                        (isUserResponse && !isCorrectAnswer) && localStyles.optionCardIncorrect
                                    ]}
                                >
                                    <View
                                        style={[
                                            localStyles.letterBadge,
                                            localStyles.badgeNormal,
                                            isCorrectAnswer && localStyles.badgeCorrect,
                                            (isUserResponse && !isCorrectAnswer) && localStyles.badgeIncorrect
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                localStyles.letterBadgeText,
                                                localStyles.badgeTextNormal,
                                                (isCorrectAnswer || (isUserResponse && !isCorrectAnswer)) && localStyles.badgeTextWhite
                                            ]}
                                        >
                                            {optionLetter}
                                        </Text>
                                    </View>
                                    <Text style={localStyles.optionContentText}>{option}</Text>
                                </View>
                            );
                        })}
                    </View>


                    {/* SECCIÓN DE EXPLICACIÓN DETALLADA */}
                    <View style={localStyles.explanationBox}>
                        <Text style={localStyles.explanationTitle}>Explicación:</Text>
                        <Text style={localStyles.explanationBody}>
                            {currentQuestion.explanation || "No hay una explicación registrada para esta pregunta."}
                        </Text>
                    </View>
                </View>

                {/* BOTÓN EXCLUSIVO PARA ROLES ADMINISTRATIVOS */}
                {isAdminOrModerate && (
                    <Pressable
                        style={localStyles.adminEditButton}
                        android_ripple={{ color: '#1C54C4' }}
                        onPress={() => {
                            console.log("Navegar a la edición de la pregunta ID:", currentQuestion.questionId);
                            // navigation.navigate('EditQuestionScreen', { questionId: currentQuestion.questionId });
                        }}
                    >
                        <MaterialCommunityIcons name="square-edit-outline" size={20} color="#FFFFFF" />
                        <Text style={localStyles.adminButtonText}>Editar pregunta</Text>
                    </Pressable>
                )}
            </ScrollView>
        </ScreenLayout>
    );
}

const localStyles = StyleSheet.create({
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        backgroundColor: '#F8F9FC',
    },
    topControlBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        marginVertical: 12,
    },
    navArrowButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    navArrowDisabled: {
        backgroundColor: '#F1F5F9',
        elevation: 0,
    },
    topButtonWrapper: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 16,
    },
    headerActionButton: {
        backgroundColor: '#2F70F2',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    headerActionText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    questionMainCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 6,
        marginBottom: 20,
    }, progressRow: { borderBottomWidth: 1, borderColor: '#F1F5F9', paddingBottom: 10, marginBottom: 16, }, progressText: { fontSize: 14, color: '#64748B', fontWeight: '500', }, questionStatement: { fontSize: 16, fontWeight: 'bold', color: '#1C2434', lineHeight: 24, marginBottom: 20, }, optionsWrapper: { gap: 12, marginBottom: 20, }, optionCard: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 12, padding: 14, }, optionCardNormal: { borderColor: '#E2E8F0', backgroundColor: '#FFFFFF', }, optionCardCorrect: { borderColor: '#2ECC71', backgroundColor: '#F0FBF4', }, optionCardIncorrect: { borderColor: '#E74C3C', backgroundColor: '#FDF2F1', }, letterBadge: { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 12, }, badgeNormal: { borderWidth: 1, borderColor: '#94A3B8', backgroundColor: '#FFFFFF', }, badgeCorrect: { backgroundColor: '#2ECC71', }, badgeIncorrect: { backgroundColor: '#E74C3C', }, letterBadgeText: { fontSize: 14, fontWeight: '600', }, badgeTextNormal: { color: '#475569', }, badgeTextWhite: { color: '#FFFFFF', }, optionContentText: { flex: 1, fontSize: 14, color: '#334155', lineHeight: 20, }, explanationBox: { backgroundColor: '#EFF6FF', borderLeftWidth: 4, borderColor: '#2F70F2', borderRadius: 8, padding: 14, marginTop: 8, }, explanationTitle: { fontSize: 14, fontWeight: 'bold', color: '#1E40AF', marginBottom: 6, }, explanationBody: { fontSize: 13, color: '#1E3A8A', lineHeight: 18, }, adminEditButton: {
        flexDirection: 'row', backgroundColor: '#00BA52',
        // Mantenemos tu paleta verde para acciones de creación/edición
        borderRadius: 10, height: 48, justifyContent: 'center', alignItems: 'center', gap: 8, elevation: 2,
    }, adminButtonText: { color: '#FFFFFF', fontSize: 15, fontWeight: '600', }, centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, }, errorText: { fontSize: 16, color: '#64748B', textAlign: 'center', marginBottom: 16, }, btnBack: { backgroundColor: '#2F70F2', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8, }, btnBackText: { color: '#FFFFFF', fontWeight: '600', },
});