import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ExcelUpload from './pages/ExcelUpload';
import Register from './pages/Register';
import Home from './pages/Home';
import Downloads from './pages/Downloads';
import History from './pages/History';
import AIInsights from './pages/AIInsights';

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/upload" element={<ExcelUpload/>}/>
        <Route path="/downloads" element={<Downloads/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/insights" element={<AIInsights/>}/>
      </Routes>
    </Router>
  );
}
export default App; 