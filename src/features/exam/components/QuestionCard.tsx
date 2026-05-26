import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Question } from '../types';
import { useExamStore } from '../store/useExamStore';

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const { answers, setAnswer } = useExamStore();
  const selectedAnswer = answers[question.id];

  return (
    <View style={styles.card}>
      <Text style={styles.statement}>{question.statement}</Text>
      
      {question.options.map((option, index) => {
        const isSelected = selectedAnswer === index;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.optionButton, isSelected && styles.optionSelected]}
            onPress={() => setAnswer(question.id, index)}
            activeOpacity={0.7}
          >
            <Text style={[styles.optionText, isSelected && styles.textSelected]}>
              {String.fromCharCode(65 + index)}) {option} {/* Renderiza A), B), C), D) */}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#ffffff', padding: 20, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  statement: { fontSize: 18, fontWeight: '600', color: '#111928', marginBottom: 16, lineHeight: 24 },
  optionButton: { padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#E5E7EB', marginVertical: 6, backgroundColor: '#F9FAFB' },
  optionSelected: { borderColor: '#1A56DB', backgroundColor: '#EBF5FF' },
  optionText: { fontSize: 15, color: '#4B5563' },
  textSelected: { color: '#1E429F', fontWeight: '500' }
});
