import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Switch } from 'react-native';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { styles } from '../styles/exam.styles';
import { RootStackParamList } from '@/navigation';

interface CustomTestScreenProps {
    route: RouteProp<RootStackParamList, 'CustomTestScreen'>;
}

interface ThemeItem {
    id: string;
    name: string;
    questionCount: number;
}

interface BlockGroup {
    id: string;
    name: string;
    questionCount: number;
    themes: ThemeItem[];
}

export function CustomTestScreen({ route }: CustomTestScreenProps) {
    const navigation = useNavigation<any>();
    const { opositionId, name } = route.params || { opositionId: '', name: 'Oposición' };
    // 1. Configuración de inputs (20 por defecto)
    const [questionCount, setQuestionCount] = useState<number>(20);
    const [timeLimit, setTimeLimit] = useState<number>(20);
    const [immediateSolution, setImmediateSolution] = useState<boolean>(false);

    // 2. Selección de bloques y temas
    const [selectedBlocks, setSelectedBlocks] = useState<string[]>([]); // Mock inicial de la imagen
    const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

    // Estructura completa de datos fija en inglés
    const staticStructure: BlockGroup[] = [
        {
            id: 'block_01',
            name: 'Bloque 1',
            questionCount: 25,
            themes: [
                { id: 'theme_01', name: 'Tema 1', questionCount: 10 },
                { id: 'theme_02', name: 'Tema 2', questionCount: 15 },
                { id: 'theme_03', name: 'Tema 3', questionCount: 12 },
            ]
        },
        {
            id: 'block_02',
            name: 'Bloque 2',
            questionCount: 25,
            themes: [
                { id: 'theme_04', name: 'Tema 4', questionCount: 25 },
            ]
        },
        {
            id: 'block_03',
            name: 'Bloque 3',
            questionCount: 25,
            themes: [
                { id: 'theme_05', name: 'Tema 5', questionCount: 11 },
                { id: 'theme_06', name: 'Tema 6', questionCount: 14 },
            ]
        },
        {
            id: 'block_04',
            name: 'Bloque 4',
            questionCount: 25,
            themes: [
                { id: 'theme_07', name: 'Tema 7', questionCount: 20 },
            ]
        }
    ];

    // Sincroniza el tiempo recomendado cuando cambia el número de preguntas
    const handleQuestionCountChange = (value: number) => {
        const validatedValue = Math.max(1, value);
        setQuestionCount(validatedValue);
        setTimeLimit(validatedValue); // 1 minuto por pregunta recomendado
    };

    // Control individual de bloques
    const handleToggleBlock = (blockId: string) => {
        setSelectedBlocks((prev) => {
            if (prev.includes(blockId)) {
                // Al desmarcar un bloque, eliminamos también sus temas asociados seleccionados
                const blockToClear = staticStructure.find(b => b.id === blockId);
                if (blockToClear) {
                    const themeIdsToClear = blockToClear.themes.map(t => t.id);
                    setSelectedThemes(prevThemes => prevThemes.filter(id => !themeIdsToClear.includes(id)));
                }
                return prev.filter((id) => id !== blockId);
            } else {
                return [...prev, blockId];
            }
        });
    };

    // Control individual de temas
    const handleToggleTheme = (themeId: string) => {
        setSelectedThemes((prev) => {
            if (prev.includes(themeId)) {
                return prev.filter((id) => id !== themeId);
            } else {
                return [...prev, themeId];
            }
        });
    };

    const handleStartTest = () => {
        navigation.navigate('TestScreen', {
            opositionId: opositionId, // Asegúrate de recibirlo en las props si es necesario
            name: name,               // Nombre de la oposición (ej: "Informática")
            titleParam: 'Test Personalizado', // ← Este es el título que debe leer tu cabecera
            setTime: timeLimit,       // Los minutos elegidos en tu input
            questionCount: questionCount, // ← Las preguntas elegidas en tu input (ej: 10)
            examType: 'custom',
            immediateSolution: immediateSolution,
            selectedBlocks: selectedBlocks,
            selectedThemes: selectedThemes
        });
    };

    return (
        <ScreenLayout title="Test Personalizado" showSidebar={true}>
            <ScrollView contentContainerStyle={{ padding: 16, backgroundColor: '#F8FAFC' }} showsVerticalScrollIndicator={false}>

                {/* SECCIÓN 1: CONFIGURACIÓN DEL TEST */}
                <View style={{ backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 16 }}>Configuración del test</Text>

                    {/* Input Número de preguntas */}
                    <Text style={{ fontSize: 14, color: '#64748B', marginBottom: 6 }}>
                        <MaterialCommunityIcons name="format-list-numbered" size={14} /> Número de preguntas
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, marginBottom: 14, paddingHorizontal: 12, height: 48 }}>
                        <TextInput
                            style={{ flex: 1, color: '#1E293B', fontSize: 16, fontWeight: '500' }}
                            keyboardType="numeric"
                            value={String(questionCount)}
                            onChangeText={(text) => handleQuestionCountChange(Number(text.replace(/[^0-9]/g, '')))}
                        />
                        <View style={{ flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                            <Pressable onPress={() => handleQuestionCountChange(questionCount + 1)} style={{ padding: 2 }}>
                                <Ionicons name="chevron-up" size={16} color="#64748B" />
                            </Pressable>
                            <Pressable onPress={() => handleQuestionCountChange(questionCount - 1)} style={{ padding: 2 }}>
                                <Ionicons name="chevron-down" size={16} color="#64748B" />
                            </Pressable>
                        </View>
                    </View>

                    {/* Input Tiempo */}
                    <Text style={{ fontSize: 14, color: '#64748B', marginBottom: 6 }}>
                        <Ionicons name="time-outline" size={14} /> Tiempo (minutos)
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, paddingHorizontal: 12, height: 48 }}>
                        <TextInput
                            style={{ flex: 1, color: '#1E293B', fontSize: 16, fontWeight: '500' }}
                            keyboardType="numeric"
                            value={String(timeLimit)}
                            onChangeText={(text) => setTimeLimit(Number(text.replace(/[^0-9]/g, '')))}
                        />
                        <View style={{ flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                            <Pressable onPress={() => setTimeLimit(Math.max(1, timeLimit + 1))} style={{ padding: 2 }}>
                                <Ionicons name="chevron-up" size={16} color="#64748B" />
                            </Pressable>
                            <Pressable onPress={() => setTimeLimit(Math.max(1, timeLimit - 1))} style={{ padding: 2 }}>
                                <Ionicons name="chevron-down" size={16} color="#64748B" />
                            </Pressable>
                        </View>
                    </View>
                    <Text style={{ fontSize: 12, color: '#94A3B8', marginTop: 6 }}>
                        Recomendado: {questionCount} minutos (1 min/pregunta)
                    </Text>
                </View>

                {/* SECCIÓN 2: SOLUCIÓN INMEDIATA */}
                <View style={{ backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, marginBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#E2E8F0' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name={immediateSolution ? "eye-outline" : "eye-off-outline"} size={20} color={immediateSolution ? "#2F70F2" : "#64748B"} style={{ marginRight: 8 }} />
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#1E293B' }}>Mostrar solución inmediata</Text>
                    </View>
                    <Switch
                        value={immediateSolution}
                        onValueChange={setImmediateSolution}
                        trackColor={{ false: '#CBD5E1', true: '#2F70F2' }}
                        thumbColor="#FFFFFF"
                    />
                </View>

                {/* SECCIÓN 3: SELECCIONA BLOQUES */}
                <View style={{ backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 16 }}>Selecciona bloques</Text>

                    {staticStructure.map((block) => {
                        const isBlockChecked = selectedBlocks.includes(block.id);
                        return (
                            <Pressable
                                key={block.id}
                                style={[{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 14,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: '#E2E8F0',
                                    backgroundColor: '#FFFFFF',
                                    marginBottom: 12
                                }, isBlockChecked && {
                                    borderColor: '#2F70F2',
                                    backgroundColor: '#EFF6FF'
                                }]}
                                onPress={() => handleToggleBlock(block.id)}
                            >
                                <MaterialCommunityIcons
                                    name={isBlockChecked ? "checkbox-marked" : "checkbox-blank-outline"}
                                    size={24}
                                    color={isBlockChecked ? "#2F70F2" : "#CBD5E1"}
                                    style={{ marginRight: 12 }}
                                />
                                <View style={{ width: 36, height: 36, borderRadius: 6, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                    <MaterialCommunityIcons name="grid" size={20} color="#64748B" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 15, fontWeight: '600', color: '#1E293B' }}>{block.name}</Text>
                                    <Text style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>{block.questionCount} preguntas</Text>
                                </View>
                            </Pressable>
                        );
                    })}
                </View>

                {/* SECCIÓN 4: SELECCIONA TEMAS (OPCIONAL) */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: '#1E293B', marginBottom: 16, paddingLeft: 4 }}>
                        Selecciona temas (opcional)
                    </Text>

                    {staticStructure
                        .filter(block => selectedBlocks.includes(block.id))
                        .map((block) => (
                            <View key={`themes_group_${block.id}`} style={{ backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' }}>
                                <Text style={{ fontSize: 14, fontWeight: '700', color: '#475569', marginBottom: 12 }}>
                                    {block.name}
                                </Text>

                                {block.themes.map((theme) => {
                                    const isThemeChecked = selectedThemes.includes(theme.id);
                                    return (
                                        <Pressable
                                            key={theme.id}
                                            style={[{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                padding: 12,
                                                borderRadius: 8,
                                                borderWidth: 1,
                                                borderColor: '#E2E8F0',
                                                backgroundColor: '#FFFFFF',
                                                marginBottom: 10
                                            }, isThemeChecked && {
                                                borderColor: '#2F70F2',
                                                backgroundColor: '#EFF6FF'
                                            }]}
                                            onPress={() => handleToggleTheme(theme.id)}
                                        >
                                            <MaterialCommunityIcons
                                                name={isThemeChecked ? "checkbox-marked" : "checkbox-blank-outline"}
                                                size={22}
                                                color={isThemeChecked ? "#2F70F2" : "#CBD5E1"}
                                                style={{ marginRight: 12 }}
                                            />
                                            <View style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                                <MaterialCommunityIcons name="format-list-bulleted" size={18} color="#64748B" />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={{ fontSize: 14, fontWeight: '500', color: '#1E293B' }}>{theme.name}</Text>
                                                <Text style={{ fontSize: 12, color: '#64748B', marginTop: 1 }}>{theme.questionCount} preguntas</Text>
                                            </View>
                                        </Pressable>
                                    );
                                })}
                            </View>
                        ))}
                </View>

                {/* SECCIÓN 5: BOTONES DE ACCIÓN ACCESIBLES */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 30 }}>
                    <Pressable
                        style={[{
                            flex: 1,
                            height: 52,
                            borderRadius: 10,
                            backgroundColor: '#2F70F2',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 12
                        }, selectedBlocks.length === 0 && {
                            backgroundColor: '#CBD5E1'
                        }]}
                        disabled={selectedBlocks.length === 0}
                        onPress={handleStartTest}
                    >
                        <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700', textAlign: 'center' }}>
                            Iniciar Test ({questionCount} preg. {timeLimit} min)
                        </Text>
                    </Pressable>

                    {/* <Pressable
                        style={{
                            flex: 1,
                            height: 52,
                            borderRadius: 10,
                            backgroundColor: '#FFFFFF',
                            borderWidth: 1,
                            borderColor: '#CBD5E1',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ color: '#475569', fontSize: 15, fontWeight: '600' }}>
                            Cancelar
                        </Text> */}
                    {/* </Pressable> */}
                </View>

            </ScrollView>
        </ScreenLayout>
    );
}