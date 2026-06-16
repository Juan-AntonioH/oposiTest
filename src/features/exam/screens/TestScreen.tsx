import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation'; // Ajusta la ruta a tu archivo de rutas
import { styles } from '../styles/exam.styles';
// 1. Importamos el store de Zustand idéntico a como lo tienes en ScreenLayout
import { useAuthStore } from '@/store/authStore';

interface TestScreenProps {
    route: RouteProp<RootStackParamList, 'TestScreen'>;
}

export function TestScreen({ route }: TestScreenProps) {
    // Recuperamos el ID de la base de datos y el título enviados al clickar
    const { opositionId, name, setTime, examType, year, immediateSolution } = route.params || { opositionId: '', name: '', setTime: 90, examType: '', immediateSolution: false };
    return (<ScreenLayout
        title={`Examen Oficial ${year}`}
        showSidebar={false}
    >
        <View>
            <Text>HOLA MUNDO</Text>
        </View>
    </ScreenLayout>
    )
}