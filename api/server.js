// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({
            message: 'The users information could not be retrieved',
            error: err.message
        })
    }
})

server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        if (!user) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        } else {
            res.json(user)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The user information could not be retrieved',
            error: err.message
        })
    }
})

server.post('/api/users', async (req, res) => {
    const { body } = req
    try {
        if(!body.name || !body.bio) {
            res.status(400).json({
                message: 'Please provide name and bio for the user'
            })
        } else {
            const newUser = await User.insert(body)
            res.status(201).json(newUser)
        }
    } catch (err) {
        res.status(500).json({
            message: 'There was an error while saving the user to the database',
            error: err.message
        })
    }
})

server.put('/api/users/:id', async (req, res) => {
    const { body } = req
    const { id } = req.params
    try {
        if (!body.name || !body.bio) {
            res.status(400).json({
                message: 'Please provide name and bio for the user'
            })
        } else {
            const updated = await User.update(id, body)
            if (!updated) {
                res.status(404).json({
                    message: 'The user with the specified ID does not exist'
                })
            } else {
                res.status(200).json(updated)
            }
        }
    } catch (err) {
        res.status(500).json({
            message: 'The user information could not be modified',
            error: err.message
        })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleted = await User.remove(id)
        if (!deleted) {
            res.status(404).json({
                message: 'The user with the specified ID does not exist'
            })
        } else {
            res.json(deleted)
        }
    } catch (err) {
        res.status(500).json({
            message: 'The user could not be removed',
            error: err.message
        })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
