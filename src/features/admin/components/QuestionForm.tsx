import React, { useState } from 'react';

import {

    ANSWERS,

    mapIndexToLetter,

    mapLetterToIndex,

} from '../utils/questionForm.utils';
import {

    NumberDropdown,

} from '@/features/exam/components/selectors/NumberDropdown';

import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    Dropdown,
} from 'react-native-element-dropdown';

import {
    MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
    Question,
} from '../types/question';

import {
    styles,
} from '@/features/exam/styles/exam.styles';
import { buildQuestion } from '../utils/questionMapper';
import { useOppositionStructure } from '@/features/exam/hooks/useOppositionStructure';

interface QuestionFormProps {

    question?: Question;

    actions: {

        isEditing: boolean;

        saveQuestion: (
            question: Question,
        ) => void;

        deleteQuestion: () => void;

        cancel: () => void;

    };

}

export function QuestionForm({

    question,

    actions,

}: QuestionFormProps) {

    /* -------------------------------------------------------------------------- */
    /*                                   STATES                                   */
    /* -------------------------------------------------------------------------- */

    const [blockId, setBlockId] =
        useState(
            question?.blockId ?? '',
        );

    const [themeId, setThemeId] =
        useState(
            question?.themeId ?? '',
        );

    const [questionText, setQuestionText] =
        useState(
            question?.question ?? '',
        );

    const [options, setOptions] = useState<string[]>([
        question?.options?.[0] ?? '',
        question?.options?.[1] ?? '',
        question?.options?.[2] ?? '',
        question?.options?.[3] ?? '',
    ]);

    const updateOption = (
        index: number,
        value: string,
    ) => {

        setOptions(previous => {

            const next = [...previous];

            next[index] = value;

            return next;

        });

    };
    const [correctAnswer, setCorrectAnswer] =
        useState(
            question
                ? mapIndexToLetter(
                    question.correctAnswer,
                )
                : 'A',
        );

    const [explanation, setExplanation] =
        useState(
            question?.explanation ?? '',
        );

    /* -------------------------------------------------------------------------- */
    /*                                 DROPDOWNS                                  */
    /* -------------------------------------------------------------------------- */
    const {

        numBlocks,

        numThemes,

    } = useOppositionStructure(

        question?.oppositionId ?? '',

        blockId,

    );

    // const blockItems =
    //     buildBlockItems(blockId);

    // const themeItems =
    //     buildThemeItems(themeId);

    /* -------------------------------------------------------------------------- */
    /*                                  HANDLERS                                  */
    /* -------------------------------------------------------------------------- */

    const handleGuardar =
        () => {
            if (

                !blockId ||

                !themeId ||

                !questionText.trim() ||

                options.some(option => !option.trim()) ||

                !explanation.trim()

            ) {

                Alert.alert(

                    'Campos obligatorios',

                    'Completa todos los campos.',

                );

                return;

            }

            const questionToSave =
                buildQuestion({

                    question,

                    blockId,

                    themeId,

                    questionText,

                    options,

                    correctAnswer:
                        mapLetterToIndex(correctAnswer),

                    explanation,

                });

            actions.saveQuestion(
                questionToSave,
            );

        };

    const handleEliminar =
        () => {

            Alert.alert(

                'Eliminar pregunta',

                '¿Estás seguro de que deseas eliminar permanentemente esta pregunta?',

                [

                    {
                        text: 'Cancelar',

                        style: 'cancel',

                    },

                    {

                        text: 'Eliminar',

                        style: 'destructive',

                        onPress: () => {

                            actions.deleteQuestion();

                        },

                    },

                ],

            );

        };

    /* -------------------------------------------------------------------------- */
    /*                                     JSX                                    */
    /* -------------------------------------------------------------------------- */

    return (

        <>

            <ScrollView
                style={styles.containerQuestion}
                contentContainerStyle={styles.contentContainer}
            >

                <View style={styles.cardQuestion}>

                    {/* ----------------------------- BLOQUE ----------------------------- */}

                    <NumberDropdown
                        label="Bloque"
                        required
                        prefix="bloque"
                        count={numBlocks}
                        value={blockId}
                        onChange={setBlockId}
                    />

                    {/* ------------------------------ TEMA ------------------------------ */}

                    <NumberDropdown
                        label="Tema"
                        required
                        prefix="tema"
                        count={numThemes}
                        value={themeId}
                        onChange={setThemeId}
                    />

                    {/* ---------------------------- PREGUNTA --------------------------- */}

                    <Text style={styles.label}>
                        Texto de la pregunta *
                    </Text>

                    <TextInput
                        style={[
                            styles.input,
                            styles.textArea,
                        ]}
                        value={questionText}
                        onChangeText={setQuestionText}
                        placeholder="Escribe la pregunta aquí..."
                        multiline
                        numberOfLines={3}
                    />

                    {/* ----------------------------- OPCIONES ----------------------------- */}

                    <Text style={styles.label}>
                        Opciones de respuesta *
                    </Text>

                    {options.map((option, index) => (

                        <View
                            key={index}
                            style={styles.optionContainer}
                        >

                            <View style={styles.optionBadge}>

                                <Text style={styles.optionBadgeText}>
                                    {String.fromCharCode(65 + index)}
                                </Text>

                            </View>

                            <TextInput
                                style={styles.optionInput}
                                value={option}
                                onChangeText={(text) =>
                                    updateOption(index, text)
                                }
                                placeholder={`Texto respuesta ${String.fromCharCode(65 + index)}`}
                                multiline
                                numberOfLines={3}
                            />

                        </View>

                    ))}

                    {/* ---------------------- RESPUESTA CORRECTA ----------------------- */}

                    <Text style={styles.label}>
                        Respuesta correcta *
                    </Text>

                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        data={ANSWERS}
                        labelField="label"
                        valueField="value"
                        placeholder="Seleccionar respuesta"
                        value={correctAnswer}
                        onChange={(item) =>
                            setCorrectAnswer(item.value)
                        }
                    />

                    {/* --------------------------- EXPLICACIÓN -------------------------- */}

                    <Text style={styles.label}>
                        Explicación *
                    </Text>

                    <TextInput
                        style={[
                            styles.input,
                            styles.textArea,
                        ]}
                        value={explanation}
                        onChangeText={setExplanation}
                        placeholder="Explica por qué esta es la respuesta correcta..."
                        multiline
                        numberOfLines={4}
                    />

                    {/* ----------------------------- BOTONES ----------------------------- */}

                    <View style={styles.buttonRow}>

                        <TouchableOpacity
                            style={[
                                styles.btnQuestion,
                                styles.btnGuardar,
                            ]}
                            onPress={handleGuardar}
                        >

                            <Text style={styles.btnTextGuardar}>
                                💾 Guardar
                            </Text>

                        </TouchableOpacity>

                        {actions.isEditing && (

                            <TouchableOpacity
                                style={[
                                    styles.btnQuestion,
                                    styles.btnEliminar,
                                ]}
                                onPress={handleEliminar}
                            >

                                <Text style={styles.btnTextEliminar}>
                                    🗑️ Eliminar
                                </Text>

                            </TouchableOpacity>

                        )}

                        <TouchableOpacity
                            style={[
                                styles.btnQuestion,
                                styles.btnCancelar,
                            ]}
                            onPress={actions.cancel}
                        >

                            <Text style={styles.btnTextCancelar}>
                                Cancelar
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </ScrollView>

        </>

    );

}