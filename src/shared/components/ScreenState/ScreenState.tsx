import React from 'react';
import {
    ActivityIndicator,
    Text,
    View,
} from 'react-native';

import { colors } from '@/core/theme';

import { CustomButton } from '@/shared/components/Button/CustomButton';

import { styles } from './ScreenState.styles';

interface ScreenStateProps {

    loading: boolean;

    error: string | null;

    children: React.ReactNode;

    loadingText?: string;

    isEmpty?: boolean;

    emptyText?: string;

    onRetry?: () => void;

}

export function ScreenState({

    loading,

    error,

    children,

    loadingText = 'Cargando...',

    isEmpty = false,

    emptyText = 'No hay datos disponibles.',

    onRetry,

}: ScreenStateProps) {

    if (loading) {

        return (
            <View style={styles.container}>
                <ActivityIndicator
                    size="large"
                    color={colors.primary}
                />

                <Text style={styles.text}>
                    {loadingText}
                </Text>
            </View>
        );
    }

    if (error) {

        return (
            <View style={styles.container}>

                <Text style={styles.errorText}>
                    {error}
                </Text>

                {onRetry && (
                    <CustomButton
                        title="Reintentar"
                        onPress={onRetry}
                    />
                )}

            </View>
        );
    }

    if (isEmpty) {

        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {emptyText}
                </Text>
            </View>
        );
    }

    return <>{children}</>;
}