import React from 'react';

import {
    Pressable,
    Text,
} from 'react-native';

import {
    MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
    styles,
} from '../../styles/exam.styles';

interface ReviewAdminActionsProps {

    visible: boolean;

    onEdit: () => void;

}

export function ReviewAdminActions({

    visible,

    onEdit,

}: ReviewAdminActionsProps) {

    if (!visible) {

        return null;

    }

    return (

        <Pressable
            style={styles.adminEditButton}
            android_ripple={{
                color: '#1C54C4',
            }}
            onPress={onEdit}
        >

            <MaterialCommunityIcons
                name="square-edit-outline"
                size={20}
                color="#FFFFFF"
            />

            <Text
                style={styles.adminButtonText}
            >
                Editar pregunta
            </Text>

        </Pressable>

    );

}