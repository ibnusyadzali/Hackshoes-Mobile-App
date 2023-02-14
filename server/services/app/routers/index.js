const express = require('express')
const router = express.Router()
const usersRouter = require('./userRouter')
const adminRouter = require('./adminRouter')

router.use('/user', usersRouter)
router.use('/admin', adminRouter)

module.exports = router