import * as React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Receipt from './components/Receipt';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}>
          <Route index element={<Receipt />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
