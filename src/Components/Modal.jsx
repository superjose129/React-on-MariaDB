import React from "react";
import "../styles/Modal.css";
// Modal PADRE
const Modal = (curr, updated) => {
  return (
    <div className="modal">
      <div className="modal--header">
        <h5 className="modal--header__name">Nombre</h5>
        <p className="modal--header__type">Padre/Hijo</p>
      </div>
      <div className="modal--body">
        <div className="modal--newdata">
          <form className="modal--newdata__current">
            <div className="datadiff">
              <p>Nombre actual</p>
              <input type="text" placeholder="Nuevo nombre" />
            </div>
            <div className="datadiff">
              <p>Apellido actual</p>
              <input type="text" placeholder="Nuevo apellido" />
            </div>
            <div className="datadiff">
              <p>edad </p>
              <input type="text" placeholder="Nueva edad" />
            </div>
            <div className="datadiff">
              <p>ciudad </p>
              <input type="number" placeholder="Nueva edad" />
            </div>
            <div className="datadiff">
              <p>Fecha de nacimiento </p>
              <input type="date" placeholder="Nueva dob" />
            </div>
            <div className="datadiff">
              <p>cedula</p>
              <input type="number" placeholder="Nueva cedula" />
            </div>
            <div className="datadiff">
              <p>Genero actual: xxxx</p>
              <select name="genero" id="genero">
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Salon de belleza">Salon de belleza</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
