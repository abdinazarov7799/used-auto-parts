import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <ScrollToTop />
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
          </Routes>
      </Router>
  </React.StrictMode>
);
