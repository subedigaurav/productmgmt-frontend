import React from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Dropdown } from 'react-bootstrap';

const ProductsList = ({
  products,
  editCallback,
  deleteCallback,
  categorySortCallback,
}) => {
  const buttonStyle = {
    margin: '5px',
  };

  //* dropdown for category
  const categoryDropdown = (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown"
        variant="outline-dark"
        style={{ width: '100%', height: '100%' }}
      >
        Category
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => categorySortCallback('category', 'food')}>
          Food
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => categorySortCallback('category', 'Electronics')}
        >
          Electronics
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => categorySortCallback('category', 'Accessories')}
        >
          Accessories
        </Dropdown.Item>
        <Dropdown.Item onClick={() => categorySortCallback('category', 'DIY')}>
          DIY
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  //* dropdown for status
  const statusDropdown = (
    <Dropdown>
      <Dropdown.Toggle
        id="dropdown"
        variant="outline-dark"
        style={{ width: '100%', height: '100%' }}
      >
        Status
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => categorySortCallback('status', 'available')}
        >
          Available
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => categorySortCallback('status', 'unavailable')}
        >
          Unavailable
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  let productRows = products.map((product, index) => {
    return (
      <tr key={index}>
        <td>{product.code}</td>
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>{product.description}</td>
        <td>{product.status}</td>
        <td>
          <Button
            style={buttonStyle}
            variant="primary"
            onClick={() => editCallback(product._id)}
          >
            Edit
          </Button>
          <Button
            style={buttonStyle}
            variant="danger"
            onClick={() => deleteCallback(product._id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  let table = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="align-middle">Code</th>
          <th className="align-middle">Product Name</th>
          <th className="align-middle">{categoryDropdown}</th>
          <th className="align-middle">Description</th>
          <th className="align-middle">{statusDropdown}</th>
          <th className="align-middle">Options</th>
        </tr>
      </thead>
      <tbody>{productRows}</tbody>
    </Table>
  );

  if (products.length === 0) {
    table = <p>No products found...</p>;
  }

  return <div>{table}</div>;
};

export default ProductsList;
