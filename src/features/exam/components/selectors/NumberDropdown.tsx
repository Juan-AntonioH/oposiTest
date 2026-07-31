import React, {
    useMemo,
} from 'react';

import {
    Text,
    View,
} from 'react-native';

import {
    Dropdown,
} from 'react-native-element-dropdown';

import {
    styles,
} from '../../styles/exam.styles';

interface DropdownItem {

    label: string;

    value: string;

}

interface NumberDropdownProps {

    label: string;

    prefix: string;

    count: number;

    value: string;

    placeholder?: string;

    required?: boolean;

    onChange: (
        value: string,
    ) => void;

}

export function NumberDropdown({

    label,

    prefix,

    count,

    value,

    placeholder,

    required = false,

    onChange,

}: NumberDropdownProps) {

    const items =
        useMemo(() => {

            return Array.from(

                { length: count },

                (_, index) => {

                    const number =
                        index + 1;

                    return {

                        label: `${label} ${number}`,

                        value: `${prefix}_${number
                            .toString()
                            .padStart(2, '0')}`,

                    };

                },

            );

        }, [
            count,
            label,
            prefix,
        ]);

    return (

        <View>

            <Text style={styles.label}>
                {label}
                {required && ' *'}
            </Text>

            <Dropdown

                style={styles.dropdown}

                placeholderStyle={styles.placeholder}

                selectedTextStyle={styles.selectedText}

                data={items}

                labelField="label"

                valueField="value"

                placeholder={
                    placeholder ??
                    `Seleccionar ${label.toLowerCase()}`
                }

                value={value}

                onChange={(item: DropdownItem) =>
                    onChange(item.value)
                }

            />

        </View>

    );

}