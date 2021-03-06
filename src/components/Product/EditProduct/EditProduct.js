import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EditProduct = (props) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState(null);
  const [category, setCategory] = useState('Food');
  const [status, setStatus] = useState('Available');
  const [description, setDescription] = useState('');

  const { register, handleSubmit, errors } = useForm();

  const populateStates = (product) => {
    setName(product.name);
    setCode(product.code);
    setCategory(product.category);
    setStatus(product.status);
    setDescription(product.description);
  };

  //* useCallback here to minimize the re-renders on setting states
  const loadData = useCallback(async () => {
    let product = await axios.get(
      `${process.env.REACT_APP_API_URL}/products/${props.match.params.id}`
    );
    product = product.data;
    populateStates(product);
  }, [props.match.params]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  //* handle form submission
  const onSubmit = async (data) => {
    // create a product JSON object
    const newProduct = {
      name: data.name,
      code: data.code,
      category: data.category,
      status: data.status,
      description: data.description,
    };
    await axios.put(
      `${process.env.REACT_APP_API_URL}/products/${props.match.params.id}`,
      newProduct
    );
    props.history.push('/');
  };

  const handleCancel = (e) => {
    e.preventDefault();
    props.history.push('/');
  };

  //* refresh the page when the user clicks on the app name
  const refreshPage = (e) => {
    e.preventDefault();
    props.history.replace('/');
  };

  const form = code && (
    <div>
      <div className="title">
        <h2 onClick={refreshPage} className="appTitle">
          PRODUCT MANAGEMENT APP
        </h2>
        <h4 className="appSubTitle">Edit Product</h4>
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

export default EditProduct;
