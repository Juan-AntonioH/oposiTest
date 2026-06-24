import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { useExamStore } from '../store/useExamStore';
import { useAuthStore } from '@/store/authStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../styles/exam.styles';

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
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>No hay datos de examen disponibles.</Text>
                    <Pressable style={styles.btnBack} onPress={() => navigation.goBack()}>
                        <Text style={styles.btnBackText}>Volver al resumen</Text>
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
            <View style={styles.topControlBar}>
                <Pressable
                    style={[styles.navArrowButton, currentIndex === 0 && styles.navArrowDisabled]}
                    onPress={handlePrev}
                    disabled={currentIndex === 0}
                >
                    <MaterialCommunityIcons
                        name="chevron-left"
                        size={32}
                        color={currentIndex === 0 ? '#CBD5E1' : '#2F70F2'}
                    />
                </Pressable>

                <View style={styles.topButtonWrapper}>
                    <Pressable
                        style={styles.headerActionButton}
                        onPress={() => navigation.navigate('ExamSummaryScreen')}
                    >
                        <Text style={styles.headerActionText}>Volver al resumen</Text>
                    </Pressable>
                </View>

                <Pressable
                    style={[styles.navArrowButton, currentIndex === totalQuestions - 1 && styles.navArrowDisabled]}
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

            <ScrollView contentContainerStyle={styles.scrollContainerReview} showsVerticalScrollIndicator={false}>
                {/* TARJETA PRINCIPAL DEL CONTENIDO */}
                <View style={styles.questionMainCard}>

                    {/* Encabezado: Contador interno */}
                    <View style={styles.progressRow}>
                        <Text style={styles.progressText}>
                            Pregunta {currentIndex + 1} de {totalQuestions}
                        </Text>
                    </View>

                    {/* Enunciado de la Pregunta */}
                    <Text style={styles.questionStatement}>
                        Pregunta {currentQuestion.numQuestion}: {currentQuestion.question}
                    </Text>

                    {/* LISTADO DE OPCIONES CON VALIDACIÓN VISUAL */}
                    <View style={styles.optionsWrapper}>
                        {currentQuestion.options.map((option, index) => {
                            const isCorrectAnswer = index === currentQuestion.correctAnswer;
                            const isUserResponse = index === currentQuestion.userResponse;

                            // Convertir índice numérico a letras (0->A, 1->B, 2->C, 3->D)
                            const optionLetter = String.fromCharCode(65 + index);

                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.optionCardReview,
                                        styles.optionCardNormal,
                                        isCorrectAnswer && styles.optionCardCorrectReview,
                                        (isUserResponse && !isCorrectAnswer) && styles.optionCardIncorrectReview
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.letterBadge,
                                            styles.badgeNormal,
                                            isCorrectAnswer && styles.badgeCorrect,
                                            (isUserResponse && !isCorrectAnswer) && styles.badgeIncorrect
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.letterBadgeText,
                                                styles.badgeTextNormal,
                                                (isCorrectAnswer || (isUserResponse && !isCorrectAnswer)) && styles.badgeTextWhite
                                            ]}
                                        >
                                            {optionLetter}
                                        </Text>
                                    </View>
                                    <Text style={styles.optionContentText}>{option}</Text>
                                </View>
                            );
                        })}
                    </View>


                    {/* SECCIÓN DE EXPLICACIÓN DETALLADA */}
                    <View style={styles.explanationBox}>
                        <Text style={styles.explanationTitleReview}>Explicación:</Text>
                        <Text style={styles.explanationBody}>
                            {currentQuestion.explanation || "No hay una explicación registrada para esta pregunta."}
                        </Text>
                    </View>
                </View>

                {/* BOTÓN EXCLUSIVO PARA ROLES ADMINISTRATIVOS */}
                {isAdminOrModerate && (
                    <Pressable
                        style={styles.adminEditButton}
                        android_ripple={{ color: '#1C54C4' }}
                        onPress={() => {
                            console.log("Navegando de forma tipada a la edición de la pregunta ID:", currentQuestion.questionId);

                            navigation.navigate('QuestionForm', {
                                // Parámetros obligatorios requeridos por el formulario
                                idDocument: currentQuestion.oppositionId || 'opo_01',
                                nombreOposicion: 'Técnico auxiliar informática',

                                // Pasamos la estructura limpia mapeando campos directos del store
                                questionData: {
                                    id: currentQuestion.id || currentQuestion.questionId || 'mock_id',
                                    questionId: currentQuestion.questionId,
                                    oppositionId: currentQuestion.oppositionId || 'opo_01',
                                    blockId: currentQuestion.blockId || 'bloque_01',
                                    temaId: currentQuestion.temaId || 'tema_01',
                                    question: currentQuestion.question,
                                    options: currentQuestion.options,
                                    correctAnswer: currentQuestion.correctAnswer,
                                    explanation: currentQuestion.explanation || '',
                                    randomId: currentQuestion.randomId || Math.random(),
                                    esOficial: currentQuestion.esOficial ?? true,
                                    examYear: currentQuestion.examYear || 2026,
                                    examConvocatoria: currentQuestion.examConvocatoria || 'Libre'
                                }
                            });
                        }}
                    >
                        <MaterialCommunityIcons name="square-edit-outline" size={20} color="#FFFFFF" />
                        <Text style={styles.adminButtonText}>Editar pregunta</Text>
                    </Pressable>
                )}
            </ScrollView>
        </ScreenLayout>
    );
}