import React, { useState } from "react";
import "../styles/Table.css";
import Row from "./Row";
const Table = ({
  tableheads,
  data,
  setNeedUpdate,
  handleDeleteUser,
  handleUpdateUser,
  notPrint,
}) => {
  // const [rows, setRows] = useState([]);

  return (
    <table>
      <thead>
        <tr>
          {tableheads.map((header) => {
            return <th>{header}</th>;
          })}
          {/* <th>Nombre del padre</th>
          <th>ID padre</th>
          <th>Acciones disponibles</th> */}
        </tr>
      </thead>

      <tbody>
        {data.map((row) => {
          return (
            <Row
              data={Object.values(row)}
              collection={row}
              setNeedUpdate
              handleDeleteUser={handleDeleteUser}
              handleUpdateUser={handleUpdateUser}
              ced={row.cedula}
              notPrint={notPrint}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
