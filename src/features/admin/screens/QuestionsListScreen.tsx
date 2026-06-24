import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { styles } from '@/features/exam/styles/exam.styles';
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
            <ScrollView style={styles.containerList} contentContainerStyle={styles.contentContainerList}>

                {/* PANEL DE FILTROS */}
                <View style={styles.filterCard}>
                    <Text style={styles.labelList}>Buscar pregunta</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="🔍 Escribe para buscar..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />

                    <Text style={styles.labelList}>Filtrar por bloque</Text>
                    <Dropdown
                        style={styles.dropdownList}
                        placeholderStyle={styles.placeholder}
                        selectedTextStyle={styles.selectedText}
                        data={datosBloques}
                        labelField="label"
                        valueField="value"
                        value={filtroBloque}
                        onChange={(item: { value: string }) => setFiltroBloque(item.value)}
                    />

                    <Text style={styles.labelList}>Filtrar por tema</Text>
                    <Dropdown
                        style={styles.dropdownList}
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
                        style={styles.questionCardList}
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
                            <Text style={styles.questionTextList}>
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