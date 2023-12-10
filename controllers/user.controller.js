const User = require("../models/User.model")
const Class = require("../models/Class.model")

const getUserById = (req, res, next) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.json(user))
        .catch(err => next(err))

}

const editUserById = (req, res, next) => {

    const { user_id } = req.params

    const { email, username, description, role, avatar, address, phoneNumber, idSkype } = req.body

    User
        .findByIdAndUpdate(user_id, { email, username, description, role, avatar, address, phoneNumber, idSkype })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))

}

const deleteUserById = (req, res, next) => {

    const { user_id } = req.params
    const id = user_id.toString()

    Class
        .deleteMany({ owner: id })
        .then(() => { return User.findByIdAndDelete(user_id) })
        .then(() => res.sendStatus(200))
        .catch(error => next(error))

}


const postUserRating = (req, res, next) => {

    const { owner_id } = req.params
    const { _id } = req.payload
    const { rating } = req.body

    User.findById(owner_id)
        .then(user => {
            const hasRated = user.rating.some(e => e.user.equals(_id))
            if (hasRated) {
                return res.status(400).json({ errorMessages: ['Ya has calificado a este usuario'] })
            }
            return User.findByIdAndUpdate(owner_id, { $push: { rating: { user: _id, value: rating } } })
        })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))

}

module.exports = {
    getUserById,
    editUserById,
    deleteUserById,
    postUserRating
}