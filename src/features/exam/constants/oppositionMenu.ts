import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface OppositionMenuItem {
    id: 'exams' | 'simulacrum' | 'blocks' | 'themes' | 'custom' | 'wrong';
    title: string;
    subtitle: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    color: string;
}

export const OPPOSITION_MENU: OppositionMenuItem[] = [
    {
        id: 'exams',
        title: 'Exámenes',
        subtitle: 'Exámenes de años anteriores',
        icon: 'book-open-blank-variant',
        color: '#2F70F2',
    },
    {
        id: 'simulacrum',
        title: 'Simulacros',
        subtitle: 'Simulacros sin solución inmediata',
        icon: 'target',
        color: '#00BA52',
    },
    {
        id: 'blocks',
        title: 'Test por bloques',
        subtitle: 'Selecciona uno o varios bloques',
        icon: 'apps',
        color: '#A447FF',
    },
    {
        id: 'themes',
        title: 'Test por temas',
        subtitle: 'Elige temas específicos',
        icon: 'format-list-bulleted',
        color: '#F2990A',
    },
    {
        id: 'custom',
        title: 'Test personalizado',
        subtitle: 'Configura tu propio test',
        icon: 'cog-outline',
        color: '#EF4444',
    },
    // {
    //     id: 'wrong',
    //     title: 'Preguntas erróneas',
    //     subtitle: 'Revisa las preguntas contestadas incorrectamente',
    //     icon: 'alert-circle-outline',
    //     color: '#7A0303',
    // },
];