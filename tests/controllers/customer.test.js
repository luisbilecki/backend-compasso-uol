const request = require('supertest')

const app = require('../../src/app')

const CityModel = require('../../src/models/city')
const CustomerModel = require('../../src/models/customer')

const createCustomer = ({ fullname, gender, birthDate, city }) => {
  return CustomerModel.create({
    fullname,
    gender,
    birthDate,
    city
  })
}

describe('Controllers > Customer', () => {
  let bhCity

  beforeAll(async () => {
    bhCity = await CityModel.create({
      name: 'Belo Horizonte',
      state: 'MG'
    })
  })

  describe('GET /customers', () => {
    it('should return an array of customers', async () => {
      const res = await request(app)
        .get('/customers')
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(expect.any(Array))
    })

    it('should query customers by fullname', async () => {
      const res = await request(app)
        .get('/customers?fullname=Luis')
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(200)
      expect(res.body.length).toBeGreaterThan(0)
    })
  })

  describe('GET /customers/:id', () => {
    it('should return an error when customer is not found', async () => {
      const res = await request(app)
        .get('/customers/5faaf8cdccd502018938c041')
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(404)
    })

    it('should return a customer by its id', async () => {
      const customer = await createCustomer({
        fullname: 'John',
        gender: 'M',
        birthDate: '1990-01-01',
        city: bhCity
      })

      const res = await request(app)
        .get(`/customers/${customer.id}`)
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(200)
      expect(res.body).toMatchObject({
        fullname: customer.fullname,
        gender: customer.gender,
        age: customer.age,
        city: {
          name: bhCity.name
        }
      })
    })
  })

  describe('POST /customers', () => {
    it('should return an error when data is empty', async () => {
      const res = await request(app)
        .post('/customers')
        .send({})
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(400)
    })

    it('should return an error when fullname is invalid', async () => {
      const res = await request(app)
        .post('/customers')
        .send({
          fullname: null
        })
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(400)
    })

    it('should return an error when gender is invalid', async () => {
      const res = await request(app)
        .post('/customers')
        .send({
          fullname: 'Luis',
          gender: 'X'
        })
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(400)
    })

    it('should return an error when birthDate is invalid', async () => {
      const res = await request(app)
        .post('/customers')
        .send({
          fullname: 'Luis',
          gender: 'M',
          birthDate: null
        })
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(400)
    })

    it('should create a customer', async () => {
      const res = await request(app)
        .post('/customers')
        .send({
          fullname: 'Luis',
          gender: 'M',
          birthDate: '1993-08-26',
          cityId: bhCity.id
        })
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(201)
      expect(res.body).toMatchObject({
        fullname: 'Luis',
        gender: 'M',
        birthDate: '1993-08-26T00:00:00.000Z'
      })
    })
  })

  describe('PUT /customers/:id', () => {
    it('should return an error when customer is not found', async () => {
      const res = await request(app)
        .put('/customers/5faaf8cdccd502018938c041')
        .send({
          fullname: 'Dorian'
        })
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(404)
    })

    it('should return an error when fullname is invalid', async () => {
      const res = await request(app)
        .put('/customers/5faaf8cdccd502018938c041')
        .send({
          fullname: null
        })
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(400)
    })

    it('should update a fullname of customer', async () => {
      const customer = await createCustomer({
        fullname: 'John',
        gender: 'M',
        birthDate: '1992-01-01',
        city: bhCity
      })

      const res = await request(app)
        .put(`/customers/${customer.id}`)
        .send({ fullname: 'John Doe' })
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(200)
      expect(res.body.fullname).toEqual('John Doe')
    })
  })

  describe('DELETE /customers/:id', () => {
    it('should return an error when customer is not found', async () => {
      const res = await request(app)
        .delete('/customers/5faaf8cdccd502018938c041')
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(404)
    })

    it('should delete a customer', async () => {
      const customer = await createCustomer({
        fullname: 'John',
        gender: 'M',
        birthDate: '1990-01-01',
        city: bhCity
      })

      const res = await request(app)
        .delete(`/customers/${customer.id}`)
        .set('Accept', 'application/json')

      expect(res.statusCode).toEqual(204)
    })
  })
})
