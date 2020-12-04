import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import './AddProduct.css';
import axios from 'axios';

const SingleProduct = (props) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState('Food');
  const [status, setStatus] = useState('Available');
  const [description, setDescription] = useState('');

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    // create a product JSON object
    const newProduct = {
      name: data.name,
      code: data.code,
      category: data.category,
      status: data.status,
      description: data.description,
    };

    await axios.post('http://localhost:5000/api/products', newProduct);

    props.history.push('/');
  };

  const handleCancel = (e) => {
    e.preventDefault();
    props.history.push('/');
  };

  const form = (
    <div>
      <div className="title">
        <h2 className="appTitle">PRODUCT MANAGEMENT APP</h2>
        <h4 className="appSubTitle">Add Product</h4>
      </div>

      <Form className="add-form" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group style={{ marginBottom: '25px' }}>
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter product name here..."
            value={name}
            ref={register({ required: true })}
            onChange={(event) => setName(event.target.value)}
          ></Form.Control>
          {errors.name && (
            <span
              style={{ color: 'red', fontSize: '0.7rem', position: 'absolute' }}
            >
              This field is required
            </span>
          )}
        </Form.Group>
        <Form.Group style={{ marginBottom: '25px' }}>
          <Form.Label>Product Code</Form.Label>
          <Form.Control
            name="code"
            type="text"
            placeholder="Enter product code here..."
            value={code}
            ref={register({ required: true })}
            onChange={(event) => setCode(event.target.value)}
          ></Form.Control>
          {errors.code && (
            <span
              style={{ color: 'red', fontSize: '0.7rem', position: 'absolute' }}
            >
              This field is required
            </span>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={category}
            ref={register()}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option defaultValue>Food</option>
            <option>Electronics</option>
            <option>Accessories</option>
            <option>DIY</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={status}
            ref={register()}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option defaultValue>Available</option>
            <option>Unavailable</option>
          </Form.Control>
        </Form.Group>
        <Form.Group style={{ marginBottom: '25px' }}>
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            name="description"
            ref={register({ required: true, maxLength: 250 })}
            as="textarea"
            rows={2}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </Form.Group>
        {errors.description && (
          <span
            style={{
              color: 'red',
              fontSize: '0.7rem',
              position: 'absolute',
              marginTop: '-25px',
            }}
          >
            Please provide description and less than 250 characters.
          </span>
        )}
        <Button
          variant="primary"
          style={{ margin: '0px 10px 0px 0px' }}
          type="submit"
        >
          Submit
        </Button>
        <Button variant="danger" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </div>
  );

  return form;
};

export default SingleProduct;
