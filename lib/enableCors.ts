import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

const runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
