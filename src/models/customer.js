const differenceInYears = require('date-fns/differenceInYears')

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const schemaOpts = {
  toJSON: {
    virtuals: true
  }
}
const customerSchema = new Schema({
  fullname: {
    type: String,
    maxlength: 100,
    required: true
  },
  gender: {
    type: String,
    enum: ['M', 'F'],
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City'
  }
}, schemaOpts)

customerSchema.virtual('age').get(function () {
  const self = this

  return differenceInYears(Date.now(), self.birthDate)
})

customerSchema.pre('find', function () {
  this.populate('city', 'name')
})

customerSchema.pre('findOne', function () {
  this.populate('city', 'name')
})

module.exports = mongoose.model('Customer', customerSchema)
