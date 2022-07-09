

const findAll = async (pool) => {
    const client = await pool.connect()
    try {
        const res = await client.query('SELECT * FROM platos')
        return res.rows
    } catch(e) {
        console.log('e', e)
        throw new Error(e)
    } finally {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release()
    }
}

const findById = async (pool, id) => {
    const client = await pool.connect()
    try {
        const res = await client.query(`SELECT * FROM platos where id = ${id}`)
        return res.rows
    } catch(e) {
        console.log('e', e)
        throw new Error(e)
    } finally {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release()
    }
}

const create = async (pool, {name, description}) => {
    const client = await pool.connect()
    try {
        const res = await client.query(
            `
            INSERT INTO platos
            (name, description)
            VALUES
            ('${name}', '${description}')
            `
        )
        return res.rows
    } catch(e) {
        console.log('e', e)
        throw new Error(e)
    } finally {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release()
    }
}

const updateById = async (pool, id, {name, description}) => {
    const client = await pool.connect()
    try {
        const res = await client.query(
            `
            update platos
            set
            name = '${name}',
            description = '${description}'
            where id = ${id}
            `
        )
        return res.rows
    } catch(e) {
        console.log('e', e)
        throw new Error(e)
    } finally {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release()
    }
}

const deleteById = async (pool, id) => {
    const client = await pool.connect()
    try {
        const res = await client.query(
            `delete from platos where id = ${id}`
        )
        return res.rows
    } catch(e) {
        console.log('e', e)
        throw new Error(e)
    } finally {
        // Make sure to release the client before any error handling,
        // just in case the error handling itself throws an error.
        client.release()
    }
}

module.exports = {
    findAll,
    findById,
    create,
    deleteById,
    updateById,
}