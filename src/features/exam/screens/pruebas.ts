// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
// import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
// import { RouteProp, useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '@/navigation'; 
// import { styles } from '../styles/exam.styles'; // Asegúrate de tener los estilos actualizados aquí abajo

// // Estructura de la pregunta solicitada
// interface Question {
//     numQuestion: number;
//     questionId: string;
//     blockId: string;
//     themeId: string;
//     question: string;
//     options: string[];
//     userResponse: number | null;
//     correctAnswer: number;
//     questionTimeSpent: number;
//     explanation?: string; // Añadido para la solución inmediata
// }

// interface TestScreenProps {
//     route: RouteProp<RootStackParamList, 'TestScreen'>;
// }

// // 5 Preguntas de prueba estructuradas como solicitaste
// const MOCK_QUESTIONS: Question[] = [
//     {
//         numQuestion: 1,
//         questionId: "p320",
//         blockId: "bloque_01",
//         temaId: "tema_01",
//         question: "¿Cuál es la respuesta correcta para este caso de ejemplo de la oposición?",
//         options: [
//             "Opción A de la pregunta 1",
//             "Opción B de la pregunta 1",
//             "Opción C de la pregunta 1",
//             "Opción D de la pregunta 1"
//         ],
//         userResponse: null,
//         correctAnswer: 2, // Índice de la Opción C
//         questionTimeSpent: 0,
//         explanation: "Esta es la explicación detallada de por qué la opción correcta es la respuesta adecuada para la pregunta 1. En el contexto de la oposición, este concepto es fundamental porque..."
//     },
//     {
//         numQuestion: 2,
//         questionId: "p321",
//         blockId: "bloque_01",
//         temaId: "tema_02",
//         question: "¿Cuál es el plazo general para interponer un recurso de alzada?",
//         options: [
//             "Un mes",
//             "Dos meses",
//             "Quince días",
//             "Diez días"
//         ],
//         userResponse: null,
//         correctAnswer: 0,
//         questionTimeSpent: 0,
//         explanation: "El plazo para la interposición del recurso de alzada será de un mes si el acto fuera expreso, de acuerdo con la Ley de Procedimiento Administrativo Común."
//     },
//     {
//         numQuestion: 3,
//         questionId: "p322",
//         blockId: "bloque_02",
//         temaId: "tema_05",
//         question: "Según la Constitución Española, ¿en quién reside la soberanía nacional?",
//         options: [
//             "En el Rey",
//             "En las Cortes Generales",
//             "En el Pueblo Español",
//             "En el Gobierno de la Nación"
//         ],
//         userResponse: null,
//         correctAnswer: 2,
//         questionTimeSpent: 0,
//         explanation: "El artículo 1.2 de la Constitución establece explícitamente que la soberanía nacional reside en el pueblo español, del que emanan los poderes del Estado."
//     },
//     {
//         numQuestion: 4,
//         questionId: "p323",
//         blockId: "bloque_03",
//         temaId: "tema_08",
//         question: "¿Qué tipo de norma jurídica tiene rango de Ley y es dictada por el Gobierno en caso de extraordinaria y urgente necesidad?",
//         options: [
//             "Real Decreto Legislativo",
//             "Real Decreto-Ley",
//             "Ley Orgánica",
//             "Reglamento"
//         ],
//         userResponse: null,
//         correctAnswer: 1,
//         questionTimeSpent: 0,
//         explanation: "En caso de extraordinaria y urgente necesidad, el Gobierno podrá dictar disposiciones legislativas provisionales que tomarán la forma de Decretos-leyes."
//     },
//     {
//         numQuestion: 5,
//         questionId: "p324",
//         blockId: "bloque_03",
//         temaId: "tema_10",
//         question: "¿Cuál es la capital de España?",
//         options: [
//             "Madrid",
//             "Barcelona",
//             "Valencia",
//             "Sevilla"
//         ],
//         userResponse: null,
//         correctAnswer: 0,
//         questionTimeSpent: 0,
//         explanation: "La capital del Estado es la villa de Madrid, tal y como recoge el artículo 5 de la Constitución Española."
//     }
// ];

// export function TestScreen({ route }: TestScreenProps) {
//     const navigation = useNavigation<any>();
    
//     // Recuperar parámetros pasados por navegación
//     const { 
//         year = 2024, 
//         setTime = 90, // Viene en minutos (ej: 90)
//         immediateSolution = false 
//     } = route.params || {};

//     // Estados del Test
//     const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
//     const [currentIndex, setCurrentIndex] = useState<number>(0);
//     const [selectedOption, setSelectedOption] = useState<number | null>(null);
    
