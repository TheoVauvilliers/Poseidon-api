/**
 * Returns an object with user data between date.start and date.end
 * 
 * @param {Object} mongo
 * @param {String} user User name
 * @param {Object} date Date object including the start date and the end date of the search { start: datetime, end: datetime }
 * @returns Returns an object including the data linked to the user as well as the streams watched between two dates
 */
export const getHistory = async (mongo, user, date) => {
    const history = mongo.collection('history')

    const response = await history.aggregate(
        buildHistoryQuery(user, date)
    ).toArray()

    return response[0]
}

/**
 * Build the NoSQL query for getHistory() 
 * 
 * @param {String} user User name
 * @param {Object} date Date object including the start date and the end date of the search { start: datetime, end: datetime }
 * @returns Return the request to execute
 */
const buildHistoryQuery = (user, date) => {
    return [
        {
            $match: { 'name': user }
        },
        {
            $project: {
                _id: 0,
                name: 1,
                liveWatched: {
                    $filter: {
                        input: '$liveWatched',
                        as: 'watchedAt',
                        cond: {
                            $and: [
                                { $gte: ['$$watchedAt.watchedAt', date.start] },
                                { $lt: ['$$watchedAt.watchedAt', date.end] }
                            ]
                        }
                    }
                }
            }
        }
    ]
}