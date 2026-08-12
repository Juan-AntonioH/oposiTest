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