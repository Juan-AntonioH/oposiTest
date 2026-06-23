import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Alert,
    Pressable
} from 'react-native';
import { styles } from '@/features/exam/styles/exam.styles';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dropdown } from 'react-native-element-dropdown';

import { RootStackParamList } from '@/navigation';
import { FirebaseQuestion } from '@/features/admin/types/question';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';

// Interfaz para los elementos del desplegable
interface DropdownItem {
    label: string;
    value: string;
}

type QuestionFormRouteProp = RouteProp<RootStackParamList, 'QuestionForm'>;
type QuestionFormNavProp = NativeStackNavigationProp<RootStackParamList, 'QuestionForm'>;

// Única constante estática requerida para las respuestas
const RESPUESTAS: DropdownItem[] = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
];

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

    // Estados locales del formulario
    const [blockId, setBlockId] = useState(questionData?.blockId || '');
    const [temaId, setTemaId] = useState(questionData?.temaId || '');
    const [questionText, setQuestionText] = useState(questionData?.question || '');

    const [opcionA, setOpcionA] = useState(questionData?.options?.[0] || '');
    const [opcionB, setOpcionB] = useState(questionData?.options?.[1] || '');
    const [opcionC, setOpcionC] = useState(questionData?.options?.[2] || '');
    const [opcionD, setOpcionD] = useState(questionData?.options?.[3] || '');

    const [respuestaCorrecta, setRespuestaCorrecta] = useState(
        questionData ? mapIndexToLetter(questionData.correctAnswer) : 'A'
    );

    const [explanation, setExplanation] = useState(questionData?.explanation || '');
    const [esOficial] = useState(questionData?.esOficial || false);
    const [examYear] = useState(questionData?.examYear || 2026);
    const [examConvocatoria] = useState(questionData?.examConvocatoria || 'Libre');

    // ==========================================
    // LÓGICA DINÁMICA DE RELLENO AUTOMÁTICO
    // ==========================================

    const totalBloquesOposicion = 8;
    const totalTemasOposicion = 15;

    // 1. Generar lista de Bloques automáticamente (1 al total)
    const datosBloques = (() => {
        const lista = Array.from({ length: totalBloquesOposicion }, (_, i) => {
            const num = i + 1;
            const idFormateado = num < 10 ? `0${num}` : `${num}`;
            return {
                label: `Bloque ${num}`,
                value: `bloque_${idFormateado}`
            };
        });

        if (blockId && !lista.some(b => b.value === blockId)) {
            const numero = blockId.match(/\d+/) ? parseInt(blockId.match(/\d+/)![0], 10) : blockId;
            lista.push({ label: `Bloque ${numero}`, value: blockId });
        }
        return lista;
    })();

    // 2. Generar lista de Temas automáticamente (1 al total, soporta 15 o más)
    const datosTemas = (() => {
        const lista = Array.from({ length: totalTemasOposicion }, (_, i) => {
            const num = i + 1;
            const idFormateado = num < 10 ? `0${num}` : `${num}`;
            return {
                label: `Tema ${num}`,
                value: `tema_${idFormateado}`
            };
        });

        if (temaId && !lista.some(t => t.value === temaId)) {
            const numero = temaId.match(/\d+/) ? parseInt(temaId.match(/\d+/)![0], 10) : temaId;
            lista.push({ label: `Tema ${numero}`, value: temaId });
        }

        return lista.sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }));
    })();

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
            <View style={styles.backButtonContainer}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()} // ← Te regresa automáticamente a la pantalla anterior (Login)
                >
                    <Text style={styles.backButtonText}>← Volver</Text>
                </Pressable>
            </View>

            <ScrollView style={styles.containerQuestion} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.subHeader}>
                    Categoría: <Text style={styles.boldText}>{nombreOposicion || 'Matemáticas'}</Text>
                </Text>

                <View style={styles.cardQuestion}>
                    {/* DESPLEGABLE: BLOQUE */}
                    <Text style={styles.label}>Bloque *</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        data={datosBloques}
                        labelField="label"
                        valueField="value"
                        placeholder="Seleccionar bloque"
                        value={blockId}
                        onChange={(item: DropdownItem) => setBlockId(item.value)} // Corrección TS aquí
                    />

                    {/* DESPLEGABLE: TEMA */}
                    <Text style={styles.label}>Tema *</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        data={datosTemas}
                        labelField="label"
                        valueField="value"
                        placeholder="Seleccionar tema"
                        value={temaId}
                        onChange={(item: DropdownItem) => setTemaId(item.value)} // Corrección TS aquí
                    />

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

                    {/* DESPLEGABLE: RESPUESTA CORRECTA */}
                    <Text style={styles.label}>Respuesta correcta *</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        data={RESPUESTAS}
                        labelField="label"
                        valueField="value"
                        placeholder="Seleccionar respuesta"
                        value={respuestaCorrecta}
                        onChange={(item: DropdownItem) => setRespuestaCorrecta(item.value)} // Corrección TS aquí
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

                    {/* BOTONERA INFERIOR ESTILIZADA COMO LA IMAGEN */}


                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.btnQuestion, styles.btnGuardar]} onPress={handleGuardar}>
                            <Text style={styles.btnTextGuardar}>💾 Guardar</Text>
                        </TouchableOpacity>

                        {isEditMode && (
                            <TouchableOpacity style={[styles.btnQuestion, styles.btnEliminar]} onPress={handleEliminar}>
                                <Text style={styles.btnTextEliminar}>🗑️ Eliminar</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity style={[styles.btnQuestion, styles.btnCancelar]} onPress={() => navigation.goBack()}>
                            <Text style={styles.btnTextCancelar}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </ScreenLayout>
    );
};