//     // Control de la solución inmediata en pantalla
//     const [isAnswered, setIsAnswered] = useState<boolean>(false);

//     // Estados del Cronómetro global (en segundos)
//     const [timeLeft, setTimeLeft] = useState<number>(setTime * 60);

//     // Métrica de tiempo por pregunta activa
//     const questionTimeRef = useRef<number>(0);

//     const currentQuestion = questions[currentIndex];

//     // --- Efecto del Cronómetro Global e Historial de Tiempo de Pregunta ---
//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTimeLeft((prev) => {
//                 if (prev <= 1) {
//                     clearInterval(timer);
//                     handleFinishExam(true); // Finaliza automáticamente por tiempo agotado
//                     return 0;
//                 }
//                 return prev - 1;
//             });
//             // Sumar un segundo consumido a la pregunta activa
//             questionTimeRef.current += 1;
//         }, 1000);

//         return () => clearInterval(timer);
//     }, [currentIndex]);

//     // Formateador de segundos a HH:MM:SS
//     const formatTime = (seconds: number) => {
//         const hrs = Math.floor(seconds / 3600);
//         const mins = Math.floor((seconds % 3600) / 60);
//         const secs = seconds % 60;
//         return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//     };

//     // --- Lógica de Respuestas ---
//     const handleSelectOption = (index: number) => {
//         if (isAnswered) return; // Si ya se evaluó de forma inmediata, bloquear clics
//         setSelectedOption(index);
//     };

//     const handleConfirmAnswer = (isBlank: boolean = false) => {
//         const finalSelection = isBlank ? null : selectedOption;

//         // Clonamos y guardamos el estado del array con sus tiempos correspondientes
//         const updatedQuestions = [...questions];
//         updatedQuestions[currentIndex] = {
//             ...currentQuestion,
//             userResponse: finalSelection,
//             questionTimeSpent: questionTimeRef.current
//         };
//         setQuestions(updatedQuestions);

//         // Si la solución inmediata está activa, mostramos la tarjeta informativa primero
//         if (immediateSolution && !isAnswered) {
//             setIsAnswered(true);
//             return;
//         }

//         // Flujo Normal: Avanzar directo
//         goToNextQuestion(updatedQuestions);
//     };

//     const goToNextQuestion = (currentQuestionsState = questions) => {
//         // Resetear contadores de la interfaz
//         questionTimeRef.current = 0;
//         setSelectedOption(null);
//         setIsAnswered(false);

//         if (currentIndex < currentQuestionsState.length - 1) {
//             setCurrentIndex(currentIndex + 1);
//         } else {
//             // Llegó al final natural de las preguntas
//             processAndNavigateSummary(currentQuestionsState);
//         }
//     };

//     // --- Lógica de Finalización ---
//     const handleFinishExam = (autoFinishedByTime = false) => {
//         if (autoFinishedByTime) {
//             Alert.alert("Tiempo agotado", "El tiempo del examen ha finalizado de forma automática.", [
//                 { text: "Ver Resumen", onPress: () => processAndNavigateSummary() }
//             ]);
//             return;
//         }

//         Alert.alert(
//             "¿Finalizar test?",
//             "¿Estás seguro de que quieres terminar el examen actual? Las preguntas restantes se marcarán en blanco.",
//             [
//                 { text: "Cancelar", style: "cancel" },
//                 { 
//                     text: "Sí, finalizar", 
//                     style: "destructive",
//                     onPress: () => processAndNavigateSummary() 
//                 }
//             ]
//         );
//     };

//     const processAndNavigateSummary = (finalQuestions = questions) => {
//         // Recorrer las preguntas que el usuario no llegó a responder para rellenarlas en blanco de forma masiva
//         const processedQuestions = finalQuestions.map((q, idx) => {
//             if (idx >= currentIndex && q.userResponse === undefined || q.userResponse === null) {
//                 return {
//                     ...q,
//                     userResponse: q.userResponse !== undefined ? q.userResponse : null,
//                     questionTimeSpent: q.questionTimeSpent || 0
//                 };
//             }
//             return q;
//         });

//         // Envía el array estructurado completo a la pantalla resumen
//         navigation.replace('SummaryExamScreen', { answers: processedQuestions });
//     };

//     // --- Determinación de colores dinámicos de los botones (Ref. Imagen 1 e Imagen 2) ---
//     const getOptionStyle = (index: number) => {
//         if (isAnswered) {
//             // Modo corrección inmediata activo
//             if (index === currentQuestion.correctAnswer) {
//                 return styles.optionCorrect; // Borde y fondo verde claro
//             }
//             if (selectedOption === index && selectedOption !== currentQuestion.correctAnswer) {
//                 return styles.optionIncorrect; // Borde y fondo rojo claro
//             }
//             return styles.optionDisabled; // El resto de opciones opacas
//         }

