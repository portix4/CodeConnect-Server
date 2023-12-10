const checkRole = (...admittedRoles) => (req, res, next) => {

    const { role } = req.payload

    if (admittedRoles.includes(role)) {
        next()
    } else {
        res.status(403).json({ errorMessages: ['No puedes acceder aqui.'] })
    }

}

const checkOwnerOr = (...admittedRoles) => (req, res, next) => {

    const { role, _id } = req.payload
    const { user_id } = req.params

    if (admittedRoles.includes(role) || _id === user_id) {
        next()
    } else {
        res.status(403).json({ errorMessages: ['No puedes acceder aqui.'] })
    }

}


module.exports = {
    checkRole,
    checkOwnerOr
}