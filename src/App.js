import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from "./components/navbar.component"
import MaterialList from "./components/material-list.component";
import EditMaterial from "./components/edit-material.component";
import CreateMaterial from "./components/create-material.component";
import ListarMateriais from "./components/materiais-list";
import CreateBrand from './components/create-brand.component';

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="corpo">
        <Route path="/" exact component={ListarMateriais} />
        <Route path="/edit/:id" component={EditMaterial} />
        <Route path="/create" component={CreateMaterial} />
        <Route path="/materiais" component={MaterialList} />
        <Route path="/brand" component={CreateBrand} />
      </div>
    </Router>
  );
}

export default App;
