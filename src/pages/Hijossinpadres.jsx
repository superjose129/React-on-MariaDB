import { React, useState, useEffect } from "react";
import "../styles/Consultas.css";
import background from "../images/baby-boy.svg";
import Axios from "axios";

const HijosSinPadres = () => {
  const [listaHijos, setListaHijos] = useState([]);
  async function reload() {
    Axios.get("http://localhost:3004/c2")
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

  }, []);
  return (
    <div className="main2">
      <h1>Hijos sin padre </h1>
      <div className='list'>
      <ul>
        {listaHijos.map((file) => {
          return (
            <li>
              <div>
                <span>Tarjeta de Identidad</span>
                <span>{file.tarjetaIdentidad}</span>
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
                <span>Género</span>
                <span>{file.genero === 1 ? "F" : "M"}</span>
              </div>
              <div>
                <span>Fecha de nacimiento</span>
                <span>{file.fechadenacimiento}</span>
              </div>
            </li>
          );
        })}
      </ul>
      </div>
      <img src={background} alt="" className="background" />
    </div>
  );
};

export default HijosSinPadres;
