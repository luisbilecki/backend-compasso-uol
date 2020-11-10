const request = require('supertest')

const app = require('../../src/app')

const CityModel = require('../../src/models/city')

describe('Controllers > City', () => {
  describe('GET /cities', () => {
    it('should return an array of cities', async () => {
      const res = await request(app)
        .get('/cities')
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(expect.any(Array))
    })

    it('should query cities by state', async () => {
      const res = await request(app)
        .get('/cities?state=SC')
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(200)
      expect(res.body.length).toBeGreaterThan(0)
    })

    it('should query cities by name', async () => {
      const res = await request(app)
        .get('/cities?name=Curitiba')
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(200)
      expect(res.body.length).toBeGreaterThan(0)
    })
  })

  describe('GET /cities/:id', () => {
    it('should return an error when city is not found', async () => {
      const res = await request(app)
        .get('/cities/5faabb2d83ac8d002a7bdf1f')
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(404)
    })

    it('should return a city by its id', async () => {
      const city = await CityModel.create({
        name: 'Campinas',
        state: 'SP'
      })

      const res = await request(app)
        .get(`/cities/${city._id}`)
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(200)
      expect(res.body).toMatchObject({
        name: city.name,
        state: city.state
      })
    })
  })

  describe('POST /cities', () => {
    it('should return an error when data is empty', async () => {
      const res = await request(app)
        .post('/cities')
        .send({})
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(400)
    })

    it('should return an error when name is not provided', async () => {
      const res = await request(app)
        .post('/cities')
        .send({
          state: 'SP'
        })
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(400)
    })

    it('should return an error when state is not provided', async () => {
      const res = await request(app)
        .post('/cities')
        .send({
          name: 'Itu'
        })
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(400)
    })

    it('should create a city', async () => {
      const res = await request(app)
        .post('/cities')
        .send({
          name: 'Bom Retiro',
          state: 'SC'
        })
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(201)
      expect(res.body.name).toEqual('Bom Retiro')
      expect(res.body.state).toEqual('SC')
    })
  })
})
