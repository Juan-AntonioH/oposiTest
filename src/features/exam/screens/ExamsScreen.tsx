import React from 'react';
import { RootStackParamList } from "@/navigation";
import { RouteProp } from "@react-navigation/native";
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { ScrollView, Text, View } from 'react-native';
import { styles } from '../styles/exam.styles';

interface ExamsScreenProps {
    route: RouteProp<RootStackParamList, 'ExamsScreen'>;
}
// {
//   "oposicionId": "opo_01",
//   "anio": 2011,
//   "convocatoria": "Libre",
//   "nombreVisibilidad": "Examen Oficial 2011 (Turno Libre)",
//   "numeroPreguntasTotales": 100,
//   "tiempoRecomendado": 90 // en minutos
// }
export function ExamsScreen({ route }: ExamsScreenProps) {
    const { opositionId, id, name } = route.params || { opositionId: '', id: '', name: 'Detalle' };
        const exams = [
        { opositionId: 'opo_01', anio: 2025, convocatoria: 'Libre', nombreVisibilidad: 'Examen Oficial 2025 (Turno Libre)', numeroPreguntasTotales: 100, tiempoExamen: 90 },
        { opositionId: 'opo_01', anio: 2024, convocatoria: 'Libre', nombreVisibilidad: 'Examen Oficial 2024 (Turno Libre)', numeroPreguntasTotales: 100, tiempoExamen: 90 },
        { opositionId: 'opo_01', anio: 2024, convocatoria: 'interna', nombreVisibilidad: 'Examen Oficial 2024 (Turno Interno)', numeroPreguntasTotales: 100, tiempoExamen: 90 }
    ];
    return (
        <ScreenLayout title='Exámenes'>
            <ScrollView style={styles.container}>
                <Text>{opositionId}</Text>
                <Text>{id}</Text>
                <Text>{name}</Text>
                <View>{exams.map((opcion) => (<Text>{opcion.nombreVisibilidad}</Text>))}</View>
            </ScrollView>

        </ScreenLayout>
    );
}
