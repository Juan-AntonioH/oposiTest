import React from 'react';
import { StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  progress: number; // Valor esperado: entre 0 y 1
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  // Aseguramos que el valor esté acotado entre 0 y 100%
  const percentage = Math.min(Math.max(progress * 100, 0), 100);

  return (
    <View style={styles.track}>
      <View style={[styles.filler, { width: `${percentage}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 8,
    width: '100%',
    backgroundColor: '#E5E7EB',
    borderRadius: 99,
    overflow: 'hidden',
  },
  filler: {
    height: '100%',
    backgroundColor: '#10B981', // Color verde para indicar éxito/progreso
    borderRadius: 99,
  },
});
