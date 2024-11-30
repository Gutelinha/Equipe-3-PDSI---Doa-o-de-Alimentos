// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import RegisterDonatePage from './pages/RegisterDonatePage';
import ViewCampaignsPage from './pages/ViewCampaignsPage';
import EditCampaignPage from './pages/EditCampaignPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const funcs = {
  App() {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/adicionar-produto" element={<AddProductPage />} />
            <Route path="/criar-campanha" element={<CreateCampaignPage />} />
            <Route path="/registrar-doacoes" element={<RegisterDonatePage />} />
            <Route path="/visualizar-campanhas" element={<ViewCampaignsPage />} />
            <Route path="/editar-campanha/:name" element={<EditCampaignPage />} />
          </Routes>
        </div>
      </Router>
    );
  },

  TesteDB(){
    //envia um json com o conteudo para o server do back-end
    fetch("http://localhost:4000/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "table": "table_name"
      }),
    }).then((res)=>{
      alert(JSON.stringify(res));
    })
    
  }
}
export default funcs;