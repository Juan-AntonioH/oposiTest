import React from 'react';

import {
    Text,
    View,
} from 'react-native';
import { blockStyles } from '../styles/examBlock.styles';
import {
    ThemeItem,
} from './ThemeItem';

import {
    ThemeGroup,
} from '../hooks/useThemes';
import { SelectedTheme } from '../types';

interface ThemeGroupListProps {

    groups: ThemeGroup[];

    selectedThemes: SelectedTheme[];

    onToggleTheme: (
        blockId: string,
        themeId: string,
    ) => void;

}

export function ThemeGroupList({

    groups,

    selectedThemes,

    onToggleTheme,

}: ThemeGroupListProps) {

    return (

        <>

            {groups.map(group => (

                <View

                    key={
                        group.block.id
                    }

                    style={{
                        marginBottom: 20,
                    }}

                >

                    <Text

                        style={[

                            blockStyles.blockRowTitle,

                            {

                                fontSize: 17,

                                marginBottom: 10,

                                paddingLeft: 4,

                                fontWeight: '700',

                            },

                        ]}

                    >

                        {group.block.name}

                    </Text>

                    <View

                        style={[

                            blockStyles.blocksContainerCard,

                            {

                                marginTop: 0,

                                paddingVertical: 6,

                            },

                        ]}

                    >

                        {group.themes.map(theme => (

                            <ThemeItem
                                key={theme.idDocument}
                                theme={theme}
                                selected={
                                    selectedThemes.some(
                                        selected =>
                                            selected.blockId === theme.blockId &&
                                            selected.themeId === theme.themeId,
                                    )
                                }
                                onPress={() =>
                                    onToggleTheme(
                                        theme.blockId,
                                        theme.themeId,
                                    )
                                }
                            />

                        ))}

                    </View>

                </View>

            ))}

        </>

    );

}