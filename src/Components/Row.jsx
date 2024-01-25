import { React, useState } from "react";

const Row = ({
  data,
  setNeedUpdate,
  handleDeleteUser,
  handleUpdateUser,
  collection,
  notPrint,
}) => {
  return (
    <tr>
      <td class="select">
        <button class="button" onClick={() => {handleDeleteUser(collection.cedula || collection.tarjetaIdentidad)}}>
          ELIMINAR
        </button>

        <button
          onClick={() => {
            handleUpdateUser(collection);
          }}
        >
          EDITAR
        </button>
      </td>
      {data.map((row, index) => {
        return index === notPrint ? null : <td key={index}>{row}</td>;
      })}
      {/* <td data-title="name">Iacob Geaorgescu</td>
      <td data-title="id">e-mail@test-email.com</td> */}
    </tr>
  );
};

export default Row;
