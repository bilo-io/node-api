const Todo = require('../../../domain/todos/model')
const TodoService = require('../../../domain/todos/service')
const routes = require('./routes')

module.exports = {
    routes,
    router: (app) => {
        // POST
        app.post(routes.create.path, async (req, res) => {
            const dto = req.body
            try {
                const todo = await TodoService.create(dto)
                res.status(201).json(todo)
            } catch (error) {
                res.status(400).json({ message: error.message })
            }
        })

        // GET by ID
        app.get(routes.getById.path, validations, (req, res) => {
            res.status(200).send(res.todo)
        })

        // GET All
        app.get(routes.get.path, async (req, res) => {
            try {
                const todos = await TodoService.get(req.params)
                res.status(200).send(todos)
            } catch (err) {
                res.status(500).send({ message: err.message })
            }
        })

        // PATCH
        app.patch(routes.update.path, validations, async (req, res) => {
            const id = req.params.id
            try {
                const updated = await TodoService.update(id, req.body)
                res.status(200).send({ id, updated })
            } catch (err) {
                res.status(200).send({ error: err, message: `Failed to update Todo with ID ${id}` })
            }
        })

        // PUT
        app.put(routes.replace.path, validations, async (req, res) => {
            const id = req.params.id
            try {
                const updated = await TodoService.update(id, req.body)
                res.status(200).send({ id, updated })
            } catch (err) {
                res.status(200).send({ error: err, message: `Failed to update Todo with ID ${id}` })
            }
        })

        // DELETE
        app.delete(routes.delete.path, validations, async (req, res) => {
            const id = req.params.id
            try {
                const deleted = await TodoService.delete(id)
                res.status(200).send({ message: `Successfully deleted Todo with ID ${id}`, deleted })
            } catch (err) {
                res.status(400).send({ error: err, message: `Failed to delete Todo with ID ${id}` })
            }
        })
    }
}
const validations = async (req, res, next) => {
    let todo
    try {
        // TODO: incorporate repository in validations middleware
        todo = await Todo.findById(req.params.id)
        if (todo == null) {
            return res.status(404).json({ message: `ERR-404: Todo with ID "${req.params.id}" does not exist!` })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.todo = todo
    next()
}
