export function formatExamTime(
    totalMinutes: number,
): string {

    const hours =
        Math.floor(totalMinutes / 60);

    const minutes =
        totalMinutes % 60;

    if (hours > 0) {

        return `${hours} h ${minutes} min`;

    }

    return `${minutes} min`;

}