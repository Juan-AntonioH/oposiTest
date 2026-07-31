import { Role } from '@/core/types/roles';

// Puede acceder a crear/modificar preguntas
export function canManageQuestions(role?: Role | null) {
  return role === 'admin' || role === 'moderator';
}

// Puede hacer tests (todos los logueados menos visitantes)
export function canTakeExam(role?: Role | null) {
  return role === 'user' || role === 'premium' || role === 'moderator' || role === 'admin';
}

// Puede ver estadísticas avanzadas
export function canSeePremiumStats(role?: Role | null) {
  return role === 'premium' || role === 'admin';
}