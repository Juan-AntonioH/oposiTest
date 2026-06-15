import { StyleSheet } from 'react-native';
import { colors, spacing, radius, shadows } from '@/core/theme';

export const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
        backgroundColor: '#F8F9FC',
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 24,
        backgroundColor: '#F8F9FC', // Fondo gris claro idéntico a la imagen
        flexGrow: 1,
    },
    menuContainer: {
        gap: 16,
        marginBottom: 32,
    },
    headerContainer: {
        marginTop: 24,
        // marginBottom: 20,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 14,
    },
    mainTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1C2434',
        marginBottom: 6,
    },
    mainSubtitle: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 16
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 16, // Bordes muy suaves
        padding: 20,
        marginBottom: 16,
        // Configuración de sombras nativas para iOS y Android
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: 16,
        flex: 1,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C2434',
        marginBottom: 4,
    },
    cardSub: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 2,
    },
    adminActionContainer: {
        gap: 12,
        marginTop: 8,
    },
    btn: {
        flexDirection: 'row',
        height: 48,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    btnGreen: {
        backgroundColor: '#00BA52',
    },
    btnBlue: {
        backgroundColor: '#2F70F2',
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
    },
    cardSubtitle: {
        fontSize: 13,
        color: '#64748B',
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