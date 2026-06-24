import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation';
import { styles } from '../styles/exam.styles';
import { useAuthStore } from '@/store/authStore';
// Importamos nuestro Store de exámenes recién creado
import { useExamStore } from '../store/useExamStore';

interface TestScreenProps {
    route: RouteProp<RootStackParamList, 'TestScreen'>;
}

export function TestScreen({ route }: TestScreenProps) {
    const navigation = useNavigation<any>();

    // Parámetros de navegación
    const { opositionId, name, setTime, examType, year, immediateSolution, titleParam } = route.params || {
        opositionId: '', name: '', setTime: 90, examType: '', immediateSolution: false, titleParam: ''
    };

    // Consumo del Store Global del Examen
    const {
        questions,
        currentIndex,
        loading,
        loadExamQuestions,
        answerQuestion,
        nextQuestion,
        finishExamEarly,
        resetExam
    } = useExamStore();

    // Cronómetro global del examen (en segundos)
    const [timeLeft, setTimeLeft] = useState<number>(setTime * 60);
    const [isTimerActive, setIsTimerActive] = useState(true);

    // Métrica de tiempo individual por pregunta activa (no provoca renders innecesarios)
    const questionTimeRef = useRef<number>(0);

    // Estado local para bloquear la interfaz si se muestra la solución inmediata
    const [isShowingSolution, setIsShowingSolution] = useState<boolean>(false);
    // Estado local para saber qué opción marcó el usuario antes de confirmar
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    // --- 1. Efecto de Carga de Preguntas de la Base de Datos / Mocks ---
    useEffect(() => {
        if (examType === 'simulacrum') {
            // Cargamos el nuevo generador aleatorio de 100 preguntas
            useExamStore.getState().loadSimulacrumQuestions(opositionId);
        } else {
            // Mantiene el flujo clásico para exámenes oficiales
            loadExamQuestions(opositionId, examType);
        }

        // Limpieza al desmontar la pantalla
        return () => resetExam();
    }, [opositionId, examType]);


    // --- 2. Efecto del Temporizador global e individual ---
    useEffect(() => {
        // Si está cargando, no hay preguntas o el tiempo está pausado, no hace nada
        if (loading || questions.length === 0 || !isTimerActive) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    // 1. 🛑 DETENEMOS EL RELOJ EN EL ESTADO GLOBAL inmediatamente
                    setIsTimerActive(false);

                    // 2. 🧹 LIMPIAMOS ESTE INTERVALO para que no se ejecute el próximo segundo
                    clearInterval(timer);

                    // 3. 🚨 LANZAMOS TU PROCESO (que muestra la alerta una sola vez)
                    handleFinishExamProcess(true);

                    return 0;
                }
                return prev - 1;
            });

            // Sumar segundo a la pregunta activa si está el tiempo en marcha
            questionTimeRef.current += 1;
        }, 1000);

        return () => clearInterval(timer);

    }, [currentIndex, loading, questions, isTimerActive]);
    // --- 3. Control de Flujo de Respuestas y Envío Definitivo ---
    const handleConfirmAnswer = (isBlank: boolean) => {
        // 1. Decidimos la respuesta: si es en blanco pasamos null, si no, la opción seleccionada
        const finalResponse = isBlank ? null : selectedOption;

        // 2. Guardamos definitivamente en tu Zustand usando tu acción nativa
        answerQuestion(finalResponse, questionTimeRef.current);

        if (immediateSolution) {
            setIsShowingSolution(true); // Muestra la tarjeta de explicación y colores
            setIsTimerActive(false);     // 🛑 Detiene el tiempo inmediatamente
        } else {
            // Si no es solución inmediata (modo examen clásico), avanza directo
            advanceOrFinish();
        }
    };

    const advanceOrFinish = () => {
        // Limpiamos los estados visuales de la pantalla
        setSelectedOption(null);
        setIsShowingSolution(false);

        if (currentIndex < questions.length - 1) {
            // 🚀 Avanzamos de pregunta usando tu acción de Zustand
            nextQuestion();

            // Reiniciamos el segundero de la pregunta local para el nuevo enunciado
            questionTimeRef.current = 0;

            // Reactivamos el temporizador global
            setIsTimerActive(true);
        } else {
            // 🛑 DETENEMOS EL TIEMPO INMEDIATAMENTE al acabar la última pregunta
            setIsTimerActive(false);

            // Usamos tu método existente para finalizar el proceso entero del examen
            handleFinishExamProcess(false);
        }
    };

    const handleCancelOrFinishAlert = () => {
        // Pausamos el tiempo mientras el cuadro de diálogo de confirmación esté abierto
        setIsTimerActive(false);

        Alert.alert(
            "¿Finalizar test?",
            "¿Estás seguro de que quieres terminar el examen actual? Las preguntas restantes se marcarán en blanco.",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                    onPress: () => setIsTimerActive(true) // ⏱️ Si cancela, reanudamos el tiempo
                },
                {
                    text: "Sí, finalizar",
                    style: "destructive",
                    onPress: () => handleFinishExamProcess(false)
                }
            ]
        );
    };


    const handleFinishExamProcess = (autoFinishedByTime = false) => {
        // Forzamos al store a rellenar el array restante con valores vacíos
        const finalizedQuestionsArray = finishExamEarly(questionTimeRef.current);

        if (autoFinishedByTime) {
            Alert.alert("Tiempo agotado", "El tiempo del examen ha finalizado de forma automática.", [
                { text: "Ver Resumen", onPress: () => navigateToSummary(finalizedQuestionsArray) }
            ]);
        } else {
            navigateToSummary(finalizedQuestionsArray);
        }
    };

    const navigateToSummary = (finalQuestions = questions) => {
        // Redirección limpia compartiendo todos los parámetros requeridos para calcular estadísticas en el resumen
        navigation.navigate('ExamSummaryScreen', {
            opositionId,
            oppositionName: name,
            examType,
            timeConfigured: setTime,
            timeRemaining: timeLeft,
            totalConfiguredQuestions: finalQuestions.length
            // Nota: No pasamos el array por navegación. ¡ExamSummaryScreen lo leerá directo de useExamStore.getState().questions!
        });
    };

    // Loader de seguridad mientras Zustand procesa las preguntas
    if (loading || questions.length === 0) {
        return (
            <ScreenLayout title={titleParam} showSidebar={false}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#2563EB" />
                    <Text style={{ marginTop: 12, color: '#64748B' }}>Cargando cuestionario...</Text>
                </View>
            </ScreenLayout>
        );
    }

    const currentQuestion = questions[currentIndex];

    // Cambiamos las funciones de ayuda para aplicar estilos dinámicos basándonos en tu configuración:
    const getOptionStyle = (index: number) => {
        if (!immediateSolution || !isShowingSolution) {
            return selectedOption === index ? styles.optionCardSelected : styles.optionCard;
        }
        if (index === currentQuestion.correctAnswer) return styles.optionCardCorrect;
        if (selectedOption === index) return styles.optionCardIncorrect;
        return styles.optionCard;
    };

    const getOptionCircleStyle = (index: number) => {
        if (!immediateSolution || !isShowingSolution) {
            return selectedOption === index ? styles.optionCircleSelected : styles.optionCircle;
        }
        if (index === currentQuestion.correctAnswer) return styles.optionCircleCorrect;
        if (selectedOption === index) return styles.optionCircleIncorrect;
        return styles.optionCircle;
    };

    const getOptionTextStyle = (index: number) => {
        if (!immediateSolution || !isShowingSolution) {
            return selectedOption === index ? styles.optionTextSelected : styles.optionText;
        }
        if (index === currentQuestion.correctAnswer || selectedOption === index) return styles.optionTextSelected;
        return styles.optionText;
    };

    // Formateador visual para el tiempo del test (segundos -> MM:SS)
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <ScreenLayout title={titleParam} showSidebar={false}>

            {/* 🛑 CABECERA DE CONTROL (Botón Finalizar Test) */}
            <View style={styles.headerControlContainer}>
                <Text style={styles.examSubtitle}>{name || 'Simulacro General'}</Text>
                <Pressable
                    style={styles.finishHeaderButton}
                    onPress={handleCancelOrFinishAlert}
                >
                    <Text style={styles.finishHeaderButtonText}>Finalizar test</Text>
                </Pressable>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >

                {/* 📊 CARD 1: ESTADO (Progreso e Indicador de Tiempo) */}
                <View style={styles.statusCard}>
                    <View style={styles.progressTextContainer}>
                        <Text style={styles.progressTitle}>Pregunta {currentIndex + 1} de </Text>
                        <Text style={styles.progressTotal}>{questions.length}</Text>
                    </View>

                    {/* Barra de progreso visual integrada */}
                    <View style={styles.progressBarBackground}>
                        <View
                            style={[
                                styles.progressBarFill,
                                { width: `${((currentIndex + 1) / questions.length) * 100}%` }
                            ]}
                        />
                    </View>

                    <View style={styles.timerBadge}>
                        <Text style={styles.timerText}>⏱️ {formatTime(timeLeft)}</Text>
                    </View>
                </View>

                {/* 📝 CARD 2: ENUNCIADO Y OPCIONES DE RESPUESTA */}
                <View style={styles.questionCard}>
                    <Text style={styles.questionText}>
                        {currentQuestion.question}
                    </Text>

                    {currentQuestion.options.map((option, index) => {
                        const letter = String.fromCharCode(65 + index); // Mapea 0->A, 1->B, 2->C, 3->D
                        return (
                            <Pressable
                                key={index}
                                style={getOptionStyle(index)}
                                onPress={() => {
                                    if (immediateSolution && isShowingSolution) return; // Bloquear si ya se respondió
                                    setSelectedOption(index);
                                }}
                            >
                                <View style={getOptionCircleStyle(index)}>
                                    <Text style={getOptionTextStyle(index)}>{letter}</Text>
                                </View>
                                <Text style={styles.optionLabel}>{option}</Text>
                            </Pressable>
                        );
                    })}

                    {/* 💡 CARD 3: TARJETA DE EXPLICACIÓN (Solo visible en solución inmediata tras pulsar Responder) */}
                    {immediateSolution && isShowingSolution && currentQuestion.explanation && (
                        <View style={styles.explanationCard}>
                            <View style={styles.explanationHeader}>
                                <Text style={styles.explanationTitle}>💡 Explicación de la pregunta</Text>
                            </View>
                            <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
                        </View>
                    )}
                </View>

                {/* ⚙️ BARRA DE ACCIONES INFERIOR (Dinámica) */}
                <View style={styles.actionsContainer}>
                    {immediateSolution && isShowingSolution ? (
                        // Si está la solución activa en pantalla, muta a botón único de avance
                        <Pressable
                            style={[styles.primaryButton, { width: '100%' }]}
                            onPress={advanceOrFinish}
                        >
                            <Text style={styles.primaryButtonText}>Siguiente pregunta  ➔</Text>
                        </Pressable>
                    ) : (
                        // Flujo de examen clásico interactivo
                        <>
                            <Pressable
                                style={selectedOption !== null ? styles.primaryButton : styles.primaryButtonDisabled}
                                disabled={selectedOption === null}
                                onPress={() => handleConfirmAnswer(false)}
                            >
                                <Text style={styles.primaryButtonText}>Responder  ➔</Text>
                            </Pressable>

                            <Pressable
                                style={styles.secondaryButton}
                                onPress={() => handleConfirmAnswer(true)}
                            >
                                <Text style={styles.secondaryButtonText}>Dejar en blanco</Text>
                            </Pressable>
                        </>
                    )}
                </View>

            </ScrollView>
        </ScreenLayout>
    );
}
