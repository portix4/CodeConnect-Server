const { Schema, model } = require("mongoose")

const classSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'El nombre es obligatorio.'],
        },
        description: {
            type: String,
            required: [true, 'La descripción es obligatoria.'],
            minlength: [20, 'La descripción debe tener mínimo 20 caracteres.'],
            maxlength: [100, 'La descripción no puede tener más de 100 caracteres.'],
        },
        languages: [{
            type: String,
            required: [true, 'El lenguaje es obligatorio.']
        }],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        city: {
            type: String,
        },
        booking: [{
            students: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            status: {
                type: String,
                enum: ["Pending", "Accepted", "Cancelled"],
                default: "Pending"
            },
            date: {
                type: Date,
                required: [true, 'La fecha es obligatoria.']
            }
        }],
        classType: {
            type: String,
            enum: ['On-site', 'Hybrid', 'Remote'],
            required: [true, 'El tipo de clase es obligatorio.']
        },
    },
    {
        timestamps: true
    }
)

const Class = model("Class", classSchema)

module.exports = Class