import {
    useCallback,
    useState,
} from 'react';

import Toast from 'react-native-toast-message';

import { OppositionMenuItem } from '../../constants/oppositionMenu';
import { OppositionNavigationProp } from '../../types/navigation';
import { prepareExam } from '../../services/examPreparationService';
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

    const [
        preparingSimulacrum,
        setPreparingSimulacrum,
    ] = useState(false);


    const handleMenuPress = useCallback(
        async (item: OppositionMenuItem) => {

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

                case 'simulacrum': {

                    setPreparingSimulacrum(true);

                    let timedOut = false;

                    const timeout =
                        setTimeout(() => {

                            timedOut = true;

                            setPreparingSimulacrum(false);

                            Toast.show({

                                type: 'error',

                                text1:
                                    'No se pudo cargar el Simulacro',

                                text2:
                                    'La preparación ha tardado demasiado.',

                            });

                        }, 10000);

                    try {

                        await prepareExam({

                            examType: 'simulacrum',

                            oppositionId,

                        });

                        clearTimeout(timeout);

                        /*
                         * Si ya hemos superado los 10 segundos,
                         * no navegamos aunque Firestore termine.
                         */

                        if (timedOut) {

                            return;

                        }

                        setPreparingSimulacrum(false);

                        navigation.navigate(

                            'TestScreen',

                            {

                                oppositionId,

                                name,

                                setTime: 100,

                                examType: 'simulacrum',

                                immediateSolution: false,

                                titleParam: 'Simulacro',

                            },

                        );

                    } catch (error) {

                        clearTimeout(timeout);

                        /*
                         * Si el timeout ya ocurrió,
                         * el Toast de timeout ya se mostró.
                         */

                        if (timedOut) {

                            console.error(
                                'SIMULACRUM: error after timeout',
                                error,
                            );

                            return;

                        }

                        setPreparingSimulacrum(false);

                        console.error(
                            'SIMULACRUM: error starting test',
                            error,
                        );

                        Toast.show({

                            type: 'error',

                            text1:
                                'No se pudo cargar el Simulacro',

                            text2:
                                'Ha ocurrido un error al cargar las preguntas.',

                        });

                    }

                    break;

                }

                case 'wrong':

                    navigation.navigate(
                        'WrongQuestionsScreen',
                        {
                            oppositionId,
                            name,
                        },
                    );

                    break;

            }

        },
        [navigation, oppositionId, name],
    );

    return {
        handleMenuPress,
        preparingSimulacrum,
    };

}