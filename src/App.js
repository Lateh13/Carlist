import React from 'react';
import './App.css';
import Carlist from './components/Carlist';
import { Toolbar, AppBar, Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">CarShop</Typography>
        </Toolbar>
      </AppBar>
      <Carlist />
    </div>
  );
}

export default App;
