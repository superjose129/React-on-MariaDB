async function deleteHijo(config,tarjetaIdentidad) {
    let conn;
    try {
        conn = await config.getConnection();
        const result = await conn.query(
        `DELETE FROM hijo WHERE tarjetaIdentidad = ${tarjetaIdentidad.toString()}`,
        );
        conn.end();
        return result;
    } catch (error) {
    }
}

async function deletePadre(config,cedula) {
    let conn;
    try {
        conn = await config.getConnection();
        const result = await conn.query(
        `DELETE FROM padre WHERE cedula = ${cedula.toString()}`,
        );
        conn.end();
        return result;
    } catch (error) {
    }
}

module.exports = {
    deletePadre,deleteHijo
}