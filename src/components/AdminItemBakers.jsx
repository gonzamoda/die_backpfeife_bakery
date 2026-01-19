import React from "react";

const AdminItemBakers = ({ name, cantidad }) => {
  return (
    <>
      <tr>
        <td>{cantidad}</td>
        <td>{name}</td>
      </tr>
    </>
  );
};

export default AdminItemBakers;
