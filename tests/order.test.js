const app = require('../app')
const supertest = require("supertest");
describe('Create Order', () => {
  it('should create a new order', async () => {
    const res = await supertest(app)
      .post('/api/order')
      .send({
        address: {
          street: "7835 Bayberry RD",
          city: "Jacksonville",
          zip: "32256",
          state: "FL"
        },
        items: [
          {
            id: 1,
            quantity: 10
          },
          {
            id: 2,
            quantity: 5
          }
        ]
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('status')
    expect(res.body.data.total).toBe(3.745)
    expect(res.body.data.subTotal).toBe(3.5)
  })
})