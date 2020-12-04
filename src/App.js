import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProductsList from './components/ProductsList';
import TopBar from './components/TopBar';
import Spinner from './components/Spinner';
import Paginator from './components/Paginator';
import './App.css';

const App = (props) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({});
  const [curUrl, setCurUrl] = useState('');
  const [searching, setSearching] = useState(false);
  const [sorting, setSorting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setSearching(false);
    setSorting(false);
    setCurUrl('http://localhost:5000/api/products');
    const result = await axios.get('http://localhost:5000/api/products');
    setProducts(result.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const editProductHandler = (id) => {
    props.history.push(`/editproduct/${id}`);
  };

  const deleteProductHandler = async (id) => {
    setLoading(true);
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
    setLoading(false);
  };

  const sortProductHandler = async (field, value) => {
    setLoading(true);
    setSearching(false);
    setSorting(true);
    setCurUrl(
      `http://localhost:5000/api/search?field=${field}&value=${value}&sort=true`
    );
    const sortedProducts = await axios.get(
      `http://localhost:5000/api/search?field=${field}&value=${value}&sort=true`
    );
    setProducts(sortedProducts.data);
    setLoading(false);
  };

  const searchProductHandler = async (query) => {
    setLoading(true);
    setSearching(true);
    setSorting(false);
    const result = await axios.get(
      `http://localhost:5000/api/search?q=${query}`
    );
    setCurUrl(`http://localhost:5000/api/search?q=${query}`);
    setProducts(result.data);
    setLoading(false);
  };

  const changePageHandler = async (page) => {
    setLoading(true);

    let searchUrl = '';
    if (searching || sorting) {
      searchUrl = `${curUrl}&page=${page}`;
    } else {
      searchUrl = `${curUrl}?page=${page}`;
    }

    if (products.pagination.next || products.pagination.prev) {
      const result = await axios.get(searchUrl);
      setProducts(result.data);
    }
    setLoading(false);
  };

  let productList = products.data && (
    <ProductsList
      products={products.data}
      editCallback={editProductHandler}
      deleteCallback={deleteProductHandler}
      categorySortCallback={sortProductHandler}
    />
  );

  if (loading) {
    productList = <Spinner />;
  }

  //* refresh the page when the user clicks on the app name
  const refreshPage = (e) => {
    e.preventDefault();
    props.history.replace('/');
  };

  return (
    <div>
      <div className="title">
        <h2 onClick={refreshPage} className="appTitle">
          PRODUCT MANAGEMENT APP
        </h2>
        <h4 style={{ color: '#0e49b5' }}>Products Listing</h4>
        <TopBar searchCallback={searchProductHandler} />
        {productList}
        <Paginator
          hide={loading}
          current={1}
          searching={searching}
          sorting={sorting}
          changePageCallback={changePageHandler}
          hasPrev={products.pagination ? !!products.pagination.prev : false}
          hasNext={products.pagination ? !!products.pagination.next : false}
        />
      </div>
    </div>
  );
};

export default App;
