import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import About from './pages/About/About';
import Home from './pages/Home/Home';
import Share from './pages/Share/Share';
import Explore from './pages/Explore/Explore';
import Desk from './pages/Desk/Desk';
import FourOhFour from './pages/FourOhFour/FourOhFour';
import Charts from './pages/Charts/Charts';
import AuthModal from './components/AuthModal/AuthModal';

import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <Router>
          <Header/>
          <AuthModal/>
            <Switch>
              <Route exact path="/explore" component={Explore}/>
              <Route exact path="/about" component={About}/>
              <Route exact path="/share" component={Share}/>
              <Route exact path="/charts" component={Charts}/>
              <Route exact path="/desk/:username/:id" component={Desk}/>
              <Route exact path="/" component={Home}/>
              <Route component={FourOhFour}/>
            </Switch>
          <Footer/>
    </Router>
    </div>
  );
}

export default App;
