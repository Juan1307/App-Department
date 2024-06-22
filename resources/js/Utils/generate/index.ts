
function generateRows(data: object, num: number) {
    const saveArray = [];

    for (let index = 0; index < num; index++) {
        saveArray.push({ key: index, ...data })
    }
    return saveArray;
}

export { generateRows }