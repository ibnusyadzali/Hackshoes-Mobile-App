const router = require('express').Router()
const Contrroller = require('../controllers/userController')

router.get('/', Contrroller.FindAll)
router.post('/', Contrroller.Create)
router.get('/:id', Contrroller.FindByPk)
router.delete('/:id',Contrroller.DeleteById)

module.exports = router