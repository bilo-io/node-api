const TodoRepository = require('./repository')

module.exports = {
    get: async (query) => {
        return await TodoRepository.get(query)
    },

    create: async (dto) => {
        return await TodoRepository.create(dto)
    },

    update: async (id, data) => {
        return await TodoRepository.update(id, data)
    },

    delete: async (id) => {
        return await TodoRepository.delete(id)
    }
}
