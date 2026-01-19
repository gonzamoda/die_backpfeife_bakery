import AdminItem from "./AdminItem";
import AdminItemBakers from "./AdminItemBakers";

import Table from "react-bootstrap/Table";

import "./AdminItemList.css";

const AdminItemList = ({ products, selectedDate }) => {
  const filterItems = products.filter(
    (obj) => obj.usuario.date === selectedDate
  );

  const productQuantity = [];

  filterItems.forEach((obj) => {
    obj.compra.forEach((item) => {
      const existingCategory = productQuantity.find(
        (product) => product.name === item.name
      );

      if (existingCategory) {
        existingCategory.cantidad += item.cantidad;
      } else {
        productQuantity.push({ name: item.name, cantidad: item.cantidad });
      }
    });
  });

  return (
    <>
      <Table className="ordersTable">
        <thead>
          <tr>
            <h2>For Bakers</h2>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {productQuantity.map((element) => (
            <AdminItemBakers name={element.name} cantidad={element.cantidad} />
          ))}
        </tbody>
      </Table>
      <Table className="ordersTable">
        <thead>
          <tr>
            <h2>For Delivery</h2>
          </tr>
        </thead>

        <tbody>
          {filterItems.map((element) => (
            <AdminItem
              id={element.id}
              telephone={element.usuario.telephone}
              email={element.usuario.email}
              name={element.usuario.name}
              date={element.usuario.date}
              compra={element.compra}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminItemList;
