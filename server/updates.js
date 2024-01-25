async function updatePadre(config, primaryKey, data) {
    let conn;
    try {
        conn = await config.getConnection();
        const results = await conn.query(
            `UPDATE padre SET primerNombre = ?, segundoNombre = ? , apellido = ?, genero = ? , direccion = ?, ciudad = ?, fechaNacimiento = ? WHERE cedula = ${primaryKey.toString()};`,
            data
        );
        conn.end();
        return results;
    } catch (error) {
        throw error;
    }
}

async function updateHijo(config,primaryKey,data) {
    let conn;
    try {
        conn = await config.getConnection();
        const results = await conn.query(
            `UPDATE hijo SET primerNombre = ?, segundoNombre = ? , genero = ? , fechaNacimiento = ?, hijoDe = ? WHERE tarjetaIdentidad = ${primaryKey.toString()};`,
            data
        );
        conn.end();
        return results;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    updateHijo,updatePadre
}