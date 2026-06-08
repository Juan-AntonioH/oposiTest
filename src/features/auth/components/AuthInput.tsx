import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/core/theme';

interface Props extends TextInputProps {
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name']; 
  helperText?: string | false;
  error?: boolean; // Para pintar bordes rojos si falla el formato
}

export function AuthInput({ label, icon, helperText, error, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <MaterialIcons 
          name={icon as any} 
          size={22} 
          color={error ? '#A94442' : '#64748B'} 
          style={styles.icon} 
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#94A3B8"
          {...rest}
        />
      </View>
      {helperText && (
        <Text style={[styles.helper, error && styles.helperError]}>
          {helperText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 16, width: '100%' },
  label: { fontSize: 14, fontWeight: '500', color: '#334155', marginBottom: 6 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    height: 48,
  },
  inputError: { borderColor: '#FCA5A5', backgroundColor: '#FEF2F2' },
  icon: { marginRight: 10 },
  input: { flex: 1, height: '100%', color: '#1E293B', fontSize: 15 },
  helper: { fontSize: 12, color: '#64748B', marginTop: 4 },
  helperError: { color: '#991B1B' },
});
