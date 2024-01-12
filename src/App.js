import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MyComponent from './MyComponent';
import Home from './Pages/Home';
import About from './Pages/About';
import Menubar from './Components/Menubar';
import UserDetails from './Pages/UserDetails';
import Signin from './Components/Signin';

function App() {
  return (
    <Router>
      <div className="App">
        <Menubar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/my-component" element={<MyComponent />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
