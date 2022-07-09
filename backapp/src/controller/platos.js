const models = require("../model");
const pool = models.pool;
const findAll = function(){
    return new Promise(async(resolve, reject)=>{
        try {
            const result = await models.platosModel.findAll(pool);
            resolve(result)
        } catch (error) {
            console.log('error', error)
            reject(error)
        }
    })
}

const findById = function(id){
    return new Promise(async(resolve, reject)=>{
        try {
            const result = await models.platosModel.findById(pool, id);
            resolve(result)
        } catch (error) {
            console.log('error', error)
            reject(error)
        }
    })
}

const create = function(data){
    return new Promise(async(resolve, reject)=>{
        try {
            const result = await models.platosModel.create(pool, data);
            resolve(result)
        } catch (error) {
            console.log('error', error)
            reject(error)
        }
    })
}

const updateById = function(id, data){
    return new Promise(async(resolve, reject)=>{
        try {
            const result = await models.platosModel.updateById(pool, id, data);
            resolve(result)
        } catch (error) {
            console.log('error', error)
            reject(error)
        }
    })
}

const deleteById = function(id){
    return new Promise(async(resolve, reject)=>{
        try {
            const result = await models.platosModel.deleteById(pool, id);
            resolve(result)
        } catch (error) {
            console.log('error', error)
            reject(error)
        }
    })
}

module.exports = {
    findAll,
    findById,
    create,
    deleteById,
    updateById,
}