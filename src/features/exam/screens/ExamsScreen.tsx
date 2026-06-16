import React, { useState } from 'react';
import { RootStackParamList } from "@/navigation";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { ScrollView, Text, View, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles/exam.styles';
import { Ionicons } from '@expo/vector-icons';

interface ExamsScreenProps {
    route: RouteProp<RootStackParamList, 'ExamsScreen'>;
}

// Definimos el tipo del examen para el tipado seguro del mapeo
interface ExamItem {
    opositionId: string;
    year: number;
    convocatoria: string;
    nombreVisibilidad: string;
    numeroPreguntasTotales: number;
    tiempoExamen: number;
}

export function ExamsScreen({ route }: ExamsScreenProps) {
    const { opositionId, name } = route.params || { opositionId: '', name: 'Detalle' };
    
    // Hook de navegación con tipado estricto de tu RootStackParamList
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // Estado booleano para la solución inmediata
    const [immediateSolution, setImmediateSolution] = useState(false);

    const exams: ExamItem[] = [
        { opositionId: 'opo_01', year: 2025, convocatoria: 'Libre', nombreVisibilidad: 'Examen Oficial 2025 (Turno Libre)', numeroPreguntasTotales: 100, tiempoExamen: 90 },
        { opositionId: 'opo_01', year: 2024, convocatoria: 'Libre', nombreVisibilidad: 'Examen Oficial 2024 (Turno Libre)', numeroPreguntasTotales: 100, tiempoExamen: 90 },
        { opositionId: 'opo_01', year: 2024, convocatoria: 'Interna', nombreVisibilidad: 'Examen Oficial 2024 (Turno Interno)', numeroPreguntasTotales: 100, tiempoExamen: 90 }
    ];

    // Manejador del clic que empaqueta y envía todos los parámetros requeridos
    const handleExamPress = (exam: ExamItem) => {
        navigation.navigate('TestScreen', {
            opositionId: opositionId || exam.opositionId,
            name: name,
            setTime: exam.tiempoExamen,
            examType: 'Examen_oficial',
            year: exam.year,
            immediateSolution: immediateSolution // Pasamos el booleano del interruptor
        });
    };

    return (
        <ScreenLayout title="Seleccionar Examen">
            <ScrollView
                style={styles.listContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.mainTitle}>Exámenes de Años Anteriores</Text>

                {/* Bloque del Interruptor Superior */}
                <View style={styles.toggleCard}>
                    <View style={styles.toggleHeader}>
                        {/* El icono cambia dinámicamente según el estado del booleano */}
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

                {/* Listado de Tarjetas de Exámenes */}
                <View style={{ gap: 4, paddingBottom: 32 }}>
                    {exams.map((exam, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.card}
                            onPress={() => handleExamPress(exam)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: '#EBF2FF' }]}>
                                <Ionicons name="calendar-outline" size={24} color="#2F70F2" />
                            </View>

                            <View style={styles.textContainer}>
                                <Text style={styles.customCardTitle}>
                                    Examen <Text style={styles.yearTextBold}>{exam.year}</Text>
                                </Text>
                                <Text style={styles.cardSubtitle}>
                                    {exam.numeroPreguntasTotales} preguntas • tiempo de examen: {exam.tiempoExamen} minutos
                                </Text>
                                <Text style={styles.cardSubtitle}>Tipo de convocatoria: {exam.convocatoria}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </ScreenLayout>
    );
}

