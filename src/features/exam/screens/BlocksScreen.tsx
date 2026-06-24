import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator, Switch } from 'react-native';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation';
import { styles } from '../styles/exam.styles';
import { useExamStore } from '../store/useExamStore';

interface BlocksScreenProps {
    route: RouteProp<RootStackParamList, 'BlocksScreen'>;
}

interface BlockItem {
    id: string; // Coincidirá con 'bloque_01', 'bloque_02', etc. de tu mock
    name: string;
    questionCount: number;
}

export function BlocksScreen({ route }: BlocksScreenProps) {
    const navigation = useNavigation<any>();

    // Recuperamos los parámetros obligatorios de navegación de la oposición
    const { opositionId, name } = route.params || { opositionId: '', name: 'Oposición' };

    // 1. Estados locales para la pantalla
    // Estado booleano para la solución inmediata
    const [immediateSolution, setImmediateSolution] = useState(false);
    const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]);
    const [blocks, setBlocks] = useState<BlockItem[]>([]);
    const [loadingBlocks, setLoadingBlocks] = useState<boolean>(true);

    const { loading } = useExamStore();

    // 2. Simulación de carga mapeando los IDs correctos ('bloque_01', 'bloque_02'...)
    useEffect(() => {
        const timer = setTimeout(() => {
            const mockBlocks: BlockItem[] = [
                { id: 'bloque_01', name: 'Bloque 1', questionCount: 25 },
                { id: 'bloque_02', name: 'Bloque 2', questionCount: 25 },
                { id: 'bloque_03', name: 'Bloque 3', questionCount: 25 },
                { id: 'bloque_04', name: 'Bloque 4', questionCount: 25 },
            ];
            setBlocks(mockBlocks);
            setLoadingBlocks(false);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    // 3. Manejador de selección múltiple de bloques
    const handleToggleBlock = (blockId: string) => {
        setSelectedBlocks((prevSelected) => {
            if (prevSelected.includes(blockId)) {
                return prevSelected.filter((id) => id !== blockId);
            } else {
                return [...prevSelected, blockId];
            }
        });
    };

    // 4. Acción para iniciar el test enviando los datos requeridos a tu TestScreen
    const handleStartTest = () => {
        if (selectedBlocks.length === 0) return;

        // Sumamos dinámicamente las preguntas basadas en los bloques elegidos
        const totalQuestions = selectedBlocks.reduce((acc, blockId) => {
            const block = blocks.find(b => b.id === blockId);
            return acc + (block ? block.questionCount : 0);
        }, 0);

        navigation.navigate('TestScreen', {
            opositionId: opositionId,
            name: name,
            setTime: totalQuestions, // 1 minuto por pregunta (ej: 3 bloques = 75 minutos)
            examType: 'blocks',
            immediateSolution: immediateSolution,
            titleParam: 'Test por Bloques',
            selectedBlocks: selectedBlocks // Array con ['bloque_01', 'bloque_04'] p. ej.
        });
    };

    if (loadingBlocks || loading) {
        return (
            <ScreenLayout title="Test por Bloques" showSidebar={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#2F70F2" />
                </View>
            </ScreenLayout>
        );
    }

    return (
        <ScreenLayout title="Test por Bloques" showSidebar={true}>
            <View style={styles.backButtonContainer}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()} // ← Te regresa automáticamente a la pantalla anterior (Login)
                >
                    <Text style={styles.backButtonText}>← Volver</Text>
                </Pressable>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Título de la oposición dinámico */}
                <Text style={styles.mainTitle}>{name}</Text>

                {/* Bloque del Interruptor Superior */}
                <View style={styles.toggleCard}>
                    <View style={styles.toggleHeader}>
                        <Ionicons
                            name={immediateSolution ? "eye-outline" : "eye-off-outline"}
                            size={20}
                            color={immediateSolution ? "#2F70F2" : "#64748B"}
                            style={{ marginRight: 8 }}
                        />
                        <Text style={styles.toggleTitle}>Mostrar solución inmediata</Text>
                        <Switch
                            value={immediateSolution}
                            onValueChange={setImmediateSolution}
                            trackColor={{ false: '#CBD5E1', true: '#2F70F2' }}
                            thumbColor="#FFFFFF"
                        />
                    </View>
                    <Text style={styles.toggleSubtitle}>
                        Si está activado, verás la respuesta correcta después de cada pregunta
                    </Text>
                </View>

                {/* Contenedor principal de la lista de bloques */}
                <View style={styles.blocksContainerCard}>
                    <Text style={styles.blocksContainerSubtitle}>Selecciona uno o varios bloques</Text>

                    {blocks.map((block) => {
                        const isChecked = selectedBlocks.includes(block.id);
                        return (
                            <Pressable
                                key={block.id}
                                style={[styles.blockRowCard, isChecked && styles.blockRowCardSelected]}
                                onPress={() => handleToggleBlock(block.id)}
                            >
                                <MaterialCommunityIcons
                                    name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
                                    size={24}
                                    color={isChecked ? "#2F70F2" : "#CBD5E1"}
                                    style={{ marginRight: 12 }}
                                />

                                <View style={styles.blockGridIconBox}>
                                    <MaterialCommunityIcons name="grid" size={22} color="#64748B" />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={styles.blockRowTitle}>{block.name}</Text>
                                    <Text style={styles.blockRowSub}>{block.questionCount} preguntas</Text>
                                </View>
                            </Pressable>
                        );
                    })}
                </View>

                {/* 🚀 BOTÓN INFERIOR DINÁMICO */}
                <View style={{ marginTop: 20, marginBottom: 30 }}>
                    <Pressable
                        style={selectedBlocks.length > 0 ? styles.primaryButton : styles.primaryButtonDisabled}
                        disabled={selectedBlocks.length === 0}
                        onPress={handleStartTest}
                    >
                        <Text style={styles.primaryButtonText}>
                            Iniciar Test ({selectedBlocks.length} {selectedBlocks.length === 1 ? 'bloque' : 'bloques'})
                        </Text>
                    </Pressable>
                </View>

            </ScrollView>
        </ScreenLayout>
    );
}
