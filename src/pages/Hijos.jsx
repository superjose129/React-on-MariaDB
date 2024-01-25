import Table from "../Components/Table";
import { React, useState, useEffect } from "react";
import background from "../images/background1.svg";
import "../styles/Forms.css";
import Axios from "axios";

export const Hijos = () => {
  //DATA FROM or TO SERVER
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [tarjetaIdentidad, setTarjetaIdentidad] = useState("");
  const [genero, setGenero] = useState(0);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [hijode, setHijoDe] = useState("");
  const [padres, setPadres] = useState([]);
  //LOGIC
  const [listaHijos, setListaHijos] = useState([]);
  const [needUpdate, setNeedUpdate] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  // const padres = [
  //   {
  //     primerNombre: "Melisa",
  //     segundoNombre: "Fumero",
  //   },
  // ];
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
  const addHijo = () => {
    console.log("ADDING THIS: ", {
      tarjetaIdentidad,
      primerNombre,
      segundoNombre,
      genero,
      fechaNacimiento,
      hijode,
    });
    Axios.post("http://localhost:3004/crearhijo", {
      tarjetaIdentidad,
      primerNombre,
      segundoNombre,
      genero,
      fechaNacimiento,
      hijode,
    })
      .then((response) => {
        console.log("Success");
        setListaHijos([
          ...listaHijos,
          {
            tarjetaIdentidad,
            primerNombre,
            segundoNombre,
            genero,
            fechaNacimiento,
            hijode,
          },
        ]);
      })
      .catch((er) => console.log(er, "error CREANDO HIJOS"));
  };

  const updateHijo = () => {
    Axios.put("http://localhost:3004/updatehijo", {
      tarjetaIdentidad: tarjetaIdentidad || updatedUser.tarjetaIdentidad,
      primerNombre: primerNombre || updatedUser.primerNombre,
      segundoNombre: segundoNombre || updatedUser.segundoNombre,
      genero: genero || updatedUser.genero,
      fechaNacimiento: fechaNacimiento || updatedUser.fechaNacimiento,
      hijode: hijode || updatedUser.hijode,
      updatedUser, // Se necesita en caso de que el usuario cambie la tarjetaIdentidad en el input o para comparar la informacion actual con la anterior
    }).then((response) => {
      window.location.reload(false);
      console.log("Refresqué")
      reload();
    });
  };

  
  const deleteHijo= (tarjetaIdentidad) => {
    Axios.delete(`http://localhost:3004/deletehijo/${tarjetaIdentidad}`)
      .then((response) => {
        console.log("Eliminado correctamente");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("ERROR ELIMINANDO");
        console.log(err);
      });
  };

  async function reload() {
    Axios.get("http://localhost:3004/hijos")
      .then((response) => {
        console.log("RESPONSE FROM SERVER", response.data);
        setListaHijos(response.data);
      })
      .catch((err) => {
        console.log("ERROR ON GET HIJOS ");
        console.error(err);
      });
  }


  useEffect(() => {
    reload();
    console.log(padres);
    Axios.get("http://localhost:3004/padres")
      .then((response) => {
        console.log("RESPONSE FROM SERVER", response.data);
        setPadres(response.data);
      })
      .catch((err) => {
        console.log("ERROR ON GET PADRES ");
        console.error(err);
      });
  }, []);
  const registrar = (e) => {
    e.preventDefault();
    console.log("Procesando registro");
    addHijo();
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

        <label htmlFor="id">tarjetaIdentidad</label>
        <input
          type="number"
          id="tarjetaIdentidad"
          value={
            tarjetaIdentidad || 0 || parseInt(updatedUser.tarjetaIdentidad)
          }
          onChange={(e) => setTarjetaIdentidad(e.target.value.toString())}
          name="tarjetaIdentidad"
          placeholder="Ingrese la tarjeta de Identidad"
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
              disabled={needUpdate}
              value={updatedUser.genero == "M" ? "Masculino" : "Femenino"}
            >
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="genero">PADRES DISPONIBLES</label>
          <select
            name="padres"
            id="padres"
            onChange={(e) => {
              setHijoDe(e.target.value);
            }}
            value={updatedUser.hijode || ","}
          >
            <option value="">Sin padre</option>
            {padres ? (
              padres.map((padre) => {
                return (
                  <option value={padre.cedula}>
                    {padre.primerNombre +
                      " " +
                      padre.segundoNombre +
                      " - " +
                      padre.cedula}
                  </option>
                );
              })
            ) : (
              <option value="No hay padres">No hay padres DISPONIBLES</option>
            )}
          </select>
        </div>
        <input type="submit" value="ENVIAR"></input>
        <button
          onClick={updateHijo}
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
            "Tarjeta de Identidad",
            "Primer Nombre",
            "Segundo nombre",
            "Genero",
            "Edad",
            "CEDULA DEL PADRE",
          ]}
          data={listaHijos}
          setNeedUpdate={setNeedUpdate}
          handleDeleteUser={deleteHijo}
          handleUpdateUser={handleUpdateUser}
          notPrint={4}
        />
      </div>
    </main>
  );
};
