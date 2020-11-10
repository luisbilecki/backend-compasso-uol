const { body, param, query } = require('express-validator')

module.exports = {
  create: [
    body('fullname').isString(),
    body('gender').isIn(['M', 'F']),
    body('birthDate').isDate(),
    body('cityId').isMongoId()
  ],
  findById: [
    param('id').isMongoId()
  ],
  findAll: [
    query('fullname').isString().optional()
  ],
  delete: [
    param('id').isMongoId()
  ],
  update: [
    param('id').isMongoId(),
    body('fullname').isString()
  ]
}
