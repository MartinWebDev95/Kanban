import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Kanban from './Kanban';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Kanban />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
