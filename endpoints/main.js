import { dateSubtract } from "../lib/helper.js"
import { getHistory } from "../lib/query.js"

export const routes = async (app, options) => {
    app.get('/', async function (request, reply) {
        reply.send({ data: 'main' })
    })

    /**
     * Endpoint to have the 7-day history of a user
     */
    app.get('/user/:id', async function (request, reply) {
        const date = {
            start: dateSubtract(new Date(), 7),
            end: new Date()
        }

        const data = await getHistory(this.mongo.db, request.params.id, date)

        reply.send({ data: data })
    })
}