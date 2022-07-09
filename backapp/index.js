const express = require('express')
const rutas = require("./src/routes")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const port = 1000


// Configurando app
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
 res.send('Prueba de test')
})
rutas(app)

// Escuchando el puerto
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})