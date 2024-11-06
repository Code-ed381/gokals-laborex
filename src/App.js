import * as React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Cashier from './components/Cashier';
import Dispatch from './components/Dispatch';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route index element={<Dashboard />} />
          <Route path="dispatch" element={<Dispatch />} />
          <Route path="cashier" element={<Cashier />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
