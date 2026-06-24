import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation'; // Ajusta la ruta a tu archivo de rutas
import { styles } from '../styles/exam.styles';
// 1. Importamos el store de Zustand idéntico a como lo tienes en ScreenLayout
import { useAuthStore } from '@/store/authStore';

interface OppositionScreenProps {
    route: RouteProp<RootStackParamList, 'OppositionScreen'>;
}

export function OppositionScreen({ route }: OppositionScreenProps) {
    // Recuperamos el ID de la base de datos y el título enviados al clickar
    const { idDocument, id, name } = route.params || { idDocument: '', id: '', name: 'Detalle' };

    // 2. Extraemos el rol del usuario actual desde tu estado global
    const userRole = useAuthStore((state) => state.userRole);
    const navigation = useNavigation<any>();
    // 3. Evaluamos si el rol cumple con los permisos de administración
    const hasAdminAccess = userRole === 'admin' || userRole === 'moderator';

    // Opciones del menú basadas en tu interfaz gráfica
    const opcionesTest = [
        { idDocument: '1', name: 'Exámenes', sub: 'Exámenes de años anteriores', icon: 'book-open-blank-variant', color: '#2F70F2', screen: 'ExamsScreen' },
        { idDocument: '2', name: 'Simulacros', sub: 'Simulacros sin solución inmediata', icon: 'target', color: '#00BA52', screen: 'TestScreen' },
        { idDocument: '3', name: 'Test por bloques', sub: 'Selecciona uno o varios bloques', icon: 'apps', color: '#A447FF', screen: 'BlocksScreen' },
        { idDocument: '4', name: 'Test por temas', sub: 'Elige temas específicos', icon: 'format-list-bulleted', color: '#F2990A', screen: 'ThemesScreen' },
        { idDocument: '5', name: 'Test personalizado', sub: 'Configura tu propio test', icon: 'cog-outline', color: '#EF4444', screen: 'CustomizedScreen' },
    ];

    return (
        // Envolvemos con tu ScreenLayout pasando el título dinámico
        <ScreenLayout title={id}>
            {/* BOTÓN VOLVER */}
            <View style={styles.backButtonContainer}>
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()} // ← Te regresa automáticamente a la pantalla anterior (Login)
                >
                    <Text style={styles.backButtonText}>← Volver</Text>
                </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.container}>

                {/* Cabecera de la sección */}
                <Text style={styles.mainTitle}>{name}</Text>
                <Text style={styles.mainSubtitle}>Selecciona el tipo de test que deseas realizar</Text>

                {/* Listado de tarjetas de opciones de estudio */}
                <View>
                    {opcionesTest.map((opcion) => (
                        <Pressable
                            key={opcion.idDocument}
                            style={styles.card}
                            android_ripple={{ color: '#E0E0E0' }}
                            onPress={() => {
                                // Si pulsa simulacro, preconfiguramos los datos requeridos
                                if (opcion.idDocument === '2') {
                                    navigation.navigate('TestScreen', {
                                        opositionId: idDocument,
                                        name: `${name}`,
                                        setTime: 100,               // 100 preguntas = 100 minutos (1 min por pregunta)
                                        examType: 'simulacrum',     // Identificador del tipo de examen
                                        year: new Date().getFullYear().toString(),
                                        immediateSolution: false,    // Siempre desactivado en simulacros
                                        titleParam: 'Simulacro'
                                    });
                                } else {
                                    // Flujo normal para el resto de pantallas selectoras (Exams, Blocks, Themes...)
                                    navigation.navigate(opcion.screen, {
                                        opositionId: idDocument,
                                        name: name
                                    });
                                }
                            }}
                        >
                            <View style={[styles.iconBox, { backgroundColor: opcion.color }]}>
                                <MaterialCommunityIcons name={opcion.icon as any} size={24} color="#FFF" />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.cardTitle}>{opcion.name}</Text>
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
                            onPress={() => {
                                console.log(`Redirigiendo al creador de preguntas para la opo: ${idDocument}`);

                                // Navegamos pasando únicamente los parámetros requeridos para la creación
                                navigation.navigate('QuestionForm', {
                                    idDocument: idDocument,    // P. ej. 'opo_01'
                                    nombreOposicion: name      // P. ej. 'Técnico auxiliar informática'
                                    // NOTA: Al no enviar 'questionData', la pantalla se inicializa automáticamente como "Nueva Pregunta"
                                });
                            }}
                        >
                            <MaterialIcons name="add" size={20} color="#FFF" />
                            <Text style={styles.btnText}>Añadir Pregunta</Text>
                        </Pressable>

                        {/* Botón Editar Pregunta (Visible solo para admin/moderator) */}
                        <Pressable
                            style={[styles.btn, styles.btnBlue]}
                            android_ripple={{ color: '#1B54C5' }}
                            onPress={() => {
                                console.log(`Redirigir a lista de preguntas para la opo: ${idDocument}`)
                                navigation.navigate('QuestionsList', {
                                    idDocument: idDocument,    // P. ej. 'opo_01'
                                    nombreOposicion: name, // P. ej. 'Técnico auxiliar informática'
                                    siglas: id    // P. ej. 'TAI'
                                });
                            }}
                        >
                            <MaterialCommunityIcons name="square-edit-outline" size={18} color="#FFF" />
                            <Text style={styles.btnText}>Editar Preguntas</Text>
                        </Pressable>
                    </View>
                )}

            </ScrollView>
        </ScreenLayout>
    );
}