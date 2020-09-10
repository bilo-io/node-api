const todos = require('./controllers/todos')

const routes = {
    todos: {
        ...todos.routes
    }
}

module.exports = (app) => {
    app.get('/api/routes', (req, res) => {
        res.status(200).json(routes)
    })

    todos.router(app)
}
