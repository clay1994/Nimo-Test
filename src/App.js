import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { NavBar, Cryptocurrencies, CryptoDetails, CryptoForm } from './components';
import './App.css';

const App = () => {
  return (
    <Grid container spacing={3}>
      <Grid item size={{ sm: 12, md: 3, lg: 2 }}>
        <NavBar />
      </Grid>
      <Grid item size={{ sm: 12, md: 9, lg: 10 }} spacing={2} paddingTop={8}>
        <div className='main'>
          <Routes>
            <Route exact path="/" element={<Cryptocurrencies />} />
            <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
            <Route exact path="/crypto-form" element={<CryptoForm />} />
          </Routes>
        </div>
      </Grid>
    </Grid>
  );
};

export default App;
