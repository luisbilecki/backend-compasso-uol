const express = require('express')

const validatorMiddleware = require('../middlewares/requestValidator')

const customersController = require('../controllers/customer')
const customersValidation = require('../validations/customer')

const router = express.Router()

router.get(
  '/',
  customersValidation.findAll,
  validatorMiddleware,
  customersController.findAll
)

router.get(
  '/:id',
  customersValidation.findById,
  validatorMiddleware,
  customersController.findById
)

router.post(
  '/',
  customersValidation.create,
  validatorMiddleware,
  customersController.create
)

router.delete(
  '/:id',
  customersValidation.delete,
  validatorMiddleware,
  customersController.delete
)

router.put(
  '/:id',
  customersValidation.update,
  validatorMiddleware,
  customersController.update
)

module.exports = router
