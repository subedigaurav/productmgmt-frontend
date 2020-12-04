import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './components/Product/AddProduct';
import EditProduct from './components/Product/EditProduct';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <App {...props} key={Date.now()} />}
        />
        <Route path="/addproduct" component={AddProduct}></Route>
        <Route path="/editproduct/:id" component={EditProduct} />
        <Route render={() => <h1>404 Error. Page Not found!</h1>} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
