import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Upload from './components/Upload';
import ThumbnailList from './components/ThumbnailList';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/upload" element={<Upload />} />
    <Route path="/ThumbnailList" element={<ThumbnailList />} />
 
  </Routes>
);

ReactDOM.render(
  <Router>
    <AppRoutes />
  </Router>,
  document.getElementById('root')
);
