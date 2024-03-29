export function getRandom<T>(arr: T[]) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

export function shuffle<T>(arr: T[]) {
    const array = [...arr];

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}
