import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import NewRequest from "./components/NewRequest/NewRequest";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
          <ScrollToTop />
          <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/newRequest" element={<NewRequest />} />
          </Routes>
      </Router>
  </React.StrictMode>
);
