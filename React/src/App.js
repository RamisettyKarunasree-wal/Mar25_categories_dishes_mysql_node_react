import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Category from './Category';
import Dish from './Dish';
import Cookie from './Cookie';
import CookieTimeline from './CookieTimeline';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="App">
      <BrowserRouter>
        <NavLink activeClassName="active" className="links" to="/category">
          Categories
        </NavLink>
        <NavLink activeClassName="active" className="links" to="/category">
          Categories
        </NavLink>
        <NavLink activeClassName="active" className="links" to="/cookie">
          Cookie
        </NavLink>
        <NavLink
          activeClassName="active"
          className="links"
          to="/cookieTimeLine"
        >
          Cookie with Time line
        </NavLink>
        <Routes>
          <Route path="/category" element={<Category />} />
          <Route path="/dishes" element={<Dish />} />
          <Route path="/cookie" element={<Cookie />} />
          <Route path="/cookieTimeLine" element={<CookieTimeline />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
