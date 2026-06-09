import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable, Text, Alert } from 'react-native';
import { styles } from '../styles/Auth.styles';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { ScreenLayout } from '@/shared/layouts/ScreenLayout';
import { AuthCard } from '../components/AuthCard';
import { AuthInput } from '../components/AuthInput';
import { AvatarSelector } from '../components/AvatarSelector';
import { PasswordRequirements } from '../components/PasswordRequirements';
import { EmailRequirements } from '../components/EmailRequirements'; // ← Nuevo Import
import { PRESET_AVATARS } from '../constants/avatars';
import { colors } from '@/core/theme';

import { RootStackParamList } from '@/navigation';

// Define el tipo específico de navegación para la pantalla de registro
type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export function RegisterScreen() {
  // Inicialización tipada idéntica a tu Login
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  const [accountName, setAccountName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Controladores de estado para el avatar
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(PRESET_AVATARS[0].id);
  const [customAvatarUri, setCustomAvatarUri] = useState<string | null>(null);

  // ESTE ES EL STRING QUE ENVIARÁS A TU BASE DE DATOS (ej: "avatar_171790432.jpg" o "avatar_01")
  const [avatarDatabaseValue, setAvatarDatabaseValue] = useState<string>(PRESET_AVATARS[0].id);

  // --- LÓGICA DE VALIDACIÓN EXTRAÍDA SIMPLIFICADA ---
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isPasswordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);

  const isFormValid =
    accountName.trim().length > 0 &&
    username.trim().length > 0 &&
    isEmailValid &&
    isPasswordValid;

  // Manejar selección del banco de imágenes por defecto
  const handleSelectPreset = (id: string) => {
    setCustomAvatarUri(null);
    setSelectedAvatarId(id);
    setAvatarDatabaseValue(id); // Guardamos directamente el ID estático ("avatar_01", "avatar_02"...)
  };

  // Función para abrir la galería, copiar la imagen y obtener su nombre definitivo
  const handlePickImage = async () => {
    // 1. Solicitar permisos de galería al usuario
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permiso requerido', 'Es necesario el acceso a tus fotos para subir una imagen.');
      return;
    }

    // 2. Abrir el selector nativo de imágenes
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Forzar corte cuadrado para fotos de perfil
      quality: 0.8,
    });

    if (result.canceled || !result.assets || result.assets.length === 0) {
      return;
    }

    const temporaryCacheUri = result.assets[0].uri;

    try {
      // 1. Obtener la extensión y definir el nombre único
      const fileExtension = temporaryCacheUri.split('.').pop() || 'jpg';
      const uniqueFileName = `avatar_${Date.now()}.${fileExtension}`;

      // 2. Apuntar a la ubicación temporal con la clase File
      const sourceFile = new FileSystem.File(temporaryCacheUri);

      // 3. Definir la ubicación permanente final
      const destinationFile = new FileSystem.File(FileSystem.Paths.document, uniqueFileName);

      // 4. CORRECCIÓN: El método moderno es .copy() y ya devuelve una promesa
      await sourceFile.copy(destinationFile);

      // 5. Guardar los estados correspondientes utilizando .uri
      setCustomAvatarUri(destinationFile.uri);
      setSelectedAvatarId(null);

      // Este es el string limpio que guardarás en la base de datos
      setAvatarDatabaseValue(uniqueFileName);

      console.log('Imagen copiada exitosamente con la API moderna:', destinationFile.uri);

    } catch (error) {
      console.error('Error al guardar la imagen con la nueva API:', error);
      Alert.alert('Error', 'No se pudo guardar la imagen de forma permanente.');
    }
  };


  const handleRegisterSubmit = () => {
    // Aquí ejecutas tu servicio/store de registro enviando los datos organizados
    const payload = {
      accountName,
      username,
      email,
      password,
      avatar: avatarDatabaseValue, // Enviará "avatar_01" O "avatar_171790432.jpg"
    };

    console.log('Enviando registro a la base de datos:', payload);
    // Alert.alert('Registro Exitoso', `Usuario creado. Avatar guardado como: ${payload.avatar}`);
    navigation.navigate('Authenticator', { email: payload.email });
  };

  return (
    <ScreenLayout
      title="Crear Cuenta"
      showSidebar={true}
    // sidebarOpen={sidebarOpen}
    // setSidebarOpen={setSidebarOpen}
    // onMenuPress={() => setSidebarOpen(true)}
    // onLoginClick={() => navigation.navigate('Login')}
    // 👈 CONFIGURA AQUÍ EL COMPORTAMIENTO DEL MENÚ PARA EL LOGIN
    // onNavigate={(screen) => {

    //   if (screen === 'inicio') {
    //     setSidebarOpen(false); // Cierra el menú lateral primero
    //     navigation.navigate('Dashboard'); // 👈 Redirige de vuelta al Dashboard en la pila
    //   }

    //   // Aquí añadirás más condiciones en el futuro (ej: 'categorias')
    // }}
    >
      <ScrollView
        contentContainerStyle={[styles.scrollContent, styles.localScroll]}
        showsVerticalScrollIndicator={false}
      >

        {/* BOTÓN VOLVER */}
        <View style={styles.backButtonContainer}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()} // ← Te regresa automáticamente a la pantalla anterior (Login)
          >
            <Text style={styles.backButtonText}>← Volver</Text>
          </Pressable>
        </View>

        <AuthCard title="Crear Cuenta Nueva">

          <AvatarSelector
            selectedAvatarId={selectedAvatarId}
            customAvatarUri={customAvatarUri}
            onSelectAvatar={handleSelectPreset}
            onPickImage={handlePickImage}
          />

          <AuthInput
            label="Nombre o Alias"
            icon="person-outline"
            value={accountName}
            onChangeText={setAccountName}
            placeholder="Juan Pérez"
          />

          <AuthInput
            label="Nombre de usuario"
            icon="alternate-email"
            value={username}
            onChangeText={setUsername}
            placeholder="usuario123"
            helperText="Debe ser único"
          />


          {/* INPUT DE EMAIL MÁS LIMPIO */}
          <AuthInput
            label="Correo electrónico"
            icon="email"
            value={email}
            onChangeText={setEmail}
            placeholder="tu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={email.length > 0 && !isEmailValid}
          />

          {/* REQUISITOS DEL EMAIL DEBAJO */}
          <EmailRequirements email={email} />

          <AuthInput
            label="Contraseña"
            icon="lock-outline"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry
          />

          <PasswordRequirements password={password} />

          <Pressable
            style={[
              styles.submitButton,
              isFormValid ? { backgroundColor: colors.primary || '#0284C7' } : styles.disabledButton
            ]}
            onPress={handleRegisterSubmit}
            disabled={!isFormValid}
          >
            <Text style={styles.submitButtonText}>Crear Cuenta</Text>
          </Pressable>

        </AuthCard>
      </ScrollView>
    </ScreenLayout>
  );
}
