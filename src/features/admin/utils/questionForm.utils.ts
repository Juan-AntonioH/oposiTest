import { DropdownItem } from '../types';

/* -------------------------------------------------------------------------- */
/*                                 CONSTANTES                                 */
/* -------------------------------------------------------------------------- */

export const ANSWERS: DropdownItem[] = [

    { label: 'A', value: 'A' },

    { label: 'B', value: 'B' },

    { label: 'C', value: 'C' },

    { label: 'D', value: 'D' },

];

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

export function mapIndexToLetter(
    index: number,
): string {

    return ['A', 'B', 'C', 'D'][index] ?? 'A';

}

export function mapLetterToIndex(
    letter: string,
): number {

    return {

        A: 0,

        B: 1,

        C: 2,

        D: 3,

    }[letter.toUpperCase()] ?? 0;

}

/* -------------------------------------------------------------------------- */
/*                                 DROPDOWNS                                  */
/* -------------------------------------------------------------------------- */

export function buildBlockItems(
    selectedBlock?: string,
    totalBlocks = 8,
): DropdownItem[] {

    const items =
        Array.from(
            { length: totalBlocks },
            (_, index) => {

                const number =
                    index + 1;

                const id =
                    number
                        .toString()
                        .padStart(2, '0');

                return {

                    label: `Bloque ${number}`,

                    value: `bloque_${id}`,

                };

            },
        );

    if (

        selectedBlock &&

        !items.some(
            item =>
                item.value === selectedBlock,
        )

    ) {

        const number =
            selectedBlock.match(/\d+/)?.[0] ??
            selectedBlock;

        items.push({

            label: `Bloque ${number}`,

            value: selectedBlock,

        });

    }

    return items;

}

export function buildThemeItems(
    selectedTheme?: string,
    totalThemes = 15,
): DropdownItem[] {

    const items =
        Array.from(
            { length: totalThemes },
            (_, index) => {

                const number =
                    index + 1;

                const id =
                    number
                        .toString()
                        .padStart(2, '0');

                return {

                    label: `Tema ${number}`,

                    value: `tema_${id}`,

                };

            },
        );

    if (

        selectedTheme &&

        !items.some(
            item =>
                item.value === selectedTheme,
        )

    ) {

        const number =
            selectedTheme.match(/\d+/)?.[0] ??
            selectedTheme;

        items.push({

            label: `Tema ${number}`,

            value: selectedTheme,

        });

    }

    return items.sort((a, b) =>
        a.label.localeCompare(
            b.label,
            undefined,
            {
                numeric: true,
            },
        ),
    );

}