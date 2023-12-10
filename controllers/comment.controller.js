const Comment = require("../models/Comment.model")

const createComment = (req, res, next) => {

    const { text, teacher } = req.body
    const { _id: user } = req.payload

    Comment.findOne({ teacher, user })
        .then(existingComment => {
            if (existingComment) {
                return res.status(400).json({ errorMessages: ['Ya has comentado en esta clase.'] })
            }
            return Comment.create({ teacher, user, text })
        })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))

}

const getCommentByTeacher = (req, res, next) => {

    const { teacher_id: teacher } = req.params

    Comment
        .find({ teacher })
        .populate('user')
        .then(response => res.json(response))
        .catch(err => next(err))

}

const deleteComment = (req, res, next) => {

    const { comment_id } = req.params

    Comment
        .findByIdAndDelete(comment_id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))

}

module.exports = {
    createComment,
    getCommentByTeacher,
    deleteComment
}


