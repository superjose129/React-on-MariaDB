async function insertHijo(config, table, values) {
    let conn;
    try {
        conn = await config.getConnection();
        const res = await conn.query(
            `INSERT INTO ${table} VALUES (?,?,?,?,?,?)`,
            values
        );
        conn.end();
        return res;
    } catch (error) {
        throw error;
    }
}

async function insertPadre(config, table, values) {
    let conn;
    try {
        conn = await config.getConnection();
        const res = await conn.query(
            `INSERT INTO ${table} VALUES (?,?,?,?,?,?,?,?)`,
            values
        );
        conn.end();
        return res;
    } catch (error) {
        throw error
    }
}

module.exports = {
    insertHijo, insertPadre
}