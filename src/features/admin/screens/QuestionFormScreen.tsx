import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Pressable
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/navigation';
import { FirebaseQuestion } from '@/features/admin/types/question';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';

type QuestionFormRouteProp = RouteProp<RootStackParamList, 'QuestionForm'>;
type QuestionFormNavProp = NativeStackNavigationProp<RootStackParamList, 'QuestionForm'>;

const mapIndexToLetter = (index: number): string => {
    const letters = ['A', 'B', 'C', 'D'];
    return letters[index] || 'A';
};

const mapLetterToIndex = (letter: string): number => {
    const mapping: { [key: string]: number } = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    return mapping[letter.toUpperCase()] ?? 0;
};

export const QuestionFormScreen = () => {
    const route = useRoute<QuestionFormRouteProp>();
    const navigation = useNavigation<QuestionFormNavProp>();

    const { idDocument, nombreOposicion, questionData } = route.params;
    const isEditMode = !!questionData;
    const screenTitle = isEditMode ? 'Editar Pregunta' : 'Nueva Pregunta';

    // Estados locales del formulario mapeados al esquema indexado de tu BD
    const [blockId, setBlockId] = useState(questionData?.blockId || '');
    const [temaId, setTemaId] = useState(questionData?.temaId || '');
    const [questionText, setQuestionText] = useState(questionData?.question || '');

    // Extraemos las opciones desde los índices correspondientes del array de la BD
    const [opcionA, setOpcionA] = useState(questionData?.options?.[0] || '');
    const [opcionB, setOpcionB] = useState(questionData?.options?.[1] || '');
    const [opcionC, setOpcionC] = useState(questionData?.options?.[2] || '');
    const [opcionD, setOpcionD] = useState(questionData?.options?.[3] || '');

    const [respuestaCorrecta, setRespuestaCorrecta] = useState(
        questionData ? mapIndexToLetter(questionData.correctAnswer) : 'A'
    );

    const [explanation, setExplanation] = useState(questionData?.explanation || '');

    // Parámetros internos ficticios del examen oficial
    const [esOficial] = useState(questionData?.esOficial || false);
    const [examYear] = useState(questionData?.examYear || 2026);
    const [examConvocatoria] = useState(questionData?.examConvocatoria || 'Libre');

    const handleGuardar = () => {
        if (!blockId || !temaId || !questionText || !opcionA || !opcionB || !opcionC || !opcionD || !explanation) {
            Alert.alert('Campos obligatorios', 'Por favor, completa todos los campos del formulario.');
            return;
        }

        const payload: FirebaseQuestion = {
            oppositionId: idDocument,
            blockId,
            temaId,
            question: questionText,
            options: [opcionA, opcionB, opcionC, opcionD],
            correctAnswer: mapLetterToIndex(respuestaCorrecta),
            explanation,
            randomId: questionData?.randomId || Math.random(),
            esOficial,
            examYear,
            examConvocatoria
        };

        if (isEditMode) {
            console.log(`[MOCK BD] Actualizando documento con ID: ${questionData.id}`, payload);
        } else {
            console.log('[MOCK BD] Insertando nuevo documento en colección "preguntas":', payload);
        }

        navigation.goBack();
    };

    const handleEliminar = () => {
        Alert.alert(
            'Eliminar pregunta',
            '¿Estás seguro de que deseas eliminar permanentemente esta pregunta?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: () => {
                        console.log(`[MOCK BD] Borrando documento en "preguntas" con ID: ${questionData?.id}`);
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    return (
        <ScreenLayout title={screenTitle}>
            <Pressable
                // style={styles.backButton}
                onPress={() => navigation.goBack()} // ← Te regresa automáticamente a la pantalla anterior (Login)
            >
                <Text
                // style={styles.backButtonText}
                >← Volver</Text>
            </Pressable>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                <Text style={styles.subHeader}>
                    Oposición: <Text style={styles.boldText}>{nombreOposicion}</Text>
                </Text>

                <View style={styles.card}>

                    <Text style={styles.label}>Bloque *</Text>
                    <TextInput style={styles.input} value={blockId} onChangeText={setBlockId} placeholder="Seleccionar bloque" />

                    <Text style={styles.label}>Tema *</Text>
                    <TextInput style={styles.input} value={temaId} onChangeText={setTemaId} placeholder="Seleccionar tema" />

                    <Text style={styles.label}>Texto de la pregunta *</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={questionText}
                        onChangeText={setQuestionText}
                        placeholder="Escribe la pregunta aquí..."
                        multiline
                        numberOfLines={3}
                    />

                    <Text style={styles.label}>Opciones de respuesta *</Text>

                    <View style={styles.optionContainer}>
                        <View style={styles.optionBadge}><Text style={styles.optionBadgeText}>A</Text></View>
                        <TextInput style={styles.optionInput} value={opcionA} onChangeText={setOpcionA} placeholder="Texto respuesta A" />
                    </View>

                    <View style={styles.optionContainer}>
                        <View style={styles.optionBadge}><Text style={styles.optionBadgeText}>B</Text></View>
                        <TextInput style={styles.optionInput} value={opcionB} onChangeText={setOpcionB} placeholder="Texto respuesta B" />
                    </View>

                    <View style={styles.optionContainer}>
                        <View style={styles.optionBadge}><Text style={styles.optionBadgeText}>C</Text></View>
                        <TextInput style={styles.optionInput} value={opcionC} onChangeText={setOpcionC} placeholder="Texto respuesta C" />
                    </View>

                    <View style={styles.optionContainer}>
                        <View style={styles.optionBadge}><Text style={styles.optionBadgeText}>D</Text></View>
                        <TextInput style={styles.optionInput} value={opcionD} onChangeText={setOpcionD} placeholder="Texto respuesta D" />
                    </View>

                    <Text style={styles.label}>Respuesta correcta *</Text>
                    <TextInput
                        style={styles.input}
                        value={respuestaCorrecta}
                        onChangeText={(txt) => setRespuestaCorrecta(txt.toUpperCase())}
                        placeholder="A, B, C o D"
                        maxLength={1}
                        autoCapitalize="characters"
                    />

                    <Text style={styles.label}>Explicación *</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={explanation}
                        onChangeText={setExplanation}
                        placeholder="Explica por qué esta es la respuesta correcta..."
                        multiline
                        numberOfLines={4}
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.btn, styles.btnGuardar]} onPress={handleGuardar}>
                            <Text style={styles.btnTextGuardar}>💾 Guardar</Text>
                        </TouchableOpacity>

                        {isEditMode && (
                            <TouchableOpacity style={[styles.btn, styles.btnEliminar]} onPress={handleEliminar}>
                                <Text style={styles.btnTextEliminar}>🗑️ Eliminar</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity style={[styles.btn, styles.btnCancelar]} onPress={() => navigation.goBack()}>
                            <Text style={styles.btnTextCancelar}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </ScreenLayout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    contentContainer: { paddingHorizontal: 16, paddingBottom: 32, paddingTop: 8 },
    subHeader: { fontSize: 18, color: '#333333', marginBottom: 16 },
    boldText: { fontWeight: 'bold' },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    label: { fontSize: 14, fontWeight: '600', color: '#495057', marginTop: 14, marginBottom: 6 },
    input: {
        borderWidth: 1,
        borderColor: '#CED4DA',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        backgroundColor: '#FAFAFA',
        color: '#212529',
    },
    textArea: { textAlignVertical: 'top', minHeight: 80 },
    optionContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    optionBadge: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E8F0FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    optionBadgeText: { color: '#1A73E8', fontWeight: 'bold' },
    optionInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CED4DA',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        backgroundColor: '#FAFAFA',
        color: '#212529',
    },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, gap: 8 },
    btn: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
    btnGuardar: { backgroundColor: '#00A650' },
    btnEliminar: { backgroundColor: '#D90404' },
    btnCancelar: { borderWidth: 1, borderColor: '#CED4DA', backgroundColor: '#FFFFFF' },
    btnTextGuardar: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 },
    btnTextEliminar: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 13 },
    btnTextCancelar: { color: '#495057', fontSize: 13 },
    backButton: {
        paddingVertical: 8,
        paddingRight: 16, // Espacio interactivo hacia la derecha
    },
});
