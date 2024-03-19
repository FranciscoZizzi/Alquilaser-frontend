import React from 'react';
import './App.css';
import SearchPage from "./pages/search";
import HomePage from "./pages/home";
import {BrowserRouter, Route, Routes} from "react-router-dom";


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
        </BrowserRouter>
      </>
  );
}

export default App;
