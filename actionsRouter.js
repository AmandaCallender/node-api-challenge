const express = require('express')
const actionsRouter = express.Router()
const actionsDBmethods = require('./data/helpers/actionModel')

actionsRouter.get('/',(req,res) => {
    actionsDBmethods.get()
        .then(resp => {
            if(resp){
                res.status(200).json({resp})
            } else {
                res.status(404).json({message: 'No posts to display.'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Something went wrong.'})
        })
})

actionsRouter.post('/:id/actions', validateUser, (req, res) => {
    const body = req.body
    body.project_id = req.params.id
    actionsDBmethods.insert(body)
        .then(resp => {
            res.status(201).json({resp})
        })
        .catch(err => {
            res.status(500).json({})
        })
})

actionsRouter.put('/:id', validateUser, (req, res) => {
    actionsDBmethods.update(req.params.id, req.body)
    .then(resp => {
        res.status(200).json({resp})
    })
    .catch(err => {
        res.status(500).json({message: 'Something went wrong.'})
    })
})

actionsRouter.delete('/:id', (req, res) => {
    actionsDBmethods.remove(req.params.id)
    .then(resp => {
        res.status(200).json({message: "Project deleted."})
    })
    .catch(err => {
        res.status(500).json({message: 'Something went wrong'})
    })
})

function validateUser (req, res, next) {
    actionsDBmethods.getById(req.params.id)
    .then(resp => {
        if(resp){
            next()
        } else {
            res.status(404).json({message: 'User not found.'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'Something went wrong.'})
    })
}

module.exports = actionsRouter