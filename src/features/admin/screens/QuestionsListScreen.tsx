import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dropdown } from 'react-native-element-dropdown';

import { RootStackParamList } from '@/navigation';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { FirebaseQuestion } from '@/features/admin/types/question';
import { MOCK_QUESTIONS, Question } from '@/features/exam/constants/mockQuestions'; // Ajusta la ruta de importación de tus mocks si difiere

// Reutilizamos tu lógica de autogeneración dinámica para el filtrado
const totalBloquesOposicion = 8;
const totalTemasOposicion = 15;

const datosBloques = [
    { label: 'Todos los bloques', value: 'todos' },
    ...Array.from({ length: totalBloquesOposicion }, (_, i) => {
        const num = i + 1;
        const idFormateado = num < 10 ? `0${num}` : `${num}`;
        return { label: `Bloque ${num}`, value: `bloque_${idFormateado}` };
    })
];

const datosTemas = [
    { label: 'Todos los temas', value: 'todos' },
    ...Array.from({ length: totalTemasOposicion }, (_, i) => {
        const num = i + 1;
        const idFormateado = num < 10 ? `0${num}` : `${num}`;
        return { label: `Tema ${num}`, value: `tema_${idFormateado}` };
    })
];

export const QuestionsListScreen = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'QuestionsList'>>();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'QuestionsList'>>();

    const { idDocument, nombreOposicion, siglas } = route.params;

    const [searchQuery, setSearchQuery] = useState('');
    const [filtroBloque, setFiltroBloque] = useState('todos');
    const [filtroTema, setFiltroTema] = useState('todos');

    // Filtramos sobre tus MOCK_QUESTIONS importadas
    const preguntasFiltradas = MOCK_QUESTIONS.filter(p => {
        const cumpleBusqueda = p.question.toLowerCase().includes(searchQuery.toLowerCase()) || p.numQuestion.toString().includes(searchQuery);
        const cumpleBloque = filtroBloque === 'todos' || p.blockId === filtroBloque;
        const cumpleTema = filtroTema === 'todos' || p.temaId === filtroTema;
        return cumpleBusqueda && cumpleBloque && cumpleTema;
    });

    return (
        <ScreenLayout title={`Preguntas: ${siglas}`}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                {/* PANEL DE FILTROS */}
                <View style={styles.filterCard}>
                    <Text style={styles.label}>Buscar pregunta</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="🔍 Escribe para buscar..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />

                    <Text style={styles.label}>Filtrar por bloque</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        data={datosBloques}
                        labelField="label"
                        valueField="value"
                        value={filtroBloque}
                        onChange={(item: { value: string }) => setFiltroBloque(item.value)}
                    />

                    <Text style={styles.label}>Filtrar por tema</Text>
                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        data={datosTemas}
                        labelField="label"
                        valueField="value"
                        value={filtroTema}
                        onChange={(item: { value: string }) => setFiltroTema(item.value)}
                    />

                    <Text style={styles.resultsText}>{preguntasFiltradas.length} preguntas encontradas</Text>

                    {/* BOTÓN PARA LIMPIAR FILTROS */}
                    {(searchQuery !== '' || filtroBloque !== 'todos' || filtroTema !== 'todos') && (
                        <TouchableOpacity
                            style={styles.btnClearFilters}
                            onPress={() => {
                                setSearchQuery('');
                                setFiltroBloque('todos');
                                setFiltroTema('todos');
                            }}
                        >
                            <Text style={styles.btnClearFiltersText}>Limpiar filtros</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {/* LISTADO DE PREGUNTAS MOCK */}
                {preguntasFiltradas.map((item: Question) => (
                    <TouchableOpacity
                        key={item.questionId}
                        style={styles.questionCard}
                        onPress={() => {
                            // 👈 SOLUCIÓN AL ERROR: Forzamos la aserción segura para cumplir con el contrato de RootStackParamList
                            // const questionDataForm = {
                            //     id: item.id || item.questionId,
                            //     questionId: item.questionId,
                            //     oppositionId: item.oppositionId || idDocument,
                            //     blockId: item.blockId,
                            //     temaId: item.temaId,
                            //     question: item.question,
                            //     options: item.options,
                            //     correctAnswer: item.correctAnswer,
                            //     explanation: item.explanation || '',
                            //     randomId: item.randomId || Math.random(),
                            //     esOficial: item.esOficial || false,
                            //     examYear: item.examYear,
                            //     examConvocatoria: item.examConvocatoria
                            // } as unknown as FirebaseQuestion;
                            const dataParaFormulario = item as unknown as FirebaseQuestion;
                            navigation.navigate('QuestionForm', {
                                idDocument,
                                nombreOposicion,
                                questionData: dataParaFormulario
                            });
                        }}
                    >
                        <View style={styles.questionHeaderRow}>
                            <Text style={styles.questionText}>
                                📝 <Text style={styles.boldText}>{item.questionId}:</Text> {item.question}
                            </Text>
                        </View>
                        <View style={styles.metaRow}>
                            <Text style={styles.metaText}>
                                Bloque {item.blockId.match(/\d+/) ? parseInt(item.blockId.match(/\d+/)![0], 10) : item.blockId}
                            </Text>
                            <Text style={styles.metaDot}>•</Text>
                            <Text style={styles.metaText}>
                                Tema {item.temaId.match(/\d+/) ? parseInt(item.temaId.match(/\d+/)![0], 10) : item.temaId}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.btnVolver} onPress={() => navigation.goBack()}>
                    <Text style={styles.btnVolverText}>Volver</Text>
                </TouchableOpacity>

            </ScrollView>
        </ScreenLayout>
    );
};

// ... Mantén el mismo objeto styles de la respuesta anterior ...
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA' },
    contentContainer: { padding: 16 },
    filterCard: { backgroundColor: '#FFF', borderRadius: 8, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#EEE' },
    label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6 },
    searchInput: { height: 45, borderColor: '#DDD', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, backgroundColor: '#FFF', marginBottom: 14, fontSize: 14 },
    dropdown: { height: 45, borderColor: '#DDD', borderWidth: 1, borderRadius: 8, paddingHorizontal: 12, backgroundColor: '#FFF', marginBottom: 14 },
    placeholder: { color: '#999', fontSize: 14 },
    selectedText: { color: '#000', fontSize: 14 },
    resultsText: { fontSize: 12, color: '#777', marginTop: 4 },
    questionCard: { backgroundColor: '#FFF', borderRadius: 8, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#EEE' },
    questionHeaderRow: { flexDirection: 'row', alignItems: 'flex-start' },
    questionText: { fontSize: 14, color: '#333', lineHeight: 20, flex: 1 },
    boldText: { fontWeight: 'bold' },
    metaRow: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
    metaText: { fontSize: 12, color: '#666' },
    metaDot: { marginHorizontal: 8, color: '#999' },
    btnVolver: { backgroundColor: '#FFF', borderColor: '#DDD', borderWidth: 1, borderRadius: 8, height: 48, justifyContent: 'center', alignItems: 'center', marginTop: 12 },
    btnVolverText: { color: '#333', fontSize: 15, fontWeight: '500' },
        btnClearFilters: {
        marginTop: 12,
        backgroundColor: '#F0F4F8',
        borderRadius: 6,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnClearFiltersText: {
        color: '#475569',
        fontSize: 13,
        fontWeight: '600',
    },
});
