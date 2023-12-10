const { Schema, model } = require("mongoose")


const commentSchema = new Schema(
    {
        teacher: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        text: {
            type: String,
            required: true,
            minlength: [20, 'Se necesitan mínimo 20 caracteres.']
        }
    },
    {
        timestamps: true
    }
)

const Comment = model("Comment", commentSchema)

module.exports = Comment