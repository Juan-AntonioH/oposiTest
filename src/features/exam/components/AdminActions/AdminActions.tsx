import React from 'react';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

import {
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons';

import { styles } from '../../styles/exam.styles';
import { useAuthStore } from '@/store/authStore';
import { canManageQuestions } from '@/features/auth/utils/permissions';
import { colors } from '@/core/theme/colors';

interface AdminActionsProps {
    navigation: any;
    idDocument: string;
    code: string;
    name: string;
}

export function AdminActions({
    navigation,
    idDocument,
    code,
    name,
}: AdminActionsProps) {
    const role = useAuthStore((state) => state.role);

    if (!canManageQuestions(role)) {
        return null;
    }
    function handleAddQuestion() {

        navigation.navigate('QuestionFormScreen', {
            idDocument,
            nombreOposicion: name,
        });

    }

    function handleEditQuestions() {

        navigation.navigate('QuestionsListScreen', {
            idDocument,
            name: name,
            code: code,
        });

    }

    return (

        <View style={styles.adminActionContainer}>

            <Pressable
                style={[styles.btn, { backgroundColor: colors.success }]}
                android_ripple={{ color: colors.successDark }}
                onPress={handleAddQuestion}
            >
                <MaterialIcons
                    name="add"
                    size={20}
                    color="#FFF"
                />

                <Text style={styles.btnText}>
                    Añadir pregunta
                </Text>
            </Pressable>

            <Pressable
                style={[styles.btn, { backgroundColor: colors.primary }]}
                android_ripple={{ color: colors.primaryDark }}
                onPress={handleEditQuestions}
            >
                <MaterialCommunityIcons
                    name="square-edit-outline"
                    size={18}
                    color="#FFF"
                />

                <Text style={styles.btnText}>
                    Editar preguntas
                </Text>
            </Pressable>

        </View>

    );

}