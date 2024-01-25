import Table from "../Components/Table";
import { React, useState, useEffect } from "react";
import background from "../images/background1.svg";
import "../styles/Forms.css";
import Axios from "axios";

export const Padres = () => {
  //DATA FROM or TO SERVER
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState(0);
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [genero, setGenero] = useState(0);
  const [fechaNacimiento, setFechaNacimiento] = useState("");

  //LOGIC
  const [listaPadres, setListaPadres] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  function handleUpdateUser(user) {
    let correctedDateUser = user.fechaNacimiento;
    correctedDateUser = correctedDateUser.substring(
      0,
      correctedDateUser.indexOf("T")
    );
    setUpdatedUser({ ...user, fechaNacimiento: correctedDateUser });
    setNeedUpdate(true);
    console.log("UPDATING THE USER: ", updatedUser);
  }

  const deletePadre = (cedula) => {
    Axios.delete(`http://localhost:3004/deletepadre/${cedula}`)
      .then((response) => {
        console.log("Eliminado correctamente");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("ERROR ELIMINANDO");
        console.log(err);
      });
  };
  const addPadre = () => {
    Axios.post("http://localhost:3004/crearpadre", {
      cedula,
      primerNombre,
      segundoNombre,
      apellido,
      genero,
      direccion,
      ciudad,
      fechaNacimiento,
    })
      .then((response) => {
        console.log("Success");
        setListaPadres([
          ...listaPadres,
          {
            cedula,
            primerNombre,
            segundoNombre,
            apellido,
            genero,
            direccion,
            ciudad,
            fechaNacimiento,
          },
        ]);
        window.location.reload(false);
      })
      .catch((er) =>{
        alert("Disculpe esta ingresando un usuario ya existente")
        console.log(er)
      });
  };

  const updatePadre = () => {
    Axios.put("http://localhost:3004/update", {
      cedula: cedula || updatedUser.cedula,
      primerNombre: primerNombre || updatedUser.primerNombre,
      segundoNombre: segundoNombre || updatedUser.segundoNombre,
      apellido: apellido || updatedUser.apellido,
      genero: genero || updatedUser.genero,
      direccion: direccion || updatedUser.direccion,
      ciudad: ciudad || updatedUser.ciudad,
      fechaNacimiento: fechaNacimiento || updatedUser.fechaNacimiento,
      updatedUser, // Se necesita en caso de que el usuario cambie la cedula en el input o para comparar la informacion actual con la anterior
    }).then((response) => {
      window.location.reload(false);
      reload();
    });
  };

  async function reload() {
    Axios.get("http://localhost:3004/padres")
      .then((response) => {
        console.log("RESPONSE FROM SERVER", response.data);
        setListaPadres(response.data);
      })
      .catch((err) => {
        console.log("ERROR ON GET PADRES ");
        console.error(err);
      });
  }

  useEffect(() => {
    reload();
  }, []);
  const registrar = (e) => {
    e.preventDefault();
    console.log("Procesando registro");
    addPadre();
  };

  return (
    <main className="container">
      <form className="data-form" onSubmit={registrar}>
        <label htmlFor="nombre">Primer Nombre</label>
        <input
          type="text"
          id="nombre"
          value={primerNombre || "" || updatedUser.primerNombre}
          name="nombre"
          onChange={(e) => setPrimerNombre(e.target.value)}
          placeholder="Tu nombre"
        />
        <label htmlFor="segundoNombre">Segundo Nombre</label>
        <input
          type="text"
          id="segundoNombre"
          value={segundoNombre || "" || updatedUser.segundoNombre}
          name="segundoNombre"
          onChange={(e) => setSegundoNombre(e.target.value)}
          placeholder="Segundo Nombre"
        />
        <label htmlFor="apellido">Apellidos</label>
        <input
          type="text"
          id="apellido"
          value={apellido || "" || updatedUser.apellido}
          name="apellido"
          onChange={(e) => setApellido(e.target.value)}
          placeholder="Escribe tus apellidos"
        />
        <label htmlFor="ciudad">ciudad</label>
        <input
          type="city"
          id="ciudad"
          value={ciudad || "" || updatedUser.ciudad}
          name="ciudad"
          onChange={(e) => setCiudad(e.target.value)}
          placeholder="Escribe tu ciudad"
        />
        <label htmlFor="direccion">direccion</label>
        <input
          type="address"
          id="direccion"
          value={direccion || "" || updatedUser.direccion}
          name="direccion"
          onChange={(e) => setDireccion(e.target.value)}
          placeholder="La direccion de residencia"
        />

        <label htmlFor="id">Cedula</label>
        <input
          type="number"
          id="cedula"
          value={cedula || 0 || parseInt(updatedUser.cedula)}
          onChange={(e) => setCedula(e.target.value)}
          name="cedula"
          placeholder="Ingrese la cedula"
          disabled={needUpdate}
        />
        <div>
          <div className="special-form">
            <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
            <input
              type="date"
              id="fechaNacimiento"
              value={fechaNacimiento || "" || updatedUser.fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              name="fechaNacimiento"
              placeholder="Seleccione una fecha"
              disabled={needUpdate}
            />
          </div>
          <div>
            <label htmlFor="genero">Genero</label>
            <select
              name="genero"
              id="genero"
              onChange={(e) => {
                let genero = e.target.value;
                setGenero(genero === "Masculino" ? 0 : 1);
              }}
              value={updatedUser.genero == "F" ? "Femenino" : "Masculino"}
              disabled={needUpdate}
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
        </div>

        <input type="submit" value="ENVIAR"></input>
        <button
          onClick={updatePadre}
          className="button-update"
          disabled={!needUpdate}
          type="button"
        >
        ACTUALIZAR
        </button>
        <img src={background} alt="" className="background" />
      </form>
      <div className="table">
        <Table
          tableheads={[
            "Acciones",
            "CEDULA",
            "Primer Nombre",
            "Segundo nombre",
            "Apellido",
            "Genero",
            "Direccion",
            "Ciudad",
            "Edad",
          ]}
          data={listaPadres}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={deletePadre}
          handleUpdateUser={handleUpdateUser}
          notPrint={7}
        />
      </div>
    </main>
  );
};
