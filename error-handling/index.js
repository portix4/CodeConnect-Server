module.exports = (app) => {

  app.use((req, res, next) => {
    res.status(404).json({ message: "Esta ruta no existe." })
  })

  app.use((err, req, res, next) => {

    console.error("ERROR", req.method, req.path, err)

    if (err.code && err.code === 11000) {
      res.status(409).json({ errorMessages: ['El registro ya se encuentra en la base de datos.'] })
    }

    if (err.name === 'ValidationError') {
      let errorMessages = Object.values(err.errors).map(el => el.message)
      res.status(400).json({ errorMessages })
    }

    if (!res.headersSent) {
      res.status(500).json({ errorMessages: ['Se ha producido un error en servidor.'] })
    }

  })

}
