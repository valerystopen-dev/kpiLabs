import React from 'react';
import {Lab1} from './DataSearch/Lab1/Lab1'
import {Lab01} from "./DataSecurity/Lab1/Lab01";
import {Lab12} from "./DataSearch/Lab1/Lab12";
import {Main} from "./Main/Main";
import {Routes, Route, BrowserRouter} from "react-router-dom"


export const App = () => {

  return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/data-search1" element={<Lab1/>}/>
              <Route path="/data-search12" element={<Lab12/>}/>
            <Route path="/data-security1" element={<Lab01/>}/>
          </Routes>
      </BrowserRouter>
  );
};

