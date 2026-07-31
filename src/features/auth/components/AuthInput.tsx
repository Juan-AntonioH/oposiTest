import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Props extends TextInputProps {
  label: string;
  icon?: React.ComponentProps<typeof MaterialIcons>['name'];
  helperText?: string | false;
  error?: boolean;

  // 👁️ NUEVO
  enableTogglePassword?: boolean;
}

export function AuthInput({
  label,
  icon,
  helperText,
  error,
  secureTextEntry,
  enableTogglePassword,
  ...rest
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = secureTextEntry && enableTogglePassword;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputContainer, error && styles.inputError]}>
        {/* ICONO IZQUIERDA */}
        {icon && (
          <MaterialIcons
            name={icon}
            size={22}
            color={error ? '#A94442' : '#64748B'}
            style={styles.icon}
          />
        )}

        {/* INPUT */}
        <TextInput
          style={styles.input}
          placeholderTextColor="#94A3B8"
          secureTextEntry={isPasswordField ? !showPassword : secureTextEntry}
          {...rest}
        />

        {/* OJO DERECHA */}
        {isPasswordField && (
          <Pressable
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.eyeIcon}
          >
            <MaterialIcons
              name={showPassword ? 'visibility-off' : 'visibility'}
              size={22}
              color="#64748B"
            />
          </Pressable>
        )}
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
  container: {
    marginBottom: 16,
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 6,
  },

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

  inputError: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    height: '100%',
    color: '#1E293B',
    fontSize: 15,
  },

  eyeIcon: {
    paddingLeft: 8,
    paddingVertical: 4,
  },

  helper: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },

  helperError: {
    color: '#991B1B',
  },
});