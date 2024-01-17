import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MyComponent from './MyComponent';
import Home from './Pages/Home';
import About from './Pages/About';
import Menubar from './Components/Menubar';
import UserDetails from './Pages/UserDetails';
import Signin from './Components/Signin';
import ContactMe from './Pages/ContactMe';
import UserDetailsForm from './Components/UserDetailsForm';
import FailurePage from './Pages/FailurePage';
import SucessPage from './Pages/SucessPage';
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
          <Route path="/contactus" element={<ContactMe />} />
          <Route path="/edit" element={<UserDetailsForm />} />
          <Route path="/success" element={<SucessPage />} />
          <Route path="/failure" element={<FailurePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
