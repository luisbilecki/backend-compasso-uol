require('dotenv-flow').config()

const mongoose = require('mongoose')

const { MongoMemoryServer } = require('mongodb-memory-server')

const CityModel = require('../src/models/city')
const CustomerModel = require('../src/models/customer')

const seedCities = async () => {
  const citiesData = [
    {
      name: 'Rio Negrinho',
      state: 'SC'
    },
    {
      name: 'Curitiba',
      state: 'PR'
    }
  ]

  return Promise.all(citiesData.map(city => CityModel.create(city)))
}

const seedCustomers = async (cityId) => {
  const rnCityId = await CityModel.findOne({ name: 'Rio Negrinho' })._id
  const cwbCityId = await CityModel.findOne({ name: 'Curitiba' })._id

  const customersData = [
    {
      fullname: 'Luis',
      birthDate: '1993-08-26',
      gender: 'M',
      cityId: rnCityId
    },
    {

      fullname: 'Ana',
      birthDate: '1992-08-20',
      gender: 'F',
      cityId: cwbCityId
    }
  ]
  return Promise.all(customersData.map(customer => CustomerModel.create(customer)))
}

let mongoInstance

beforeAll(async () => {
  mongoInstance = new MongoMemoryServer()
  const mongoUri = await mongoInstance.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  // Seed database data
  await seedCities()
  await seedCustomers()
})

afterAll(async () => {
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    await collection.deleteMany({})
  }

  await mongoInstance.stop()
  await mongoose.connection.close()
})
