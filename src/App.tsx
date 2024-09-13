
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import EditProduct from './components/EditProduct';
import ProductAppHeader from './components/ProductAppHeader';

const App: React.FC = () => (
  <Router>
    <ProductAppHeader />
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/editProduct/:id" element={<EditProduct />} />
    </Routes>
  </Router>
);

export default App;

