import React, { useState, useEffect  } from 'react';
import millify from 'millify';
import { Card, Row, Col, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from "../services/cryptoApi";
import ClipLoader from "react-spinners/ClipLoader";

const Cryptocurrencies = () => {
    const { data: cryptosList, isFetching } = useGetCryptosQuery();
    const [cryptos, setCryptos] = useState([]);  
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Check if the data exists and filter based on the search term
        if (cryptosList) {
          const filteredData = cryptosList.filter((coin) =>
            coin.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          setCryptos(filteredData);
        }
    }, [cryptosList, searchTerm]);
    
    if(isFetching) return <ClipLoader size="35" color='#1890ff' />;

    return (        
        <>
            <div className="search-crypto">
                <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}/>
            </div>

            {cryptos && (                
                <div className="debugging-block" style={{ marginLeft: 160 }}>
                    <h3>Debugging Crypto Data:</h3>
                    <pre>{JSON.stringify(cryptos, null, 2)}</pre>
                </div>
            )}
        </>
    )
}

export default Cryptocurrencies