//         // Modo normal de selección
//         return selectedOption === index ? styles.optionSelected : styles.optionCard;
//     };

//     const getOptionLetterStyle = (index: number) => {
//         if (isAnswered) {
//                     // --- Continuación dentro de TestScreen ---
//         [
//             { text: "Cancelar", style: "cancel" },
//             { 
//                 text: "Sí, finalizar", 
//                 style: "destructive",
//                 onPress: () => processAndNavigateSummary() 
//             }
//         ]
//     );
// };

// // Guarda todas las respuestas restantes en blanco si se corta el test antes de tiempo
// const processAndNavigateSummary = (finalQuestions = questions) => {
//     const fullyProcessedQuestions = finalQuestions.map((q, idx) => {
//         // Si el índice es mayor o igual al actual y no tiene respuesta, se marca en blanco
//         if (idx >= currentIndex && q.userResponse === undefined) {
//             return {
//                 ...q,
//                 userResponse: null,
//                 questionTimeSpent: idx === currentIndex ? questionTimeRef.current : 0
//             };
//         }
//         return q;
//     });

//     // Navega a la pantalla de resumen pasando el array de respuestas estructurado
//     navigation.navigate('ExamSummaryScreen', { answers: fullyProcessedQuestions });
// };

// // --- Estilos dinámicos para la Solución Inmediata ---
// const getOptionStyle = (index: number) => {
//     if (!immediateSolution || !isAnswered) {
//         return selectedOption === index ? styles.optionCardSelected : styles.optionCard;
//     }
//     // Si la respuesta ya se procesó con la solución inmediata:
//     if (index === currentQuestion.correctAnswer) {
//         return styles.optionCardCorrect; // Verde
//     }
//     if (selectedOption === index && selectedOption !== currentQuestion.correctAnswer) {
//         return styles.optionCardIncorrect; // Rojo
//     }
//     return styles.optionCard;
// };

// const getOptionCircleStyle = (index: number) => {
//     if (!immediateSolution || !isAnswered) {
//         return selectedOption === index ? styles.optionCircleSelected : styles.optionCircle;
//     }
//     if (index === currentQuestion.correctAnswer) {
//         return styles.optionCircleCorrect;
//     }
//     if (selectedOption === index && selectedOption !== currentQuestion.correctAnswer) {
//         return styles.optionCircleIncorrect;
//     }
//     return styles.optionCircle;
// };

// const getOptionTextStyle = (index: number) => {
//     if (!immediateSolution || !isAnswered) {
//         return selectedOption === index ? styles.optionTextSelected : styles.optionText;
//     }
//     if (index === currentQuestion.correctAnswer) {
//         return styles.optionTextCorrect;
//     }
//     if (selectedOption === index && selectedOption !== currentQuestion.correctAnswer) {
//         return styles.optionTextIncorrect;
//     }
//     return styles.optionText;
// };

// return (
//     <ScreenLayout title="Examen" showSidebar={false}>
//         {/* Cabecera superior personalizada con botón Finalizar */}
//         <View style={styles.headerContainer}>
//             <Text style={styles.headerTitle}>Examen</Text>
//             <Pressable style={styles.finishButton} onPress={() => handleFinishExam(false)}>
//                 <Text style={styles.finishButtonText}>✕  Finalizar test</Text>
//             </Pressable>
//         </View>

//         <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            
//             {/* 1. Card de Estado (Progreso e Indicador de Tiempo) */}
//             <View style={styles.statusCard}>
//                 <View style={styles.progressTextContainer}>
//                     <Text style={styles.progressTitle}>Pregunta {currentIndex + 1} de </Text>
//                     <Text style={styles.progressTotal}>{questions.length}</Text>
//                 </View>
                
//                 {/* Barra de progreso visual integrada */}
//                 <View style={styles.progressBarBackground}>
//                     <View 
//                         style={[
//                             styles.progressBarFill, 
//                             { width: `${((currentIndex + 1) / questions.length) * 100}%` }
//                         ]} 
//                     />
//                 </View>
                
//                 <Text style={styles.timerText}>🕒 {formatTime(timeLeft)}</Text>
//             </View>

//             {/* 2. Card de Enunciado y Opciones de Respuesta */}
//             <View style={styles.questionCard}>
//                 <Text style={styles.questionText}>
//                     Pregunta {currentIndex + 1}: {currentQuestion.question}
//                 </Text>

