/**
 * Returns an object with user data between date.start and date.end
 * 
 * @param {Object} mongo 
 * @param {String} user 
 * @param {Object} date 
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
 * @param {String} user 
 * @param {Object} date 
 * @returns 
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