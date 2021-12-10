/**
 * @param {Date} date 
 * @param {Number} days 
 * @return {Date}
 */
export const dateSubtract = (date, days) => {
    const oneDayTimestamp = 24 * 3600 * 1000
    const newDateTimestamp = date.getTime() - (oneDayTimestamp * days)

    return new Date(newDateTimestamp)
}