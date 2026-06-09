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
  disabledButton: { backgroundColor: '#CBD5E1' },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  localScroll: { paddingBottom: 40 },
  submitButton: {
    backgroundColor: '#94A3B8',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  scrollContent: {
    flexGrow: 1,          // Permite que el scroll se estire correctamente si el contenido es menor a la pantalla
    paddingHorizontal: 16, // Margen interno izquierdo y derecho para que no pegue al borde del dispositivo
    paddingTop: 10,
    paddingBottom: 30,    // Espaciado inferior para que el botón de Crear Cuenta no quede cortado
  },
  /* ==========================================================================
    NUEVOS ESTILOS PARA AUTHENTICATOR
    ========================================================================== */
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xl,
  },

  emailText: {
    fontWeight: '600',
    color: '#334155',
  },

  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: spacing.xl,
  },

  codeInput: {
    width: '14%',
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: radius.md, // 👈 Reutiliza tus esquinas del tema
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    backgroundColor: colors.white,
    // textAlign: 'center',
  },

  resendText: {
    fontSize: 14,
    color: '#64748B',
    // textAlign: 'center',
    // marginTop: spacing.md,
  },

  resendLink: {
    color: colors.primary, // 👈 Reutiliza tu color principal para el enlace
    fontWeight: '600',
  },
  button: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#94A3B8', // Gris desactivado como en tu captura
  },
  buttonActive: {
    backgroundColor: '#1D4ED8', // Cambia a azul brillante al completarse
  },
  authenticatorContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  authenticatorCard: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    // Sombra suave para la tarjeta blanca
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  /* ==========================================================================
  NUEVOS ESTILOS PARA AUTHENTICATOR MODAL
  ========================================================================== */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fondo oscuro translúcido
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    // Sombra pronunciada para dar efecto de flotación
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  successIconContainer: {
    marginBottom: spacing.sm,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 20,
  },
  iconWrapper: {
    marginBottom: spacing.sm,
  },
});