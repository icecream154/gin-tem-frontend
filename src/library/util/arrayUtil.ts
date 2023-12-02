export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};

export function splitArrayIntoGroups<T>(array: T[], groupSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += groupSize) {
        result.push(array.slice(i, i + groupSize));
    }
    return result;
}

export function arrayFetch<T>(array: T[] | undefined, idx: number): T | undefined {
    if (array && array.length > idx) {
        return array[idx];
    }
    return undefined;
}

export function arrayFetchIn<T>(array: T[], obj: T, inFunc: (t1: T, t2: T) => boolean): boolean {
    for (let aObj of array) {
        if (inFunc(aObj, obj)) {
            return true;
        }
    }
    return false;
}

export function arrayRemove<T>(array: T[], obj: T, inFunc: (t1: T, t2: T) => boolean): T[] {
    let res: T[] = [];
    for (let aObj of array) {
        if (!inFunc(aObj, obj)) {
            res = res.concat(aObj)
        }
    }
    return res;
}

// export function arraySort<T>(array: T[], cmp: (t1: T, t2: T) => boolean) : T[] {
//
// }