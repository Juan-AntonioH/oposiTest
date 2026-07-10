import React from 'react';
import {
    View,
    Text,
    FlatList,
    Pressable,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { ScreenState } from '@/shared/components/ScreenState/ScreenState';

import { OppositionCard } from '../components/OppositionCard/OppositionCard';
import { useOppositions } from '../hooks/useOppositions';
import { styles } from '../styles/exam.styles';

interface OppositionsScreenProps {
    navigation: {
        navigate: (screen: string, params?: object) => void;
    };
}

export function OppositionsScreen({
    navigation,
}: OppositionsScreenProps) {

    const {
        oppositions,
        loading,
        error,
        reload,
    } = useOppositions();

    return (
        <ScreenLayout title="Oposiciones">

            <View style={styles.backButtonContainer}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Dashboard')}
                >
                    <Text style={styles.backButtonText}>
                        ← Volver
                    </Text>
                </Pressable>
            </View>

            <ScreenState
                loading={loading}
                error={error}
                isEmpty={oppositions.length === 0}
                emptyText="No hay oposiciones disponibles."
                onRetry={reload}
            >
                <FlatList
                    data={oppositions}
                    keyExtractor={(item) => item.idDocument}
                    renderItem={({ item }) => (
                        <OppositionCard
                            opposition={item}
                            onPress={() =>
                                navigation.navigate('OppositionScreen', {
                                    idDocument: item.idDocument,
                                    code: item.code,
                                    name: item.name,
                                })
                            }
                        />
                    )}
                    contentContainerStyle={styles.listContainer}
                    ListHeaderComponent={
                        <View style={styles.headerContainer}>
                            <View style={styles.titleRow}>
                                <MaterialCommunityIcons
                                    name="grid"
                                    size={32}
                                    color="#1C2434"
                                />

                                <Text style={styles.mainTitle}>
                                    Oposiciones
                                </Text>
                            </View>

                            <Text style={styles.mainSubtitle}>
                                Selecciona una oposición para empezar a estudiar
                            </Text>
                        </View>
                    }
                />
            </ScreenState>

        </ScreenLayout>
    );
}