import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Kanban from './Kanban';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { DatabaseProvider } from './context/DatabaseContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DatabaseProvider>
          <ThemeProvider>
            <Kanban />
          </ThemeProvider>
        </DatabaseProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
