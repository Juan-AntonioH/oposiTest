import React from 'react';

import {
    Pressable,
    Text,
    View,
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    SelectedTheme,
    ThemeWithCount,
} from '../../types';

import { ThemeGroup } from '../../hooks/custom/useCustomSelection';

import { customStyles } from '../../styles';

interface CustomBodyProps {

    loading: boolean;

    groups: ThemeGroup[];

    selectedBlocks: string[];

    selectedThemes: SelectedTheme[];

    onToggleBlock: (
        blockId: string,
    ) => void;

    onToggleTheme: (
        blockId: string,
        themeId: string,
    ) => void;

}

export function CustomBody({

    loading,

    groups,

    selectedBlocks,

    selectedThemes,

    onToggleBlock,

    onToggleTheme,

}: CustomBodyProps) {

    if (loading) {

        return null;

    }

    return (

        <>

            <View style={customStyles.section}>

                <Text style={customStyles.sectionTitle}>
                    Selecciona bloques
                </Text>

                {groups.map(group => {

                    const checked =
                        selectedBlocks.includes(
                            group.block.id,
                        );

                    return (

                        <Pressable

                            key={group.block.id}

                            style={[

                                customStyles.blockCard,

                                checked &&
                                customStyles.blockCardSelected,

                            ]}

                            onPress={() =>
                                onToggleBlock(
                                    group.block.id,
                                )
                            }

                        >

                            <MaterialCommunityIcons

                                name={

                                    checked

                                        ? 'checkbox-marked'

                                        : 'checkbox-blank-outline'

                                }

                                size={24}

                                color={
                                    checked
                                        ? '#2F70F2'
                                        : '#CBD5E1'
                                }

                            />

                            <View style={customStyles.blockInfo}>

                                <Text style={customStyles.blockTitle}>

                                    {group.block.name}

                                </Text>

                                <Text style={customStyles.blockSubtitle}>

                                    {group.themes.reduce(

                                        (

                                            total,

                                            theme,

                                        ) =>

                                            total +

                                            theme.questionCount,

                                        0,

                                    )}{' '}

                                    preguntas

                                </Text>

                            </View>

                        </Pressable>

                    );

                })}

            </View>

            <View style={customStyles.section}>

                <Text style={customStyles.sectionTitle}>
                    Selecciona temas (opcional)
                </Text>

                {groups

                    .filter(group =>

                        selectedBlocks.includes(

                            group.block.id,

                        ),

                    )

                    .map(group => (

                        <View

                            key={group.block.id}

                            style={customStyles.themeGroup}

                        >

                            <Text style={customStyles.themeGroupTitle}>

                                {group.block.name}

                            </Text>

                            {group.themes.map(theme => {

                                const checked =
                                    selectedThemes.some(

                                        selected =>

                                            selected.blockId ===

                                            theme.blockId &&

                                            selected.themeId ===

                                            theme.themeId,

                                    );

                                return (

                                    <Pressable

                                        key={theme.idDocument}

                                        style={[

                                            customStyles.themeCard,

                                            checked &&
                                            customStyles.themeCardSelected,

                                        ]}

                                        onPress={() =>

                                            onToggleTheme(

                                                theme.blockId,

                                                theme.themeId,

                                            )

                                        }

                                    >

                                        <MaterialCommunityIcons

                                            name={

                                                checked

                                                    ? 'checkbox-marked'

                                                    : 'checkbox-blank-outline'

                                            }

                                            size={22}

                                            color={

                                                checked

                                                    ? '#2F70F2'

                                                    : '#CBD5E1'

                                            }

                                        />

                                        <View

                                            style={customStyles.themeInfo}

                                        >

                                            <Text

                                                style={customStyles.themeTitle}

                                            >

                                                {theme.name}

                                            </Text>

                                            <Text

                                                style={customStyles.themeSubtitle}

                                            >

                                                {theme.questionCount}{' '}

                                                preguntas

                                            </Text>

                                        </View>

                                    </Pressable>

                                );

                            })}

                        </View>

                    ))}

            </View>

        </>

    );

}