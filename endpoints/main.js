export const routes = async (app, options) => {
    app.get('/', async function (request, reply) {
        reply.send({ data: 'main' })
    })
}