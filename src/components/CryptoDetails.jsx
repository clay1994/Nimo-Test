import React,  { useState, useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { useGetCryotoDetailsQuery, useGetCryotoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart';
import ClipLoader from "react-spinners/ClipLoader";
import { MonetizationOnOutlinedIcon, NumbersOutlinedIcon, FlashOnOutlinedIcon, StarOutlined, PriorityHighOutlinedIcon, DateRangeOutlinedIcon, PeopleAltOutlinedIcon, StackedLineChartOutlinedIcon } from '../shared/mui-icons';

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timePeriod, settimePeriod] = useState('7d');
    const { data: cryptoDetails, isFetching } = useGetCryotoDetailsQuery(coinId);

    if(isFetching) return <ClipLoader size="35" color='#1890ff' />;

    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    const stats = [
        { title: 'Price to USD', value: `$ ${cryptoDetails?.market_data?.current_price?.usd && millify(cryptoDetails?.market_data?.current_price?.usd)}`, icon: <MonetizationOnOutlinedIcon /> },
        { title: 'Rank', value: cryptoDetails?.market_cap_rank, icon: <NumbersOutlinedIcon /> },
        { title: 'Market Cap Change in 24h ', value: `$ ${cryptoDetails?.market_data?.market_cap_change_24h_in_currency?.usd && millify(cryptoDetails?.market_data?.market_cap_change_24h_in_currency?.usd)}`, icon: <FlashOnOutlinedIcon /> },
        { title: 'Market Cap', value: `$ ${cryptoDetails?.market_data?.market_cap?.usd && millify(cryptoDetails?.market_data?.market_cap?.usd)}`, icon: <MonetizationOnOutlinedIcon /> },
        { title: 'All-time-high', value: `$ ${cryptoDetails?.market_data?.ath?.usd && millify(cryptoDetails?.market_data?.ath?.usd)}`, icon: <StarOutlined /> },
    ];

    const genericStats = [
        { title: 'Total Volume', value: `$ ${cryptoDetails?.market_data?.total_volume?.usd && millify(cryptoDetails?.market_data?.total_volume?.usd)}`, icon: <MonetizationOnOutlinedIcon /> },
        { title: 'Watchlist Portfolio Users', value: millify(cryptoDetails?.watchlist_portfolio_users), icon: <PeopleAltOutlinedIcon /> },
        { title: 'Fully Diluted Valuation', value: `$ ${cryptoDetails?.market_data?.fully_diluted_valuation?.usd && millify(cryptoDetails?.market_data?.fully_diluted_valuation?.usd)}`, icon: <MonetizationOnOutlinedIcon /> },
        { title: 'Total Supply', value: `$ ${cryptoDetails?.market_data?.total_supply && millify(cryptoDetails?.market_data?.total_supply)}`, icon: <PriorityHighOutlinedIcon /> },
        { title: 'Circulating Supply', value: `$ ${cryptoDetails?.market_data?.circulating_supply && millify(cryptoDetails?.market_data?.circulating_supply)}`, icon: <StackedLineChartOutlinedIcon /> },
    ];

    return (
        <>
            {stats.map(({ icon, title, value}) => (
                <div className='coin-stats'>
                    <p>{icon}</p>
                    <p>{title}</p>
                    <p className='stats'>{value}</p>
                </div>
            ))}

            {genericStats.map(({ icon, title, value}) => (
                <div className='coin-stats'>
                    <p>{icon}</p>
                    <p>{title}</p>
                    <p className='stats'>{value}</p>
                </div>
            ))}
        </>
    )
}

export default CryptoDetails
