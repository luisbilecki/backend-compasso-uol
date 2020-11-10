const express = require('express')

const validatorMiddleware = require('../middlewares/requestValidator')

const citiesController = require('../controllers/city')
const citiesValidation = require('../validations/city')

const router = express.Router()

router.get(
  '/',
  citiesValidation.findAll,
  validatorMiddleware,
  citiesController.findAll
)

router.get(
  '/:id',
  citiesValidation.findById,
  validatorMiddleware,
  citiesController.findById
)

router.post(
  '/',
  citiesValidation.create,
  validatorMiddleware,
  citiesController.create
)

module.exports = router
