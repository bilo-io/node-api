const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId

const Todo = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId
    },
    status: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String
    },
    // ===============
    // TODO: DRY up
    // ===============
    groupId: {
        type: ObjectId
    },
    workspaceId: {
        type: ObjectId
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    }
})

module.exports = mongoose.model('Todo', Todo)
