import { React, useState, useEffect } from "react";
import "../styles/Consultas.css";
import background from "../images/background1.svg";
import Axios from "axios";

const Consulta = () => {
  const [listaPadres, setListaPadres] = useState([]);
  const [hijos, setHijos] = useState([]);
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
    // getPadres();
  }, []);
  const mostrarHijos = (id) => {
    Axios.get(`http://localhost:3004/padres/${id}`)
      .then((response) => {
        console.log("RESPONSE FROM SERVER", response.data);
        setHijos(response.data);
        console.log(hijos);
      })
      .catch((err) => {
        console.log("ERROR ON GET PADRES ");
        console.error(err);
      });
      
  };
  return (
    <div>
      <div className="title">
        <h1>Padres disponibles</h1>
      </div>
      <div className="main">
        <div>
          <h2>Padres</h2>
          <ul>
            {listaPadres.map((file) => {
              return (
                <li>
                  <div>
                    <span>Cedula</span>
                    <span>{file.cedula}</span>
                  </div>
                  <div>
                    <span>Primer Nombre</span>
                    <span>{file.primerNombre}</span>
                  </div>
                  <div>
                    <span>Segundo Nombre</span>
                    <span>{file.segundoNombre}</span>
                  </div>
                  <div>
                    <span>Apellido</span>
                    <span>{file.apellido}</span>
                  </div>
                  <div>
                    <span>Género</span>
                    <span>{file.genero === 1 ? "F" : "M"}</span>
                  </div>
                  <button
                    onClick={() => {
                      mostrarHijos(file.cedula);
                    }}
                  >
                    MOSTRAR
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2>Hijos del padre seleccionado</h2>
          {hijos.length > 0  ? (
            <div>
              {hijos.map((file) => {
                return <div className="hijo">
                  <div><span>Nombre</span> <span>{file.primerNombre}</span></div>
                  <div><span>Tarjeta identidad</span><span>{file.tarjetaIdentidad}</span></div>
                </div>;
              })}{" "}
            </div>
          ) : (
            <div className="hijo">
            <div><span>El padre seleccionado no tiene hijos.</span></div>
          </div>
          )}
        </div>
      </div>
      <img src={background} alt="" className="background" />
    </div>
  );
};

export default Consulta;
