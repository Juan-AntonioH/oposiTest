import React from 'react';

import {
    useNavigation,
    useRoute,
    RouteProp,
} from '@react-navigation/native';

import {
    NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
    RootStackParamList,
} from '@/navigation/types';

import {
    ScreenLayout,
} from '@/shared/layouts/ScreenLayout';

import {
    BlockList,
} from '../components/BlockList';

import {
    useBlocks,
} from '../hooks/useBlocks';
import { BackButton } from '@/shared/components/Button/BackButton';

type BlocksScreenRouteProp =
    RouteProp<
        RootStackParamList,
        'BlocksScreen'
    >;

type BlocksNavigationProp =
    NativeStackNavigationProp<
        RootStackParamList,
        'BlocksScreen'
    >;

export function BlocksScreen() {

    const navigation =
        useNavigation<BlocksNavigationProp>();

    const route =
        useRoute<BlocksScreenRouteProp>();

    const {

        oppositionId,

        name,

    } = route.params;

    const {
        startingTest,

        loading,

        immediateSolution,

        setImmediateSolution,

        blocks,

        selectedBlocks,

        handleToggleBlock,

        handleStartTest,

    } = useBlocks({

        navigation,

        oppositionId,

        name,

    });

    return (

        <ScreenLayout
            title="Test por Bloques"
            showSidebar
        >
            <BackButton />

            <BlockList

                loading={loading}

                startingTest={startingTest}

                oppositionName={name}

                immediateSolution={immediateSolution}

                setImmediateSolution={setImmediateSolution}

                blocks={blocks}

                selectedBlocks={selectedBlocks}

                onToggleBlock={handleToggleBlock}

                onStartTest={handleStartTest}

            />

        </ScreenLayout>

    );

}