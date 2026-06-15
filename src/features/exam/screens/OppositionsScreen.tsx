// import React from 'react';
// import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
// import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { useFetchExam } from '@/features/exam/hooks/useFechExam';
import { Oposicion } from '@/features/exam';

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

interface OppositionCategory {
    id: string;
    title: string;
    examsCount: number;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    iconColor: string;
    activo: boolean;
}

const OPPOSITIONS_DATA: OppositionCategory[] = [
    { id: 'opo_01', title: 'Matemáticas', examsCount: 7, icon: 'grid', iconColor: '#2F70F2', activo: true },
    { id: 'opo_02', title: 'Historia', examsCount: 5, icon: 'grid', iconColor: '#F2990A', activo: true },
];

// 1. Tipamos la propiedad navigation para cumplir con las normas de TS
interface OppositionsScreenProps {
    navigation: {
        navigate: (screen: string, params?: object) => void;
    };
}

export function OppositionsScreen({ navigation }: OppositionsScreenProps) {
    const oposicionesActivas = OPPOSITIONS_DATA.filter(categoria => categoria.activo === true);

    const renderCategoryItem = ({ item }: { item: OppositionCategory }) => (
        <Pressable
            style={styles.card}
            android_ripple={{ color: '#E0E0E0' }}
            onPress={() => {
                // 2. Navegamos exactamente igual que lo haces en registerScreen
                navigation.navigate('OppositionScreen', {
                    id: item.id,
                    title: item.title
                });
            }}
        >
            <View style={[styles.iconContainer, { backgroundColor: item.iconColor }]}>
                <MaterialCommunityIcons name={item.icon} size={28} color="#FFFFFF" />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.examsCount} exámenes disponibles</Text>
            </View>
        </Pressable>
    );

    return (
        <ScreenLayout title="Oposiciones" showSidebar={true}>
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
                keyExtractor={(item) => item.id}
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

// 3. Estilos locales de la pantalla basados en la interfaz gráfica dada
const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        backgroundColor: '#F8F9FC', // Fondo gris claro idéntico a la imagen
        flexGrow: 1,
    },
    headerContainer: {
        marginTop: 24,
        marginBottom: 20,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14,
    },
    mainTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1C2434',
    },
    mainSubtitle: {
        fontSize: 14,
        color: '#64748B',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16, // Bordes muy suaves
        padding: 20,
        marginBottom: 16,
        // Configuración de sombras nativas para iOS y Android
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 20,
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C2434',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 13,
        color: '#64748B',
    },
      backButtonText: {
    color: '#64748B', // Usa tu paleta de colores del tema global si existe
    fontSize: 15,
    fontWeight: '600',
  },
  backButtonContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingHorizontal: 4, // Pequeño margen para que no pegue directo al borde de la pantalla
  },
  // Área táctil del botón volver (facilita la pulsación del usuario)
  backButton: {
    paddingVertical: 8,
    paddingRight: 16, // Espacio interactivo hacia la derecha
  },
});
