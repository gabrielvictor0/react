import React from "react";
import "./TableEvent.css";

const TableEvent = () => {
  return (
    <table>
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Titulo
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Editar
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Deletar
          </th>
        </tr>
      </thead>

      <tbody>
        {/* {dados.map((ev) => {
          <tr className="table-data__head-row">
            <td className="table-data__data table-data__data--big">
              {ev.titulo}
            </td>

            <td className="table-data__data table-data__data--little">
              <img
                className="table-data__icon"
                src={editPen}
                alt=""
                onClick={() => {
                  fnUpdate(ev.idEvento);
                }}
                idevento={ev.idEvento}
              />
            </td>

            <td className="table-data__data table-data__data--little">
              <img
                className="table-data__icon"
                src={trashDelete}
                alt=""
                onClick={() => {
                  fnDelete(ev.idEvento);
                }}
                idevento={tp.idEvento}
              />
            </td>
          </tr>;
        })} */}
      </tbody>
    </table>
  );
};

export default TableEvent;
