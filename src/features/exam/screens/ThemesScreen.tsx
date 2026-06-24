import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator, Switch } from 'react-native';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation';
import { styles } from '../styles/exam.styles';
import { useExamStore } from '../store/useExamStore';

interface ThemesScreenProps {
    route: RouteProp<RootStackParamList, 'ThemesScreen'>;
}

interface ThemeItem {
    id: string; // Ej: 'theme_01'
    name: string;
    questionCount: number;
}

interface BlockGroup {
    id: string; // Ej: 'block_01'
    name: string;
    themes: ThemeItem[];
}

export function ThemesScreen({ route }: ThemesScreenProps) {
    const navigation = useNavigation<any>();

    // Recuperamos los parámetros de la oposición
    const { opositionId, name } = route.params || { opositionId: '', name: 'Oposición' };

    // 1. Estados locales utilizando nomenclatura en inglés
    const [immediateSolution, setImmediateSolution] = useState(false);
    const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
    const [structure, setStructure] = useState<BlockGroup[]>([]);
    const [loadingThemes, setLoadingThemes] = useState<boolean>(true);

    const { loading } = useExamStore();

    // 2. Simulación de carga estructurando los 4 blocks solicitados
    useEffect(() => {
        const timer = setTimeout(() => {
            // Configuración exacta: Block 1 (9), Block 2 (5), Block 3 (10), Block 4 (9)
            const config = [
                { blockNum: 1, totalThemes: 9, startFrom: 1 },
                { blockNum: 2, totalThemes: 5, startFrom: 10 },
                { blockNum: 3, totalThemes: 10, startFrom: 15 },
                { blockNum: 4, totalThemes: 9, startFrom: 25 },
            ];

            const mockStructure: BlockGroup[] = config.map(({ blockNum, totalThemes, startFrom }) => {
                const themes: ThemeItem[] = Array.from({ length: totalThemes }, (_, i) => {
                    const currentThemeNum = startFrom + i;
                    const idFormatted = currentThemeNum < 10 ? `0${currentThemeNum}` : `${currentThemeNum}`;

                    // Simulación del contador de preguntas adaptado al diseño de la imagen
                    const questionCount = 10 + (currentThemeNum % 6);

                    return {
                        id: `theme_${idFormatted}`,
                        name: `Tema ${currentThemeNum}`,
                        questionCount
                    };
                });

                return {
                    id: `block_0${blockNum}`,
                    name: `Bloque ${blockNum}`,
                    themes
                };
            });

            setStructure(mockStructure);
            setLoadingThemes(false);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    // 3. Manejador de selección múltiple de themes
    const handleToggleTheme = (themeId: string) => {
        setSelectedThemes((prevSelected) => {
            if (prevSelected.includes(themeId)) {
                return prevSelected.filter((id) => id !== themeId);
            } else {
                return [...prevSelected, themeId];
            }
        });
    };

    // 4. Navegación al iniciar el test calculando la suma de preguntas
    const handleStartTest = () => {
        if (selectedThemes.length === 0) return;

        let totalQuestions = 0;
        structure.forEach(block => {
            block.themes.forEach(theme => {
                if (selectedThemes.includes(theme.id)) {
                    totalQuestions += theme.questionCount;
                }
            });
        });

        navigation.navigate('TestScreen', {
            opositionId: opositionId,
            name: name,
            setTime: totalQuestions, // 1 minuto por pregunta basada en los themes elegidos
            examType: 'themes',
            immediateSolution: immediateSolution,
            titleParam: 'Test por Temas',
            selectedThemes: selectedThemes // Array resultante ['theme_01', 'theme_02'...]
        });
    };

    if (loadingThemes || loading) {
        return (
            <ScreenLayout title="Test por Temas" showSidebar={true}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#2F70F2" />
                </View>
            </ScreenLayout>
        );
    }

    return (
        <ScreenLayout title="Test por Temas" showSidebar={true}>
            <View style={styles.backButtonContainer}>
                <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>← Volver</Text>
                </Pressable>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Título de la oposición dinámico */}
                <Text style={styles.mainTitle}>{name}</Text>

                {/* Interruptor Superior */}
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

                {/* Mapeado y renderizado agrupado por Blocks como se muestra en la imagen */}
                {structure.map((block) => (
                    <View key={block.id} style={{ marginBottom: 20 }}>
                        {/* Título de la sección del Block */}
                        <Text style={[styles.blockRowTitle, { fontSize: 17, marginBottom: 10, paddingLeft: 4, fontWeight: '700' }]}>
                            {block.name}
                        </Text>

                        {/* Tarjeta contenedora de las filas de los themes pertenecientes a este block */}
                        <View style={[styles.blocksContainerCard, { marginTop: 0, paddingVertical: 6 }]}>
                            {block.themes.map((theme) => {
                                const isChecked = selectedThemes.includes(theme.id);
                                return (
                                    <Pressable
                                        key={theme.id}
                                        style={[
                                            styles.blockRowCard,
                                            isChecked && styles.blockRowCardSelected,
                                            { marginVertical: 6 }
                                        ]}
                                        onPress={() => handleToggleTheme(theme.id)}
                                    >
                                        {/* Checkbox Icon */}
                                        <MaterialCommunityIcons
                                            name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
                                            size={24}
                                            color={isChecked ? "#2F70F2" : "#CBD5E1"}
                                            style={{ marginRight: 12 }}
                                        />

                                        {/* Icono de lista para Theme */}
                                        <View style={styles.blockGridIconBox}>
                                            <MaterialCommunityIcons name="format-list-bulleted" size={22} color="#64748B" />
                                        </View>

                                        {/* Datos del Theme */}
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.blockRowTitle}>{theme.name}</Text>
                                            <Text style={styles.blockRowSub}>{theme.questionCount} preguntas</Text>
                                        </View>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                ))}

                {/* Botón de acción reactivo al número de elementos seleccionados */}
                <View style={{ marginTop: 10, marginBottom: 30 }}>
                    <Pressable
                        style={selectedThemes.length > 0 ? styles.primaryButton : styles.primaryButtonDisabled}
                        disabled={selectedThemes.length === 0}
                        onPress={handleStartTest}
                    >
                        <Text style={styles.primaryButtonText}>
                            Iniciar Test ({selectedThemes.length} {selectedThemes.length === 1 ? 'tema' : 'temas'})
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </ScreenLayout>
    );
}
