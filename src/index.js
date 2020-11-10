require('dotenv-flow').config()

const mongoose = require('mongoose')
const app = require('./app')

const PORT = process.env.PORT || 3000

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  })
  .catch(err => console.log(err))
