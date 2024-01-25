async function getQuery(config, type) {
    let conn;
    try {
        conn = await config.getConnection();
        const rows = await conn.query(getQ(type));
        conn.end();
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getDataC1(config, table, cedula) {
    let conn;
    try {
        conn = await config.getConnection();
        const rows = await conn.query(`SELECT * FROM ${table} WHERE hijode = ${cedula.toString()}`);
        conn.end();
        return rows;
    } catch (e) {

    }
}

async function getData(config,table) {
    let conn;
    try {
        conn = await config.getConnection();
        const rows = await conn.query(`SELECT * FROM ${table}`);
        conn.end();
        return rows;
    } catch (error) {
        throw error;
    }
}

function getQ(type) {
    if (type == 1) { // Padre sin hijos
        return `SELECT * FROM padre WHERE cedula IN 
            ((SELECT cedula FROM padre) 
            EXCEPT
            (SELECT hijode FROM hijo WHERE hijode IS NOT NULL));`;
    } else if (type == 2) { // Hijos sin padre
        return `SELECT * FROM hijo WHERE hijode IS NULL;`;
    } else { // Cantidad de hijos
        return `SELECT padre.*, (CASE WHEN hijode IS NULL THEN 0 ELSE COUNT(cedula) END) AS numHijos
            FROM padre 
            LEFT OUTER JOIN hijo
            ON cedula = hijode
            GROUP BY cedula;`;
    }
}

module.exports = {
    getQuery, getDataC1, getData
}