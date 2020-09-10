const Todo = require('./model')

module.exports = {
    get: async (query) => {
        return await Todo.find(
            query
        ).exec()
    },

    create: async (dto) => {
        const todo = new Todo(dto)
        return await todo.save()
    },

    update: async (id, data) => {
        return await Todo.updateOne(
            { _id: id },
            { ...data }
        ).exec()
    },

    delete: async (id) => {
        return await Todo.deleteOne(
            { _id: id }
        ).exec()
    }
}
