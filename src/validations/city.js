const { body, query, param } = require('express-validator')

module.exports = {
  findAll: [
    query('name').isString().optional(),
    query('state').isString().optional()
  ],
  findById: [
    param('id').isString()
  ],
  create: [
    body('name').isString(),
    body('state').isString()
  ]
}
