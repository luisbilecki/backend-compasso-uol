const DefaultError = require('../errors/defaultError')
const CityModel = require('../models/city')

class CityController {
  async findAll (req, res, _) {
    const { name, state } = req.query

    const searchCriteria = {}

    if (name) {
      searchCriteria.name = new RegExp(name, 'i')
    }

    if (state) {
      searchCriteria.state = state
    }

    const cities = await CityModel.find(searchCriteria)

    res.send(cities)
  }

  async findById (req, res, _) {
    const { id } = req.params

    const city = await CityModel.findById(id)
    const cityNotFound = !city

    if (cityNotFound) {
      throw DefaultError.notFound(req, 'City not found')
    }

    return res.json(city)
  }

  async create (req, res, _) {
    const { name, state } = req.body

    const city = await CityModel.create({
      name,
      state
    })

    res.status(201).json(city)
  }
}

module.exports = new CityController()
