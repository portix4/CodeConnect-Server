const router = require("express").Router()
const { verifyToken } = require("../middlewares/verifyToken")
const { checkRole } = require("../middlewares/route-guard")
const {
    createClass,
    getClasses,
    getOneClass,
    getClassbySearch,
    putClassRequest,
    getClassByStudent,
    getClassByTeacher,
    searchClassAndSetStatus,
    editClass,
    deleteClass,
    filterByStatus
} = require("../controllers/class.controller")

router.put("/searchClassAndSetStatus", verifyToken, searchClassAndSetStatus)

router.get("/all", getClasses)

router.post("/create", verifyToken, checkRole('ADMIN', 'TEACHER'), createClass)

router.put("/edit/:class_id", verifyToken, editClass)

router.get("/filterByStatus/:teacher_id", verifyToken, filterByStatus)

router.get("/", getClassbySearch)

router.put("/putClassRequest/:class_id", verifyToken, putClassRequest)

router.get("/getClassByStudent/:student_id", verifyToken, getClassByStudent)

router.get("/getClassByTeacher", verifyToken, getClassByTeacher)

router.delete("/deleteClass/:class_id", verifyToken, deleteClass)

router.get("/:class_id", getOneClass)

module.exports = router
