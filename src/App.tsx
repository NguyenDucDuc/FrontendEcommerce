import React from 'react';
import "./App.scss"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/login/Login';
import Header from './components/header/Header'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
