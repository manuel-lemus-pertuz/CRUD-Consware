const express = require("express");
const response = require("../routes/response")
const controller = require("../controller")
router = express.Router()

//? GET
// Obtener todos los platos
router.get('/', async function(req,res){
    try {
      const result = await controller.platosController.findAll();
      response.success(req, res, result);
    } catch (error) {
      console.log('ERROR: ', error);
      response.error(req, res, 'Error on basics', 400, error);
    }
});

// Obtener platos por id
router.get('/:id', async function(req,res){
  try {
    const id = req.params.id 
    const result = await controller.platosController.findById(id);
    response.success(req, res, result);
  } catch (error) {
    console.log('ERROR: ', error);
    response.error(req, res, 'Error on basics', 400, error);
  }
});

//? POST
// Obtener todos los platos
router.post('/create', async function(req,res){
  try {
    const result = await controller.platosController.create(req.body);
    response.success(req, res, result);
  } catch (error) {
    console.log('ERROR: ', error);
    response.error(req, res, 'Error on basics', 400, error);
  }
});

//? PUT
// Actualizar plato por id
router.put('/update/:id', async function(req,res){
  try {
    const result = await controller.platosController.updateById(req.params.id, req.body);
    response.success(req, res, result);
  } catch (error) {
    console.log('ERROR: ', error);
    response.error(req, res, 'Error on basics', 400, error);
  }
});

//? DELETE
// Eliminar plato por id
router.delete('/delete/:id', async function(req,res){
  try {
    const result = await controller.platosController.deleteById(req.params.id);
    response.success(req, res, result);
  } catch (error) {
    console.log('ERROR: ', error);
    response.error(req, res, 'Error on basics', 400, error);
  }
});

module.exports = router;