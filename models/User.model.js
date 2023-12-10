const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'El email de usuario es obligatorio'],
    minlength: [10, 'El email necesita mínimo 10 caracteres'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña de usuario es obligatoria'],
    minlength: [4, "La contraseña necesita al menos 4 caracteres"]
  },
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio.'],
    minlength: [5, 'El usuario necesita mínimo 5 caracteres.'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'La descripción es obligatoria.'],
    minlength: [20, 'La descripción necesita mínimo 20 caracteres'],
    maxlength: [200, 'La descripción acepta máximo 200 caracteres']
  },
  role: {
    type: String,
    enum: ["ADMIN", "TEACHER", "STUDENT"],
    default: "STUDENT",
  },
  avatar: {
    type: String,
    default: "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg"
  },
  address: {
    street: {
      type: String,
      required: [true, 'La calle es obligatoria.']
    },
    city: {
      type: String,
      required: [true, 'La ciudad es obligatoria.']
    },
    country: {
      type: String,
      required: [true, 'El país es obligatorio.']
    }
  },
  phoneNumber: {
    type: Number,
    required: [true, 'El numero de telefono es obligatorio.'],
    minlength: [9, 'El numero de telefono necesita mínimo 9 caracteres.'],
    maxlength: [9, 'El numero de telefono necesita máximo 9 caracteres.']
  },
  idSkype: {
    type: String,
    trim: true,
  },
  rating: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    value: {
      type: Number,
      min: [1, 'La valoración mínima permitida es 1'],
      max: [10, 'La valoración máxima permitida es de 10.']
    }
  }]
},
  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

const User = model("User", userSchema)

module.exports = User