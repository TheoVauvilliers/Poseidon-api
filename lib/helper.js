/**
 * Function used to subtract x days from a date
 * 
 * @param {Date} date Date of which we calculate
 * @param {Number} days Number of days to subtract
 * @returns {Date} Date with x days less
 */
export const dateSubtract = (date, days) => {
    const oneDayTimestamp = 24 * 3600 * 1000
    const newDateTimestamp = date.getTime() - (oneDayTimestamp * days)

    return new Date(newDateTimestamp)
}