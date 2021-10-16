import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from "./components/navbar.component"
import MaterialList from "./components/material-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateMaterial from "./components/create-material.component";
import CreateUser from "./components/create-user.component";
import ListarMateriais from "./components/materiais-list";
import User from './components/user';
import CreateBrand from './components/create-brand.component';

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <div className="corpo">
      <Route path="/" exact component={MaterialList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateMaterial} />
      <Route path="/user" component={CreateUser} />
      <Route path="/materiais" component={ListarMateriais} />
      <Route path="/usuario" component={User} />
      <Route path="/brand" component={CreateBrand} />
      </div>
    </Router>
  );
}

export default App;
