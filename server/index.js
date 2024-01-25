const express = require("express");
const app = express();
const mariadb = require("mariadb");
const cors = require("cors");

const inserts = require("./inserts");
const updates = require("./updates");
const deletes = require("./deletes");
const querySelector = require("./querys");

app.use(cors());
app.use(express.json());

const port = 3004;

const config = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "Josemicod5",
  database: "icbf",
  connectionLimit: 5,
  acquireTimeout: 300,
});

app.post("/crearpadre", (req, res) => {
  const {primerNombre, segundoNombre, apellido, genero, direccion, ciudad, fechaNacimiento, cedula} = req.body;
  const response = inserts.insertPadre(config,
    "padre(cedula, primerNombre, segundoNombre, apellido, genero, direccion, ciudad, fechaNacimiento)",
    [
      cedula,
      primerNombre,
      segundoNombre,
      apellido,
      genero,
      direccion,
      ciudad,
      fechaNacimiento,
    ]
  );
  response
    .then((data) => {
      console.log("VALUES INSERTED");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("ERROR INSERTING DATA");
      console.log(err);
    });
});

app.get("/:name(c1|c2|c3)", (req,res) => {
  const results = querySelector.getQuery(config,req.params.name[1]);
  results
    .then((data) =>{
      res.send(data);
    })
    .catch((error) => {
      console.log("ERROR ON SERVER n");
      console.log(error);
      res.status(500);
    }); 
});

app.post("/crearhijo", (req, res) => {
  const {
    tarjetaIdentidad,
    primerNombre,
    segundoNombre,
    genero,
    hijode,
    fechaNacimiento,
  } = req.body;

  const response = inserts.insertHijo(config,
    "hijo(tarjetaIdentidad, primerNombre, segundoNombre, genero, fechaNacimiento, hijode)",
    [
      tarjetaIdentidad,
      primerNombre,
      segundoNombre,
      genero,
      fechaNacimiento,
      hijode || null,
    ]
  )
    .then((response) => {
      console.log("HIJO INSERTADO CORRECTAMENTE");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("ERROR INSERTANDO HIJO");
      console.error(err);
    });
});

app.put("/update", (req, res) => {
  let genero;
  const {
    primerNombre,
    segundoNombre,
    apellido,
    direccion,
    ciudad,
    fechaNacimiento,
    updatedUser,
  } = req.body;
  genero = genero == "M" ? 0 : 1;
  updates.updatePadre(config,updatedUser.cedula.toString(), [
    primerNombre,
    segundoNombre,
    apellido,
    genero,
    direccion,
    ciudad,
    fechaNacimiento,
  ])
    .then((response) => {
      console.log("ACTUALIZADO CORRECTAMENTE EL USUARIO ", primerNombre);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("ERROR ACTUALIZANDO");
      console.log(err);
      res.sendStatus(500);
    });
});

app.put("/updateHijo", (req, res) => {
  let genero;
  const {
    primerNombre,
    segundoNombre,
    hijode,
    fechaNacimiento,
    updatedUser,
  } = req.body;
  genero = genero = "M" ? 1 : 0;
  updates.updateHijo(config,updatedUser.tarjetaIdentidad.toString(), [
    primerNombre,
    segundoNombre,
    genero,
    fechaNacimiento,
    hijode,
  ])
    .then((response) => {
      console.log("ACTUALIZADO CORRECTAMENTE EL USUARIO ", primerNombre);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("ERROR ACTUALIZANDO");
      console.log(err);
      res.sendStatus(500);
    });
});

app.get("/padres", (req, res) => {
  const results = querySelector.getData(config,"padre");
  results
    .then((data) => {
      Array.from(data).forEach((item) => item["genero"] = item["genero"] == 0 ? "M" : "F");
      res.send(data);
    })
    .catch((error) => {
      console.log("ERROR ON SERVER p");
      console.log(error);
      res.status(500);
    });
});

app.get("/padres/:cedula", (req, res) => {
  const cedula = req.params.cedula;
  const results = querySelector.getDataC1(config,"hijo",cedula);
  results
    .then((data) => {
      res.send(data);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("ERROR ON SERVER c");
    });
  });

app.get("/hijos", (req, res) => {
  const results = querySelector.getData(config,"hijo");
  results
    .then((data) => {
      Array.from(data).forEach((item) => item["genero"] = item["genero"] == 0 ? "M" : "F");
      res.send(data);
    })
    .catch((error) => {
      console.log("ERROR ON SERVER getting hijos");
      console.log(error);
      res.status(500);
    });
});

app.delete("/deletepadre/:cedula", (req, res) => {
  const cedula = req.params.cedula;
  const response = deletes.deletePadre(config,cedula);
  response
    .then((result) => {
      console.log("ELIMINADO CORRECTAMENTE EL PADRE: ", cedula);
      res.send(200);
    })
    .catch((err) => {
      console.log("Error eliminando a ", cedula);
      console.log(err);
      res.send(500);
    });
});

app.delete("/deletehijo/:tarjetaIdentidad", (req, res) => {
  console.log("ENTRE");
  const tarjetaIdentidad = req.params.tarjetaIdentidad;
  const response = deletes.deleteHijo(config,tarjetaIdentidad);
  response
    .then((result) => {
      console.log("ELIMINADO CORRECTAMENTE EL PADRE: ", tarjetaIdentidad);
      res.send(200);
    })
    .catch((err) => {
      console.log("Error eliminando a ", tarjetaIdentidad);
      console.log(err);
      res.send(500);
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});