import { useCallback } from 'react';

import { OppositionMenuItem } from '../constants/oppositionMenu';
import { OppositionNavigationProp } from '../types/navigation';

interface UseOppositionMenuProps {
    navigation: OppositionNavigationProp;
    oppositionId: string;
    name: string;
}

export function useOppositionMenu({
    navigation,
    oppositionId,
    name,
}: UseOppositionMenuProps) {

    const handleMenuPress = useCallback(
        (item: OppositionMenuItem) => {

            switch (item.id) {

                case 'exams':
                    navigation.navigate('ExamsScreen', {
                        oppositionId,
                        name,
                    });
                    break;

                case 'blocks':
                    navigation.navigate('BlocksScreen', {
                        oppositionId,
                        name,
                    });
                    break;

                case 'themes':
                    navigation.navigate('ThemesScreen', {
                        oppositionId,
                        name,
                    });
                    break;

                case 'custom':
                    navigation.navigate('CustomTestScreen', {
                        oppositionId,
                        name,
                    });
                    break;

                case 'simulacrum':
                    navigation.navigate('TestScreen', {
                        oppositionId,
                        name,
                        setTime: 100,
                        examType: 'simulacrum',
                        year: new Date().getFullYear(),
                        immediateSolution: false,
                        titleParam: 'Simulacro',
                    });
                    break;

                case 'wrong':
                    navigation.navigate('WrongQuestionsScreen', {
                        oppositionId,
                        name,
                    });
                    break;

            }

        },
        [navigation, oppositionId, name],
    );

    return {
        handleMenuPress,
    };

}