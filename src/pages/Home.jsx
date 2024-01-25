import React from "react";
import "../styles/Home.css";
import father from "../images/father.svg";
import family from "../images/man.svg";
import babyBoy from "../images/baby-boy.svg";
import babyCry from "../images/baby.png";
import homeback from "../images/homeback.svg";
import man from "../images/man-happy.svg";
import { Link } from "react-router-dom";


const Home = () => {

  return (
    <>
      <header>
        <h1 className="title">Seleccione una opci&oacute;n</h1>
      </header>

      <main>
        <div className="opciones">
          <Link to="/padres" className="opciones--card">
            <img src={father} alt="" />
            <h6 className="card-title">Tabla de padres</h6>
          </Link>
          <Link to="/hijos" className="opciones--card">
            <img src={babyBoy} alt="asd" />
            <h6 className="card-title">Tabla de Hijos</h6>
          </Link>
          <Link to="/consultapadres"className="opciones--card">
            <img src={family} alt="" />
            <h6 className="card-title">Mostrar padres disponibles </h6>
          </Link>
          <Link to="/consultapadressinhijos" className="opciones--card">
            <img src={man} alt="" />
            <h6 className="card-title">Padres sin hijos </h6>
          </Link>
          <Link to="/consultahijos" className="opciones--card">
            <img src={babyCry} alt="" />
            <h6 className="card-title">Hijos sin padre</h6>
          </Link>
          <Link to="/consultanumhijos" className="opciones--card">
            <img src={homeback} alt="" />
            <h6 className="card-title">Número de hijos</h6>
          </Link>
        </div>
        <img src={homeback} alt="" className="background" />
      </main>
    </>
  );
};

export default Home;
