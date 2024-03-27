import React from 'react';
import './App.css';
import SearchPage from "./pages/search";
import HomePage from "./pages/home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";


function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<HomePage/>}/>
          </Routes>
          <Routes>
            <Route path={'/search'} element={<SearchPage/>}/>
          </Routes>
            <Routes>
                <Route path={'/register'} element={<RegisterPage/>}/>
            </Routes>
            <Routes>
                <Route path={'/login'} element={<LoginPage/>}/>
            </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
