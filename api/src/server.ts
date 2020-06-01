import express from 'express'

const app = express()

app.get('/users', (request, response) => {
    return response.json([
        {
            name: 'Mickael',
            email: 'mickael@mickael.com'
        },
    ])
})

app.listen(3333)