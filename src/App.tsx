import React from 'react';
import './App.css';
import ResultPage from "./pages/result";
import HomePage from "./pages/home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import ProfilePage from "./pages/profile";


function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<HomePage/>}/>
          </Routes>
          <Routes>
            <Route path={'/search-results'} element={<ResultPage/>}/>
          </Routes>
            <Routes>
                <Route path={'/register'} element={<RegisterPage/>}/>
            </Routes>
            <Routes>
                <Route path={'/login'} element={<LoginPage/>}/>
            </Routes>
            <Routes>
                <Route path={'/profile'} element={<ProfilePage/>}/>
            </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
