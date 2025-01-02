import React from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { NavBar, Cryptocurrencies,CryptoDetails } from './components';
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <NavBar />
      </div>
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route exact path="/" element={<Cryptocurrencies />}></Route>
              <Route exact path="/crypto/:coinId" element={<CryptoDetails />}></Route>
            </Routes>
          </div>
        </Layout>

        <div className='footer'>
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            Crypterra  <br />
            All right reserved
          </Typography.Title>
        </div>
      </div>
    </div>
  )
}

export default App
