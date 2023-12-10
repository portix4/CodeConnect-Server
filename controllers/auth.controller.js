const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")

const signUp = (req, res, next) => {

    const { email, password, username, description, role, avatar, street, city, country, phoneNumber, idSkype } = req.body
    const address = { street, city, country }


    User
        .create({ email, password, username, description, role, avatar, address, phoneNumber, idSkype })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))

}

const logIn = (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ errorMessages: ["Los campos de email y contraseña son obligatorios."] })
        return;
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ errorMessages: ["Usuario no encontrado."] })
                return
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username, role } = foundUser
                const payload = { _id, email, username, role }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.json({ authToken })

            } else {
                res.status(401).json({ errorMessages: ["Contraseña incorrecta."] })
            }

        })
        .catch(err => next(err))

}

const verify = (req, res) => {

    const loggedUser = req.payload

    res.json({ loggedUser })

}

module.exports = {
    signUp,
    logIn,
    verify
}