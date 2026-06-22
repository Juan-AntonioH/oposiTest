// import React from 'react';
// import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
// import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useFetchExam } from '@/features/exam/hooks/useFechExam';
// import { Oposicion } from '@/features/exam';

// interface OppositionsScreenProps {
//     navigation: any;
// }

// export function OppositionsScreen({ navigation }: OppositionsScreenProps) {
//     // Consumimos el hook con los datos en tiempo real de Firebase
//     const { oposiciones, loading, error, refrescar } = useFetchExam();

//     // Renderizado de cada tarjeta usando los campos reales de la DB
//     const renderCategoryItem = ({ item }: { item: Oposicion }) => (
//         <Pressable 
//             style={styles.card}
//             android_ripple={{ color: '#E0E0E0' }}
//             onPress={() => {
//                 // Navegamos pasando los datos necesarios a la siguiente pantalla
//                 navigation.navigate('ExamScreen', { 
//                     idDocumento: item.idDocumento, 
//                     nombreOposicion: item.nombre 
//                 });
//             }}
//         >
//             {/* Icono genérico adaptable (puedes mapearlo por item.id si lo deseas) */}
//             <View style={[styles.iconContainer, { backgroundColor: '#2F70F2' }]}>
//                 <MaterialCommunityIcons name="grid" size={28} color="#FFFFFF" />
//             </View>

//             <View style={styles.textContainer}>
//                 {/* Mostramos el código (ej: TAI) junto al nombre */}
//                 <Text style={styles.cardTitle}>{item.id} - {item.nombre}</Text>
//                 <Text style={styles.cardSubtitle} numberOfLines={2}>
//                     {item.descripcion}
//                 </Text>
//             </View>
//         </Pressable>
//     );

//     return (
//         <ScreenLayout title="Oposiciones" showSidebar={true}>
//             <FlatList
//                 data={oposiciones}
//                 renderItem={renderCategoryItem}
//                 keyExtractor={(item) => item.idDocumento} // Usamos el ID único de Firestore
//                 contentContainerStyle={styles.listContainer}
//                 refreshing={loading}
//                 onRefresh={refrescar} // Deslizar hacia abajo para actualizar datos
//                 ListHeaderComponent={
//                     <View style={styles.headerContainer}>
//                         <View style={styles.titleRow}>
//                             <MaterialCommunityIcons name="grid" size={32} color="#1C2434" />
//                             <Text style={styles.mainTitle}>Oposiciones</Text>
//                         </View>
//                         <Text style={styles.mainSubtitle}>
//                             Selecciona una oposición para empezar a estudiar
//                         </Text>
//                     </View>
//                 }
//                 ListEmptyComponent={
//                     !loading ? (
//                         <View style={styles.centerContainer}>
//                             <Text style={styles.errorText}>
//                                 {error ? error : "No hay oposiciones activas disponibles por el momento."}
//                             </Text>
//                         </View>
//                     ) : null
//                 }
//             />
//             {loading && oposiciones.length === 0 && (
//                 <View style={styles.loadingOverlay}>
//                     <ActivityIndicator size="large" color="#2F70F2" />
//                 </View>
//             )}
//         </ScreenLayout>
//     );
// }


import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../styles/exam.styles';
import { colors } from '@/core/theme';

interface OppositionCategory {
    idDocument: string;
    name: string;
    examsCount: number;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    id: string;
    iconColor: string;
    activo: boolean;
}

const OPPOSITIONS_DATA: OppositionCategory[] = [
    { idDocument: 'opo_01', name: 'Técnico Auxiliar Informática', examsCount: 7, icon: 'grid', id: 'TAI', iconColor: 'purple', activo: true },
    { idDocument: 'opo_02', name: 'Administración del Estado', examsCount: 5, icon: 'grid', id: 'AGE', iconColor: colors.success, activo: true },
];

// 1. Tipamos la propiedad navigation para cumplir con las normas de TS
interface OppositionsScreenProps {
    navigation: {
        navigate: (screen: string, params?: object) => void;
    };
}

export function OppositionsScreen({ navigation }: OppositionsScreenProps) {
    const oposicionesActivas = OPPOSITIONS_DATA.filter(oposicion => oposicion.activo === true);

    const renderCategoryItem = ({ item }: { item: OppositionCategory }) => (
        <Pressable
            style={styles.card}
            android_ripple={{ color: '#E0E0E0' }}
            onPress={() => {
                navigation.navigate('OppositionScreen', {
                    idDocument: item.idDocument,
                    id: item.id,
                    name: item.name
                });
            }}
        >
            <View style={[styles.iconContainer, { backgroundColor: item.iconColor }]}>
                <Text style={{ color: '#E0E0E0', fontWeight: 'bold', fontSize:16 }}>{item.id}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>{item.examsCount} exámenes disponibles</Text>
            </View>
        </Pressable>
    );

    return (
        <ScreenLayout title="Oposiciones">
            {/* BOTÓN VOLVER */}
            <View style={styles.backButtonContainer}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Dashboard')} 
                >
                    <Text style={styles.backButtonText}>← Volver</Text>
                </Pressable>
            </View>
            <FlatList
                data={oposicionesActivas}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.idDocument}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        {/* Fila del Título Principal con Icono */}
                        <View style={styles.titleRow}>
                            <MaterialCommunityIcons name="grid" size={32} color="#1C2434" />
                            <Text style={styles.mainTitle}>Oposiciones</Text>
                        </View>
                        {/* Subtítulo descriptivo */}
                        <Text style={styles.mainSubtitle}>
                            Selecciona una oposición para empezar a estudiar
                        </Text>
                    </View>
                }
            />
        </ScreenLayout>
    );
}