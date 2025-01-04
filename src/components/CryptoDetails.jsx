import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { useGetCryotoDetailsQuery, useGetCryotoHistoryQuery } from "../services/cryptoApi";
import LineChart from "./LineChart";
import ClipLoader from "react-spinners/ClipLoader";
import Grid from '@mui/material/Grid2';
import {
    Typography,
    FormControl,
    Select,
    MenuItem,
    Paper,
} from "@mui/material";
import {
    MonetizationOnOutlined,
    NumbersOutlined,
    FlashOnOutlined,
    StarOutlined,
    PriorityHighOutlined,
    PeopleAltOutlined,
    StackedLineChartOutlined,
} from "@mui/icons-material";

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState("7d");
    const { data: cryptoDetails, isFetching } = useGetCryotoDetailsQuery(coinId);
    //   const { data: coinHistory } = useGetCryotoHistoryQuery({ coinId, timePeriod });

    if (isFetching) return <ClipLoader size="35" color="#1890ff" />;

    const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

    const stats = [
        {
            title: "Price to USD",
            value: `$ ${cryptoDetails?.market_data?.current_price?.usd &&
                millify(cryptoDetails?.market_data?.current_price?.usd)
                }`,
            icon: <MonetizationOnOutlined />,
        },
        { title: "Rank", value: cryptoDetails?.market_cap_rank, icon: <NumbersOutlined /> },
        {
            title: "Market Cap Change in 24h",
            value: `$ ${cryptoDetails?.market_data?.market_cap_change_24h_in_currency?.usd &&
                millify(cryptoDetails?.market_data?.market_cap_change_24h_in_currency?.usd)
                }`,
            icon: <FlashOnOutlined />,
        },
        {
            title: "Market Cap",
            value: `$ ${cryptoDetails?.market_data?.market_cap?.usd &&
                millify(cryptoDetails?.market_data?.market_cap?.usd)
                }`,
            icon: <MonetizationOnOutlined />,
        },
        {
            title: "All-time-high",
            value: `$ ${cryptoDetails?.market_data?.ath?.usd &&
                millify(cryptoDetails?.market_data?.ath?.usd)
                }`,
            icon: <StarOutlined />,
        },
    ];

    const genericStats = [
        {
            title: "Total Volume",
            value: `$ ${cryptoDetails?.market_data?.total_volume?.usd &&
                millify(cryptoDetails?.market_data?.total_volume?.usd)
                }`,
            icon: <MonetizationOnOutlined />,
        },
        {
            title: "Watchlist Portfolio Users",
            value: millify(cryptoDetails?.watchlist_portfolio_users),
            icon: <PeopleAltOutlined />,
        },
        {
            title: "Fully Diluted Valuation",
            value: `$ ${cryptoDetails?.market_data?.fully_diluted_valuation?.usd &&
                millify(cryptoDetails?.market_data?.fully_diluted_valuation?.usd)
                }`,
            icon: <MonetizationOnOutlined />,
        },
        {
            title: "Total Supply",
            value: `$ ${cryptoDetails?.market_data?.total_supply &&
                millify(cryptoDetails?.market_data?.total_supply)
                }`,
            icon: <PriorityHighOutlined />,
        },
        {
            title: "Circulating Supply",
            value: `$ ${cryptoDetails?.market_data?.circulating_supply &&
                millify(cryptoDetails?.market_data?.circulating_supply)
                }`,
            icon: <StackedLineChartOutlined />,
        },
    ];

    return (
        <div className="main-layout">
            {cryptoDetails && (
                <Grid container spacing={3}>

                    {/* Heading Section */}
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom className='common-title'>
                            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
                        </Typography>
                        <Typography variant="body1">
                            {cryptoDetails.name} live price in US dollars. View value
                            statistics, market cap, and supply.
                        </Typography>
                    </Grid>


                    {/* Select Time Period */}
                    {/* <Grid item xs={12}>
                        <FormControl fullWidth>
                            <Select
                                value={timePeriod}
                                onChange={(e) => setTimePeriod(e.target.value)}
                                displayEmpty
                            >
                                {time.map((date) => (
                                    <MenuItem key={date} value={date}>
                                        {date}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid> */}

                    {/* Line Chart */}
                    {/* {coinHistory && (
                        <Grid item xs={12}>
                        <Paper>
                            <LineChart
                            coinHistory={coinHistory}
                            currentPrice={millify(cryptoDetails.market_data.current_price.usd)}
                            coinName={cryptoDetails.name}
                            />
                        </Paper>
                        </Grid>
                    )} */}

                    {/* Description and Links */}
                    <Grid item xs={12} spacing={2}>
                        <Typography variant="h5" className='common-title'>What is {cryptoDetails.name}</Typography>
                        <Typography>{HTMLReactParser(cryptoDetails.description.en)}</Typography>
                    </Grid>

                    {/* Statistics Section */}
                    <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <Typography variant="h5" className='common-title'>{cryptoDetails.name} Value Statistics</Typography>
                        {stats.map(({ icon, title, value }) => (
                            <Grid container spacing={2} padding={1} key={title} alignItems="center">
                                <Grid item xs={2}>{icon}</Grid>
                                <Grid item xs={6}><Typography>{title}:</Typography></Grid>
                                <Grid item xs={4}><Typography><b>{value}</b></Typography></Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                        <Typography variant="h5" className='common-title'>Other Statistics</Typography>
                        {genericStats.map(({ icon, title, value }) => (
                            <Grid container spacing={2} padding={1} key={title} alignItems="center">
                                <Grid item xs={2}>{icon}</Grid>
                                <Grid item xs={6}><Typography>{title}:</Typography></Grid>
                                <Grid item xs={4}><Typography><b>{value}</b></Typography></Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default CryptoDetails;
