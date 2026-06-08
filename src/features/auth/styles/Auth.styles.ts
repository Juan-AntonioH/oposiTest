import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows } from '@/core/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: '#F5F7FB',
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    ...shadows.sm,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing.md,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: '#1F2937',
  },

  inputGroup: {
    marginBottom: spacing.md,
  },

  label: {
    fontSize: 13,
    marginBottom: spacing.xs,
    color: '#374151',
    fontWeight: '500',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    // backgroundColor: '#fff',
  },

  icon: {
    marginRight: spacing.xs,
  },

  input: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: '#111827',
  },

  forgot: {
    textAlign: 'center',
    marginTop: spacing.md,
    // color: colors.primary,
    fontSize: 13,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.md,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },

  or: {
    marginHorizontal: spacing.sm,
    color: '#9CA3AF',
    // fontSize: 12,
  },
  recoveryText: {
    color: colors.danger,
    textAlign: 'center',
    fontSize: 14,
  },
  backButtonText: {
    color: '#64748B', // Usa tu paleta de colores del tema global si existe
    fontSize: 15,
    fontWeight: '600',
  },
  backButtonContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingHorizontal: 4, // Pequeño margen para que no pegue directo al borde de la pantalla
  },

  // Área táctil del botón volver (facilita la pulsación del usuario)
  backButton: {
    paddingVertical: 8,
    paddingRight: 16, // Espacio interactivo hacia la derecha
  },

});