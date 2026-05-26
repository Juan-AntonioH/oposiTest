import React from 'react';
import { StyleSheet, Text, TouchableOpacity, GestureResponderEvent } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary';
}

export const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, variant = 'primary' }) => {
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity 
      style={[styles.button, isPrimary ? styles.primaryBtn : styles.secondaryBtn]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  primaryBtn: { backgroundColor: '#1A56DB' },
  secondaryBtn: { backgroundColor: '#F3F4F6', borderWidth: 1, borderColor: '#E5E7EB' },
  text: { fontSize: 16, fontWeight: '600' },
  primaryText: { color: '#FFFFFF' },
  secondaryText: { color: '#374151' },
});