//                 {currentQuestion.options.map((option, index) => {
//                     const letter = String.fromCharCode(65 + index); // Genera A, B, C, D
//                     return (
//                         <Pressable 
//                             key={index} 
//                             style={getOptionStyle(index)} 
//                             onPress={() => handleSelectOption(index)}
//                         >
//                             <View style={getOptionCircleStyle(index)}>
//                                 <Text style={getOptionTextStyle(index)}>{letter}</Text>
//                             </View>
//                             <Text style={styles.optionLabel}>{option}</Text>
//                         </Pressable>
//                     );
//                 })}

//                 {/* 3. Tarjeta de Explicación (Solo visible con solución inmediata activa tras responder) */}
//                 {immediateSolution && isAnswered && currentQuestion.explanation && (
//                     <View style={styles.explanationCard}>
//                         <Text style={styles.explanationTitle}>Explicación:</Text>
//                         <Text style={styles.explanationText}>{currentQuestion.explanation}</Text>
//                     </View>
//                 )}
//             </View>

//             {/* 4. Barra de Acciones Inferior */}
//             <View style={styles.actionsContainer}>
//                 {immediateSolution && isAnswered ? (
//                     // Botón Siguiente en caso de Solución Inmediata activa
//                     <Pressable 
//                         style={[styles.primaryButton, { width: '100%' }]} 
//                         onPress={() => goToNextQuestion()}
//                     >
//                         <Text style={styles.primaryButtonText}>Siguiente  ➔</Text>
//                     </Pressable>
//                 ) : (
//                     // Botones normales de examen interactivo
//                     <>
//                         <Pressable 
//                             style={selectedOption !== null ? styles.primaryButton : styles.primaryButtonDisabled} 
//                             disabled={selectedOption === null}
//                             onPress={() => handleConfirmAnswer(false)}
//                         >
//                             <Text style={styles.primaryButtonText}>Responder  ➔</Text>
//                         </Pressable>

//                         <Pressable style={styles.secondaryButton} onPress={() => handleConfirmAnswer(true)}>
//                             <Text style={styles.secondaryButtonText}>Dejar en blanco</Text>
//                         </Pressable>
//                     </>
//                 )}
//             </View>

//         </ScrollView>
//     </ScreenLayout>
// );

//         }
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    scrollContainer: {
        padding: 16,
        backgroundColor: '#F8FAFC',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1D4ED8',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    finishButton: {
        backgroundColor: '#EF4444',
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
    },
    finishButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14,
    },
    statusCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    progressTextContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    progressTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1E293B',
    },
    progressTotal: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E293B',
    },
    progressBarBackground: {
        flex: 1,
        height: 6,
        backgroundColor: '#E2E8F0',
        borderRadius: 3,
        marginHorizontal: 12,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#3B82F6',
        borderRadius: 3,
    },
    timerText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E293B',
        fontFamily: 'monospace',
    },
    questionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 24,
    },
    questionText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0F172A',
        lineHeight: 24,
        marginBottom: 20,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        backgroundColor: '#FFFFFF',
    },
    optionCardSelected: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#3B82F6',
        borderRadius: 12,
        padding: 13,
        marginBottom: 12,
        backgroundColor: '#EFF6FF',
    },
    optionCardCorrect: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#10B981',
        borderRadius: 12,
        padding: 13,
        marginBottom: 12,
        backgroundColor: '#ECFDF5',
    },
    optionCardIncorrect: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#EF4444',
        borderRadius: 12,
        padding: 13,
        marginBottom: 12,
        backgroundColor: '#FEF2F2',
    },
    optionCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#94A3B8',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    optionCircleSelected: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    optionCircleCorrect: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#10B981',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    optionCircleIncorrect: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#EF4444',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    optionText: {
        fontSize: 14,
        color: '#475569',
        fontWeight: '600',
    },
    optionTextSelected: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    optionTextCorrect: {
        fontSize: 14,
        color: '#10B981',
        fontWeight: 'bold',
    },
    optionTextIncorrect: {
        fontSize: 14,
        color: '#EF4444',
        fontWeight: 'bold',
    },
    optionLabel: {
        fontSize: 15,
        color: '#334155',
        flex: 1,
    },
    explanationCard: {
        backgroundColor: '#EFF6FF',
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        borderLeftWidth: 4,
        borderLeftColor: '#3B82F6',
    },
    explanationTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1E40AF',
        marginBottom: 6,
    },
    explanationText: {
        fontSize: 13,
        color: '#1E3A8A',
        lineHeight: 18,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: '#2563EB',
        borderRadius: 12,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButtonDisabled: {
        flex: 1,
        backgroundColor: '#94A3B8',
        borderRadius: 12,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#CBD5E1',
    },
    secondaryButtonText: {
        color: '#475569',
        fontWeight: '600',
        fontSize: 15,
    },
});
