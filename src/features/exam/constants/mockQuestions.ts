export interface Question {
    numQuestion: number;
    questionId: string;
    blockId: string;
    temaId: string;
    question: string;
    options: string[];
    userResponse: number | null;
    correctAnswer: number;
    questionTimeSpent: number;
    explanation?: string;

    // 👈 AÑADIMOS ESTOS METADATOS DE FIRESTORE COMO OPCIONALES
    id?: string;
    oppositionId?: string;
    randomId?: number;
    esOficial?: boolean;
    examYear?: number;
    examConvocatoria?: string;
}

export const MOCK_QUESTIONS: Question[] = [
    {
        numQuestion: 1,
        questionId: "p320",
        blockId: "bloque_01",
        temaId: "tema_01",
        question: "¿Cuál es la respuesta correcta para este caso de ejemplo de la oposición?",
        options: [
            "Opción A de la pregunta 1",
            "Opción B de la pregunta 1",
            "Opción C de la pregunta 1",
            "Opción D de la pregunta 1"
        ],
        userResponse: null,
        correctAnswer: 2,
        questionTimeSpent: 0,
        explanation: "Esta es la explicación detallada de por qué la opción correcta es la respuesta adecuada para la pregunta 1. En el contexto de la oposición, este concepto es fundamental porque...",
        // Opcionales simulados para pruebas
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2011,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 2,
        questionId: "p321",
        blockId: "bloque_01",
        temaId: "tema_02",
        question: "¿Cuál es el plazo general para interponer un recurso de alzada?",
        options: [
            "Un mes",
            "Dos meses",
            "Quince días",
            "Diez días"
        ],
        userResponse: null,
        correctAnswer: 0,
        questionTimeSpent: 0,
        explanation: "El plazo para la interposición del recurso de alzada será de un mes si el acto fuera expreso, de acuerdo con la Ley de Procedimiento Administrativo Común.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2011,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 3,
        questionId: "p322",
        blockId: "bloque_02",
        temaId: "tema_05",
        question: "Según la Constitución Española, ¿en quién reside la soberanía nacional?",
        options: [
            "En el Rey",
            "En las Cortes Generales",
            "En el Pueblo Español",
            "En el Gobierno de la Nación"
        ],
        userResponse: null,
        correctAnswer: 2,
        questionTimeSpent: 0,
        explanation: "El artículo 1.2 de la Constitución establece explícitamente que la soberanía nacional reside en el pueblo español, del que emanan los poderes del Estado.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2011,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 4,
        questionId: "p323",
        blockId: "bloque_03",
        temaId: "tema_08",
        question: "¿Qué tipo de norma jurídica tiene rango de Ley y es dictada por el Gobierno en caso de extraordinaria y urgente necesidad?",
        options: [
            "Real Decreto Legislativo",
            "Real Decreto-Ley",
            "Ley Orgánica",
            "Reglamento"
        ],
        userResponse: null,
        correctAnswer: 1,
        questionTimeSpent: 0,
        explanation: "En caso de extraordinaria y urgente necesidad, el Gobierno podrá dictar disposiciones legislativas provisionales que tomarán la forma de Decretos-leyes.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2011,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 5,
        questionId: "p324",
        blockId: "bloque_03",
        temaId: "tema_10",
        question: "¿Cuál es la capital de España?",
        options: [
            "Madrid",
            "Barcelona",
            "Valencia",
            "Sevilla"
        ],
        userResponse: null,
        correctAnswer: 0,
        questionTimeSpent: 0,
        explanation: "La capital del Estado es la villa de Madrid, tal y como recoge el artículo 5 de la Constitución Española.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2014,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 6,
        questionId: "p325",
        blockId: "bloque_02",
        temaId: "tema_05",
        question: "¿Qué artículo de la Constitución Española garantiza el derecho a la educación?",
        options: [
            "Artículo 14",
            "Artículo 27",
            "Artículo 16",
            "Artículo 24"
        ],
        userResponse: null,
        correctAnswer: 1,
        questionTimeSpent: 0,
        explanation: "El derecho a la educación y la libertad de enseñanza están regulados en el artículo 27 de la Constitución Española.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2014,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 7,
        questionId: "p326",
        blockId: "bloque_01",
        temaId: "tema_02",
        question: "Contra las resoluciones de los órganos administrativos que no ponen fin a la vía administrativa, ¿qué recurso procede?",
        options: [
            "Recurso potestativo de reposición",
            "Recurso de alzada",
            "Recurso extraordinario de revisión",
            "Recurso contencioso-administrativo"
        ],
        userResponse: null,
        correctAnswer: 1,
        questionTimeSpent: 0,
        explanation: "El recurso de alzada se interpone ante los actos que no ponen fin a la vía administrativa, para que el superior jerárquico los revise.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2015,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 8,
        questionId: "p327",
        blockId: "bloque_02",
        temaId: "tema_06",
        question: "¿Quién ejerce el mando supremo de las Fuerzas Armadas en España?",
        options: [
            "El Presidente del Gobierno",
            "El Ministro de Defensa",
            "El Rey",
            "El Jefe del Estado Mayor de la Defensa"
        ],
        userResponse: null,
        correctAnswer: 2,
        questionTimeSpent: 0,
        explanation: "Corresponde al Rey el mando supremo de las Fuerzas Armadas, según lo estipulado en el artículo 62.h) de la Constitución.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2015,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 9,
        questionId: "p328",
        blockId: "bloque_01",
        temaId: "tema_03",
        question: "¿Cuál es el plazo general de vacatio legis de las leyes si en ellas no se dispone otra cosa?",
        options: [
            "Diez días",
            "Quince días",
            "Veinte días",
            "Un mes"
        ],
        userResponse: null,
        correctAnswer: 2,
        questionTimeSpent: 0,
        explanation: "El artículo 2.1 del Código Civil establece que las leyes entrarán en vigor a los veinte días de su completa publicación en el BOE.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2016,
        examConvocatoria: "Promoción Interna"
    },
    {
        numQuestion: 10,
        questionId: "p329",
        blockId: "bloque_04",
        temaId: "tema_12",
        question: "¿Qué tipo de personal al servicio de las Administraciones Públicas es nombrado por un acto administrativo de autoridad?",
        options: [
            "Personal laboral fijo",
            "Personal eventual",
            "Funcionario de carrera",
            "Personal laboral temporal"
        ],
        userResponse: null,
        correctAnswer: 2,
        questionTimeSpent: 0,
        explanation: "Los funcionarios de carrera se vinculan a la Administración por una relación estatutaria regulada por el Derecho Administrativo y nacida de un nombramiento oficial.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2016,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 11,
        questionId: "p330",
        blockId: "bloque_02",
        temaId: "tema_07",
        question: "¿Por cuántos Diputados está compuesto el Congreso como mínimo según el texto constitucional?",
        options: [
            "300 Diputados",
            "350 Diputados",
            "400 Diputados",
            "250 Diputados"
        ],
        userResponse: null,
        correctAnswer: 0,
        questionTimeSpent: 0,
        explanation: "El artículo 68.1 de la Constitución establece que el Congreso se compone de un mínimo de 300 y un máximo de 400 Diputados. Actualmente la ley electoral lo fija en 350.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2017,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 12,
        questionId: "p331",
        blockId: "bloque_01",
        temaId: "tema_02",
        question: "¿Cuál de los siguientes no se considera un interesado en el procedimiento administrativo?",
        options: [
            "Quienes lo promuevan como titulares de derechos individuales",
            "Los que tengan derechos que puedan resultar afectados por la decisión",
            "La propia autoridad que tramita y resuelve el expediente administrativo",
            "Aquellos cuyos intereses legítimos puedan resultar afectados y se personen"
        ],
        userResponse: null,
        correctAnswer: 2,
        questionTimeSpent: 0,
        explanation: "La autoridad o el órgano instructor forma parte de la Administración y no tiene la consideración jurídica de 'interesado' en el procedimiento.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2017,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 13,
        questionId: "p332",
        blockId: "bloque_03",
        temaId: "tema_09",
        question: "Las Leyes Orgánicas requieren para su aprobación, modificación o derogación:",
        options: [
            "Mayoría absoluta del Congreso, en una votación final sobre el conjunto del proyecto",
            "Mayoría simple de ambas Cámaras",
            "Mayoría de tres quintos del Senado",
            "Mayoría absoluta de las Cortes Generales en sesión conjunta"
        ],
        userResponse: null,
        correctAnswer: 0,
        questionTimeSpent: 0,
        explanation: "El artículo 81.2 de la Constitución indica que la aprobación de Leyes Orgánicas exige la mayoría absoluta del Congreso en una votación final sobre el conjunto del proyecto.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2018,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 14,
        questionId: "p333",
        blockId: "bloque_02",
        temaId: "tema_05",
        question: "¿Qué institución tiene como función principal defender los derechos fundamentales de los ciudadanos frente a la Administración?",
        options: [
            "El Tribunal de Cuentas",
            "El Consejo de Estado",
            "El Defensor del Pueblo",
            "La Fiscalía General del Estado"
        ],
        userResponse: null,
        correctAnswer: 2,
        questionTimeSpent: 0,
        explanation: "El Defensor del Pueblo es el alto comisionado de las Cortes Generales designado para la defensa de los derechos del Título I constitutivo.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2018,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 15,
        questionId: "p334",
        blockId: "bloque_01",
        temaId: "tema_02",
        question: "¿Qué efectos generales produce el silencio administrativo en los procedimientos iniciados a solicitud del interesado como regla general?",
        options: [
            "Estimatorio",
            "Desestimatorio",
            "Caducidad del procedimiento",
            "Nulidad absoluta"
        ],
        userResponse: null,
        correctAnswer: 0,
        questionTimeSpent: 0,
        explanation: "La regla general en los procedimientos iniciados a solicitud de interesado es el silencio positivo (estimatorio), salvo las excepciones de ley.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2019,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 16,
        questionId: "p335",
        blockId: "bloque_04",
        temaId: "tema_13",
        question: "¿Cuál de las siguientes es una falta disciplinaria calificada como muy grave para los funcionarios públicos?",
        options: [
            "El incumplimiento injustificado del horario de trabajo",
            "La falta de consideración con los superiores o compañeros",
            "Toda actuación que suponga discriminación por razón de sexo, raza o religión",
            "El retraso negligente en la tramitación de los asuntos asignados"
        ],
        userResponse: null,
        correctAnswer: 2,
        questionTimeSpent: 0,
        explanation: "Los actos discriminatorios están tipificados taxativamente como faltas muy graves en el Estatuto Básico del Empleado Público (TREBEP).",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2019,
        examConvocatoria: "Promoción Interna"
    },
    {
        numQuestion: 17,
        questionId: "p336",
        blockId: "bloque_02",
        temaId: "tema_06",
        question: "¿Quién realiza la propuesta formal de candidato a la Presidencia del Gobierno ante el Congreso?",
        options: [
            "El Presidente del Congreso de los Diputados",
            "El Rey",
            "La Junta de Portavoces",
            "El Consejo de Ministros saliente"
        ],
        userResponse: null,
        correctAnswer: 1,
        questionTimeSpent: 0,
        explanation: "El Rey, previa consulta con los representantes de los grupos políticos con representación parlamentaria, propone el candidato a través del Presidente del Congreso.",
        oppositionId: "opo_01",
        esOficial: true,
        examYear: 2020,
        examConvocatoria: "Libre"
    },
    {
        numQuestion: 18,
        questionId: "p337",
        blockId: "bloque_01", temaId: "tema_04", question: "¿Ante qué órgano se interpone el recurso potestativo de reposición?", options: ["Ante el superior jerárquico del órgano que dictó el acto", "Ante el mismo órgano que dictó el acto objeto de recurso", "Ante el Tribunal Contencioso-Administrativo", "Ante el Tribunal Supremo"], userResponse: null, correctAnswer: 1, questionTimeSpent: 0, explanation: "El recurso potestativo de reposición se interpone y resuelve ante el mismo órgano que hubiera dictado el acto administrativo.", oppositionId: "opo_01", esOficial: true, examYear: 2020, examConvocatoria: "Libre"
    },
    { numQuestion: 19, questionId: "p338", blockId: "bloque_02", temaId: "tema_05", question: "¿Qué mayoría se necesita en las Cámaras para aprobar una reforma ordinaria de la Constitución Española?", options: ["Mayoría simple de ambas Cámaras", "Mayoría de dos tercios de cada Cámara", "Mayoría de tres quintos de cada una de las Cámaras", "Mayoría absoluta en el Congreso y relativa en el Senado"], userResponse: null, correctAnswer: 2, questionTimeSpent: 0, explanation: "Los proyectos de reforma constitucional deberán ser aprobados por una mayoría de tres quintos de cada una de las Cámaras según el artículo 167.1.", oppositionId: "opo_01", esOficial: true, examYear: 2021, examConvocatoria: "Libre" }, { numQuestion: 20, questionId: "p339", blockId: "bloque_03", temaId: "tema_11", question: "De acuerdo con la legislación local, el Municipio es una entidad dotada de:", options: ["Personalidad jurídica propia y autonomía para la gestión de sus intereses", "Soberanía legislativa en el ámbito de sus competencias territoriales", "Dependencia absoluta de los presupuestos generales de su Comunidad Autónoma", "Personalidad jurídica delegada exclusivamente por el Estado"], userResponse: null, correctAnswer: 0, questionTimeSpent: 0, explanation: "La Ley de Bases del Régimen Local y la Constitución garantizan que el Municipio goza de personalidad jurídica propia y autonomía de gestión.", oppositionId: "opo_01", esOficial: true, examYear: 2021, examConvocatoria: "Libre" }, { numQuestion: 21, questionId: "p340", blockId: "bloque_01", temaId: "tema_02", question: "¿Cuál es la consecuencia jurídica de un acto administrativo dictado por un órgano manifiestamente incompetente por razón de la materia?", options: ["Anulabilidad", "Nulidad de pleno derecho", "Revocación inmediata", "Irregularidad no invalidante"], userResponse: null, correctAnswer: 1, questionTimeSpent: 0, explanation: "Los actos dictados por órganos manifiestamente incompetentes por razón de la materia o del territorio son nulos de pleno derecho (Art 47.1.b Ley 39/2015).", oppositionId: "opo_01", esOficial: true, examYear: 2022, examConvocatoria: "Libre" }, { numQuestion: 22, questionId: "p341", blockId: "bloque_02", temaId: "tema_07", question: "Las sesiones conjuntas de las Cortes Generales son presididas por:", options: ["El Presidente del Gobierno", "El Presidente del Senado", "El Presidente del Congreso de los Diputados", "El Rey"], userResponse: null, correctAnswer: 2, questionTimeSpent: 0, explanation: "El artículo 72.2 de la Constitución Española estipula que las sesiones conjuntas de las Cortes serán presididas por el Presidente del Congreso.", oppositionId: "opo_01", esOficial: true, examYear: 2022, examConvocatoria: "Libre" }, { numQuestion: 23, questionId: "p342", blockId: "bloque_04", temaId: "tema_12", question: "¿A qué edad máxima se produce la jubilación forzosa del funcionario público con carácter general?", options: ["60 años", "65 años", "67 años", "70 años"], userResponse: null, correctAnswer: 1, questionTimeSpent: 0, explanation: "La jubilación forzosa del funcionario se declara de oficio al cumplir la edad de 65 años, sin perjuicio de las solicitudes de prolongación.", oppositionId: "opo_01", esOficial: true, examYear: 2023, examConvocatoria: "Libre" }, { numQuestion: 24, questionId: "p343", blockId: "bloque_01", temaId: "tema_02", question: "¿Qué plazo tiene la Administración para notificar la resolución de un procedimiento si su norma reguladora no especifica ninguno?", options: ["Un mes", "Tres meses", "Seis meses", "Veinte días"], userResponse: null, correctAnswer: 1, questionTimeSpent: 0, explanation: "Cuando las normas reguladoras de los procedimientos no fijen el plazo máximo, este será de tres meses según la Ley 39/2015.", oppositionId: "opo_01", esOficial: true, examYear: 2023, examConvocatoria: "Libre" }, { numQuestion: 25, questionId: "p344", blockId: "bloque_02", temaId: "tema_05", question: "¿Quién nombra formalmente al Presidente del Gobierno de España?", options: ["El Congreso de los Diputados", "El Rey", "Las Cortes Generales en sesión conjunta", "El Tribunal Constitucional"], userResponse: null, correctAnswer: 1, questionTimeSpent: 0, explanation: "Una vez otorgada la confianza por el Congreso de los Diputados, el Rey nombrará al candidato como Presidente del Gobierno.", oppositionId: "opo_01", esOficial: true, examYear: 2024, examConvocatoria: "Libre" }
];
