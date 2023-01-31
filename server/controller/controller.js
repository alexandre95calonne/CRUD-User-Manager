var Userdb = require('../model/model');

// create and save new user

exports.create = (req, res) => {
    //validate request
    if(!req.body) {
        res.status(400).send({message: "Content can't be empty !"})
        return
    } 

    // new user

    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })

    // save user in the db

    user.save(user).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating a create operation"
        })
    })
}

// find and return all users

exports.find = (req, res) => {
    Userdb.find().then(user => {
        res.send(user)
    }).catch(err => {
        res.status(500).send({message : err.message || "Error occured while finding user information"})
    })
}

// find only one user

exports.findOne = (req, res) => {
    const id = req.params.id;

    Userdb.findById(id).then(data => {
        if(!data) {
            res.status(404).send({message : `We can't update user with id ${id}. Maybe id doesn't exist`})
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({message : "Error when updating user informations"})
    })
}

// Update a new identified user by user id

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({message: "Data to update can't be empty !"})
    }

    const id = req.params.id
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify : false}).then(data => {
        if(!data) {
            res.status(404).send({message : `We can't update user with id ${id}. Maybe id doesn't exist`})
        } else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({message : "Error when updating user informations"})
    })
}

// Delete a user with specified user id in the request
exports.delete = (req, res) => {

    const id = req.params.id

    Userdb.findByIdAndDelete(id).then(data => {
        if(!data) {
            res.status(404).send({message : `We can't delete user with id ${id}. Maybe id doesn't exist`})
        } else {
            res.send({message: "User has been delete successfully"})
        }
    }).catch(err => {
        res.status(500).send({message : `Error when deleting user with id : ${id}`})
    })
}