import React from 'react';

import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Switch,
    Text,
    View,
} from 'react-native';

import {
    Ionicons,
    MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
    blockStyles, styles, testStyles
} from '@/features/exam/styles';

import {
    Block,
} from '../types';

interface BlockListProps {

    startingTest: boolean;

    loading: boolean;

    oppositionName: string;

    immediateSolution: boolean;

    setImmediateSolution: (
        value: boolean,
    ) => void;

    blocks: Block[];

    selectedBlocks: string[];

    onToggleBlock: (
        blockId: string,
    ) => void;

    onStartTest: () => void;

}

export function BlockList({

    startingTest,

    loading,

    oppositionName,

    immediateSolution,

    setImmediateSolution,

    blocks,

    selectedBlocks,

    onToggleBlock,

    onStartTest,

}: BlockListProps) {

    if (loading) {

        return (

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <ActivityIndicator
                    size="large"
                    color="#2F70F2"
                />

            </View>

        );

    }

    return (

        <>
            <ScrollView
                contentContainerStyle={
                    testStyles.scrollContainer
                }
                showsVerticalScrollIndicator={false}
            >

                <Text style={styles.mainTitle}>
                    {oppositionName}
                </Text>

                <View style={styles.toggleCard}>

                    <View style={styles.toggleHeader}>

                        <Ionicons
                            name={
                                immediateSolution
                                    ? 'eye-outline'
                                    : 'eye-off-outline'
                            }
                            size={20}
                            color={
                                immediateSolution
                                    ? '#2F70F2'
                                    : '#64748B'
                            }
                            style={{
                                marginRight: 8,
                            }}
                        />

                        <Text style={styles.toggleTitle}>
                            Mostrar solución inmediata
                        </Text>

                        <Switch
                            value={immediateSolution}
                            onValueChange={
                                setImmediateSolution
                            }
                            trackColor={{
                                false: '#CBD5E1',
                                true: '#2F70F2',
                            }}
                            thumbColor="#FFFFFF"
                        />

                    </View>

                    <Text style={styles.toggleSubtitle}>

                        Si está activado,
                        verás la respuesta correcta
                        después de cada pregunta.

                    </Text>

                </View>

                <View
                    style={
                        blockStyles.blocksContainerCard
                    }
                >

                    <Text
                        style={
                            blockStyles.blocksContainerSubtitle
                        }
                    >

                        Selecciona uno o varios bloques

                    </Text>

                    {

                        blocks.map(block => {

                            const selected =
                                selectedBlocks.includes(
                                    block.id,
                                );

                            return (

                                <Pressable

                                    key={block.idDocument}

                                    style={[

                                        blockStyles.blockRowCard,

                                        selected &&
                                        blockStyles.blockRowCardSelected,

                                    ]}

                                    onPress={() =>
                                        onToggleBlock(
                                            block.id,
                                        )
                                    }

                                >

                                    <MaterialCommunityIcons
                                        name={
                                            selected
                                                ? 'checkbox-marked'
                                                : 'checkbox-blank-outline'
                                        }
                                        size={24}
                                        color={
                                            selected
                                                ? '#2F70F2'
                                                : '#CBD5E1'
                                        }
                                        style={{
                                            marginRight: 12,
                                        }}
                                    />

                                    <View
                                        style={
                                            blockStyles.blockGridIconBox
                                        }
                                    >

                                        <MaterialCommunityIcons
                                            name="grid"
                                            size={22}
                                            color="#64748B"
                                        />

                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                        }}
                                    >

                                        <Text
                                            style={
                                                blockStyles.blockRowTitle
                                            }
                                        >

                                            {block.name}

                                        </Text>

                                        <Text
                                            style={
                                                blockStyles.blockRowSub
                                            }
                                        >

                                            {block.numThemes} temas

                                        </Text>

                                    </View>

                                </Pressable>

                            );

                        })

                    }

                </View>

                <View
                    style={{
                        marginTop: 20,
                        marginBottom: 30,
                    }}
                >

                    <Pressable

                        style={
                            selectedBlocks.length > 0 && !startingTest
                                ? testStyles.primaryButton
                                : testStyles.primaryButtonDisabled
                        }

                        disabled={
                            selectedBlocks.length === 0 ||
                            startingTest
                        }

                        onPress={onStartTest}

                    >

                        {startingTest ? (

                            <ActivityIndicator
                                size="small"
                                color="#FFFFFF"
                            />

                        ) : (

                            <Text
                                style={
                                    testStyles.primaryButtonText
                                }
                            >

                                Iniciar Test (
                                {selectedBlocks.length}
                                {' '}
                                {
                                    selectedBlocks.length === 1
                                        ? 'bloque'
                                        : 'bloques'
                                }
                                )

                            </Text>

                        )}

                    </Pressable>

                </View>

            </ScrollView>

        </>

    );

}