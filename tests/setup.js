require('dotenv-flow').config()

const mongoose = require('mongoose')

const { MongoMemoryServer } = require('mongodb-memory-server')

const CityModel = require('../src/models/city')

const seedCities = async () => {
  // Create cities
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

  // TODO: Create clients
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
})

afterAll(async () => {
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    await collection.deleteMany({})
  }

  await mongoInstance.stop()
  await mongoose.connection.close()
})
