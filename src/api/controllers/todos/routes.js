const Todo = require('../../../domain/todos/model')

const endpointRoot = '/api/todos'

const routes = {
    $schema: {
        ...Todo.schema.obj
    },
    create: {
        method: 'POST',
        path: `${endpointRoot}`
    },
    delete: {
        method: 'DELETE',
        path: `${endpointRoot}/:id`
    },
    get: {
        method: 'GET',
        path: `${endpointRoot}`
    },
    getById: {
        method: 'GET',
        path: `${endpointRoot}/:id`
    },
    update: {
        method: 'PATCH',
        path: `${endpointRoot}/:id`
    },
    replace: {
        method: 'PUT',
        path: `${endpointRoot}/:id`
    }
}

module.exports = routes
