const DefaultError = require('../errors/defaultError')
const CustomerModel = require('../models/customer')

class CustomerController {
  async findAll (req, res, _) {
    const { fullname } = req.query

    const searchCriteria = {}

    if (fullname) {
      searchCriteria.fullname = new RegExp(fullname, 'i')
    }

    const customers = await CustomerModel.find(searchCriteria)

    res.send(customers)
  }

  async findById (req, res, _) {
    const { id } = req.params

    const customer = await CustomerModel.findById(id)
    const customerNotFound = !customer

    if (customerNotFound) {
      throw DefaultError.notFound(req, 'Customer not found')
    }

    return res.json(customer)
  }

  async create (req, res, _) {
    const { fullname, gender, birthDate, cityId } = req.body

    const customer = await CustomerModel.create({
      fullname,
      gender,
      birthDate,
      city: cityId
    })

    res.status(201).json(customer)
  }

  async delete (req, res, _) {
    const { id } = req.params

    const customer = await CustomerModel.findById(id)
    const customerNotFound = !customer

    if (customerNotFound) {
      throw DefaultError.notFound(req, `Customer not found with id ${id}`)
    }

    await CustomerModel.deleteOne({ _id: id })

    res.status(204).json()
  }

  async update (req, res, _) {
    const { id } = req.params

    const customer = await CustomerModel.findById(id)
    const customerNotFound = !customer

    if (customerNotFound) {
      throw DefaultError.notFound(req, `Customer not found with id ${id}`)
    }

    const { fullname } = req.body

    customer.fullname = fullname

    await customer.save()

    res.json(customer)
  }
}

module.exports = new CustomerController()
