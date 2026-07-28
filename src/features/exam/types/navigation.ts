import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/navigation/types';
import { ExamType } from './examType';
import { SelectedTheme } from './questionFilters';

export interface OppositionParams {
    oppositionId: string;
    name: string;
}

export interface TestScreenParams
    extends OppositionParams {

    setTime: number;

    examType: ExamType;

    year?: number;

    convocatoria?: string;

    immediateSolution: boolean;

    titleParam: string;

    selectedBlocks?: string[];

    selectedThemes?: SelectedTheme[];

}

export type OppositionNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        'OppositionScreen'
    >;