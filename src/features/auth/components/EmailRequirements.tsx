import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  email?: string;
}

export function EmailRequirements({ email = '' }: Props) {
  // Evitamos mostrar errores visuales si el usuario aún no ha escrito nada
  if (email.length === 0) return null;

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.icon, isEmailValid ? styles.validText : styles.invalidText]}>
          {isEmailValid ? '✓' : '×'}
        </Text>
        <Text style={[styles.text, isEmailValid ? styles.validText : styles.invalidText]}>
          {isEmailValid ? 'Formato de correo electrónico válido' : 'Introduce un correo válido (ej: tu@email.com)'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 4, marginBottom: 12, paddingHorizontal: 4 },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { fontSize: 14, fontWeight: 'bold', marginRight: 6 },
  text: { fontSize: 12 },
  invalidText: { color: '#BA1A1A' }, // Rojo de error
  validText: { color: '#15803D' },   // Verde de éxito
});
