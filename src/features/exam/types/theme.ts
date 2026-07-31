export interface Theme {

    idDocument: string;      // bloque_01_tema_01

    blockId: string;

    themeId: string;

    oppositionId: string;

    name: string;

    order: number;

}

export interface ThemeWithCount extends Theme {

    questionCount: number;

}