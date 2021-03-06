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
    setCurUrl(`${process.env.REACT_APP_API_URL}/products`);
    const result = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
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
    await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`);
    fetchProducts();
    setLoading(false);
  };

  const sortProductHandler = async (field, value) => {
    setLoading(true);
    setSorting(true);
    setSearching(false);
    setCurUrl(
      `${process.env.REACT_APP_API_URL}/search?field=${field}&value=${value}&sort=true`
    );
    const sortedProducts = await axios.get(
      `${process.env.REACT_APP_API_URL}/search?field=${field}&value=${value}&sort=true`
    );
    setProducts(sortedProducts.data);
    setLoading(false);
  };

  const searchProductHandler = async (query) => {
    setLoading(true);
    setSearching(true);
    setSorting(false);
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL}/search?q=${query}`
    );
    setCurUrl(`${process.env.REACT_APP_API_URL}/search?q=${query}`);
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
        <h4 className="appSubTitle">Products Listing</h4>
      </div>
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
  );
};

export default App;
