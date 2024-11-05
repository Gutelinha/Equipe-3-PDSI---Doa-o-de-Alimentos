// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
//import * as database from 'back-end';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/adicionar-produto" element={<AddProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

//database.MyQuery(`Select * from produto`);

export default App;