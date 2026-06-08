import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  password?: string;
}

export function PasswordRequirements({ password = '' }: Props) {
  const requirements = [
    { label: 'Mínimo 8 caracteres', valid: password.length >= 8 },
    { label: 'Al menos una mayúscula', valid: /[A-Z]/.test(password) },
    { label: 'Al menos un número', valid: /[0-9]/.test(password) },
    { label: 'Al menos un símbolo especial (_ ! @ # $ etc.)', valid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <View style={styles.container}>
      {requirements.map((req, index) => (
        <View key={index} style={styles.row}>
          <Text style={[styles.icon, req.valid ? styles.validText : styles.invalidText]}>
            {req.valid ? '✓' : '×'}
          </Text>
          <Text style={[styles.text, req.valid ? styles.validText : styles.invalidText]}>
            {req.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 4, marginBottom: 12, paddingHorizontal: 4 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  icon: { fontSize: 14, fontWeight: 'bold', marginRight: 6 },
  text: { fontSize: 12 },
  invalidText: { color: '#BA1A1A' }, // Tono rojo descriptivo
  validText: { color: '#15803D' },   // Verde éxito
});
