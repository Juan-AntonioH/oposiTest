import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation'; // Ajusta la ruta a tu archivo de rutas

// 1. Importamos el store de Zustand idéntico a como lo tienes en ScreenLayout
import { useAuthStore } from '@/store/authStore'; 

interface OppositionScreenProps {
    route: RouteProp<RootStackParamList, 'OppositionScreen'>;
}

export function OppositionScreen({ route }: OppositionScreenProps) {
    // Recuperamos el ID de la base de datos y el título enviados al clickar
    const { id, title } = route.params || { id: '', title: 'Detalle' };

    // 2. Extraemos el rol del usuario actual desde tu estado global
    const userRole = useAuthStore((state) => state.userRole);
    
    // 3. Evaluamos si el rol cumple con los permisos de administración
    const hasAdminAccess = userRole === 'admin' || userRole === 'moderator';

    // Opciones del menú basadas en tu interfaz gráfica
    const opcionesTest = [
        { id: '1', title: 'Exámenes', sub: 'Exámenes de años anteriores', icon: 'book-open-blank-variant', color: '#2F70F2' },
        { id: '2', title: 'Simulacros', sub: 'Simulacros sin solución inmediata', icon: 'target', color: '#00BA52' },
        { id: '3', title: 'Test por bloques', sub: 'Selecciona uno o varios bloques', icon: 'apps', color: '#A447FF' },
        { id: '4', title: 'Test por temas', sub: 'Elige temas específicos', icon: 'format-list-bulleted', color: '#F2990A' },
        { id: '5', title: 'Test personalizado', sub: 'Configura tu propio test', icon: 'cog-outline', color: '#EF4444' },
    ];

    return (
        // Envolvemos con tu ScreenLayout pasando el título dinámico
        <ScreenLayout title={title} showSidebar={true}>
            <ScrollView contentContainerStyle={styles.container}>
                
                {/* Cabecera de la sección */}
                <Text style={styles.mainTitle}>{title}</Text>
                <Text style={styles.mainSubtitle}>Selecciona el tipo de test que deseas realizar</Text>

                {/* Listado de tarjetas de opciones de estudio */}
                <View style={styles.menuContainer}>
                    {opcionesTest.map((opcion) => (
                        <Pressable 
                            key={opcion.id} 
                            style={styles.card}
                            android_ripple={{ color: '#E0E0E0' }}
                            onPress={() => console.log(`Accediendo a: ${opcion.title} de la opo con ID: ${id}`)}
                        >
                            <View style={[styles.iconBox, { backgroundColor: opcion.color }]}>
                                <MaterialCommunityIcons name={opcion.icon as any} size={24} color="#FFF" />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.cardTitle}>{opcion.title}</Text>
                                <Text style={styles.cardSub}>{opcion.sub}</Text>
                            </View>
                        </Pressable>
                    ))}
                </View>

                {/* 4. CONTROL DE ROLES: Renderizado condicional de la sección de administración */}
                {hasAdminAccess && (
                    <View style={styles.adminActionContainer}>
                        
                        {/* Botón Añadir Pregunta (Visible solo para admin/moderator) */}
                        <Pressable 
                            style={[styles.btn, styles.btnGreen]} 
                            android_ripple={{ color: '#009943' }}
                            onPress={() => console.log(`Redirigir a creador de preguntas para la opo: ${id}`)}
                        >
                            <MaterialIcons name="add" size={20} color="#FFF" />
                            <Text style={styles.btnText}>Añadir Pregunta</Text>
                        </Pressable>

                        {/* Botón Editar Pregunta (Visible solo para admin/moderator) */}
                        <Pressable 
                            style={[styles.btn, styles.btnBlue]} 
                            android_ripple={{ color: '#1B54C5' }}
                            onPress={() => console.log(`Redirigir a editor de preguntas para la opo: ${id}`)}
                        >
                            <MaterialCommunityIcons name="square-edit-outline" size={18} color="#FFF" />
                            <Text style={styles.btnText}>Editar Pregunta</Text>
                        </Pressable>
                        
                    </View>
                )}

            </ScrollView>
        </ScreenLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
        backgroundColor: '#F8F9FC',
    },
    mainTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1C2434',
        marginBottom: 6,
    },
    mainSubtitle: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 28,
    },
    menuContainer: {
        gap: 16,
        marginBottom: 32,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 6,
        elevation: 1,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 16,
        flex: 1,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C2434',
    },
    cardSub: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 2,
    },
    adminActionContainer: {
        gap: 12,
        marginTop: 8,
    },
    btn: {
        flexDirection: 'row',
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    btnGreen: {
        backgroundColor: '#00BA52',
    },
    btnBlue: {
        backgroundColor: '#2F70F2',
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
});
