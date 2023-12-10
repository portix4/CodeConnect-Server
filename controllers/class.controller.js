const Class = require("../models/Class.model")

const createClass = (req, res, next) => {

    const { title, description, city, languages, classType } = req.body
    const { _id: owner } = req.payload

    Class.findOne({ owner })
        .then(existingClass => {
            if (existingClass) {
                return res.status(400).json({ errorMessages: ['Ya tienes una clase creada.'] })
            }
            return Class.create({ title, description, languages, city, classType, owner })
        })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))

}


const getClasses = (req, res, next) => {

    Class
        .find()
        .populate('owner')
        .select({ title: 1, languages: 1, classType: 1, owner: 1 })
        .then(response => res.json(response))
        .catch(err => next(err))

}

const filterByStatus = (req, res, next) => {

    const { teacher_id: teacher } = req.params
    const { _id: student } = req.payload

    Class
        .find({ owner: teacher })
        .then(response => {
            response.forEach(e => {
                e.booking.forEach(booking => {
                    if (booking.students.toString() === student && booking.status === 'Accepted') {
                        return res.json(booking)
                    }
                })
            })
        })
        .catch(err => next(err))
}


const getOneClass = (req, res, next) => {

    const { class_id } = req.params

    Class
        .findById(class_id)
        .populate("owner")
        .then(response => res.json(response))
        .catch(err => next(err))

}

const editClass = (req, res, next) => {

    const { class_id } = req.params
    const { title, description, languages, city, classType } = req.body.classes

    Class
        .findByIdAndUpdate(class_id, { title, description, languages, city, classType })
        .then(() => res.sendStatus(203))
        .catch(err => next(err))

}

const getClassbySearch = (req, res, next) => {

    const { language, classType, city } = req.query

    const regexQuery = {}

    const createRegex = (value) => new RegExp(value, 'i')

    if (language) regexQuery.languages = createRegex(language)
    if (classType) regexQuery.classType = createRegex(classType)
    if (city) regexQuery.city = createRegex(city)

    Class
        .find(regexQuery)
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => next(err))

}


const putClassRequest = (req, res, next) => {

    const { class_id } = req.params
    const { student_id, date } = req.body

    Class
        .findByIdAndUpdate(class_id, { $addToSet: { booking: { students: student_id, date } } })
        .then(() => res.sendStatus(200))
        .catch(error => next(error))

}

const getClassByStudent = (req, res, next) => {

    const { user_id } = req.payload._id

    Class
        .find({ booking: { $elemMatch: { student: user_id } } })
        .then(response => res.json(response))
        .catch(error => next(error))

}

const getClassByTeacher = (req, res, next) => {

    const { _id: owner } = req.payload

    Class
        .findOne({ owner })
        .populate('booking.students')
        .then(response => res.json(response))
        .catch(error => next(error))

}

const searchClassAndSetStatus = (req, res, next) => {

    const { classes_id, booking_id, status } = req.body

    Class
        .findById(classes_id)
        .populate('booking.students')
        .then(res => {
            res.booking.forEach(elm => {
                if (elm._id.toString() === booking_id) {
                    elm.status = status
                }
            })
            return res.save()
        })
        .then(() => res.sendStatus(200))

        .catch(err => next(err))
}

const deleteClass = (req, res, next) => {

    const { class_id } = req.params

    Class
        .findByIdAndDelete(class_id)
        .then(() => res.sendStatus(200))
        .catch(error => next(error))

}


module.exports = {
    createClass,
    getClasses,
    getOneClass,
    editClass,
    getClassbySearch,
    putClassRequest,
    getClassByStudent,
    getClassByTeacher,
    searchClassAndSetStatus,
    editClass,
    deleteClass,
    filterByStatus
}
