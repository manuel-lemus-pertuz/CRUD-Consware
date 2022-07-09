
const platos = require("../network/platos")

const routes = (app) => {
    app.use('/platos',platos);
}

module.exports = routes;