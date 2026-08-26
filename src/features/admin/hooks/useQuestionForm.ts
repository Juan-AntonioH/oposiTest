import {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getNextQuestionId,
} from '../services/questionService';

import {
    Question,
} from '../types';

import Toast from 'react-native-toast-message';

export function useQuestionForm(
    navigation: {
        goBack: () => void;
    },
    question?: Question,
) {

    const isEditing =
        !!question;

    async function saveQuestion(
        questionToSave: Question,
    ) {

        try {

            if (isEditing) {

                await updateQuestion(
                    questionToSave,
                );

                Toast.show({

                    type: 'success',

                    text1: 'Pregunta actualizada',

                    text2: `La pregunta ${questionToSave.idDocument} se ha actualizado correctamente.`,
                });

            } else {

                const nextId =
                    await getNextQuestionId();

                await createQuestion({

                    ...questionToSave,

                    idDocument: nextId,

                });

                Toast.show({

                    type: 'success',

                    text1: 'Pregunta creada',

                    text2: `Se ha creado correctamente la pregunta ${nextId}.`,

                });

            }

            navigation.goBack();

        } catch (error) {

            console.error(error);

            Toast.show({

                type: 'error',

                text1: 'Error al guardar',

                text2: 'No se pudo guardar la pregunta.',

            });

        }

    }

    async function removeQuestion() {

        if (!question) {
            return;
        }

        try {

            await deleteQuestion(
                question.idDocument,
            );

            Toast.show({

                type: 'success',

                text1: 'Pregunta desactivada',

                text2: `La pregunta ${question.idDocument} ya no estará disponible para los usuarios.`,

            });

            navigation.goBack();

        } catch (error) {

            console.error(error);

            Toast.show({

                type: 'error',

                text1: 'Error al desactivar',

                text2: 'No se pudo desactivar la pregunta.',

            });

        }

    }

    function cancel() {

        navigation.goBack();

    }

    return {

        actions: {

            isEditing,

            saveQuestion,

            deleteQuestion: removeQuestion,

            cancel,

        },

    };

}