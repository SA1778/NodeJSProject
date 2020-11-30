import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

import Home from "./components/Home.component";
import Chart from "./components/Chart.component";
import Footer from "./components/Footer.component";
import Navbar from "./components/Navbar.component";

function App() {
  return (
    <Router>
      <Navbar/>
      <Route path="/" exact component={Home}/>
      <Route path="/chart" component={Chart}/>
      <Footer/>
    </Router>
  );
}

export default App;
