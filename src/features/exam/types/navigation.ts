import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/navigation/types';

export interface OppositionParams {
    oppositionId: string;
    name: string;
}

export interface TestScreenParams extends OppositionParams {
    setTime: number;
    examType: string;
    year: number;
    immediateSolution: boolean;
    titleParam: string;
}

export type OppositionNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        'OppositionScreen'
    >;