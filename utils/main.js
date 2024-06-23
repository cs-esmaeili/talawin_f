export const getObjectByKey = (array, key, value) => {
    return array.find(item => item[key] === value);
}

export const addCommas = (number) => {
    if (number)
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return null
}