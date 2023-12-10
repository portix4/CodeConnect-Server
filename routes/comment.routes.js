const { verifyToken } = require("../middlewares/verifyToken")
const { createComment, getCommentByTeacher, deleteComment } = require("../controllers/comment.controller")
const { checkOwnerOr } = require("../middlewares/route-guard")
const router = require("express").Router()

router.post("/create", verifyToken, createComment)

router.get('/:teacher_id', getCommentByTeacher)

router.delete('/delete/:comment_id', verifyToken, checkOwnerOr('ADMIN'), deleteComment)

module.exports = router