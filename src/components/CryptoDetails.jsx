import React from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';

import ClipLoader from "react-spinners/ClipLoader";
import Grid from "@mui/material/Grid2";
import { Typography, Alert } from "@mui/material";
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
  const { data: cryptoDetails, isFetching, error } = useGetCryptoDetailsQuery(coinId);

  if (isFetching) return <ClipLoader size={35} color="#1890ff" />;
  
  if (error || !cryptoDetails) {
    return (
        <Alert severity="error" style={{ marginTop: 20 }}>
          {error?.message || "Failed to fetch cryptocurrency details. Please try again later."}
        </Alert>
      );
  }

  const stats = [
    {
      title: "Price to USD",
      value: `${
        cryptoDetails?.market_data?.current_price?.usd
          ? millify(cryptoDetails?.market_data?.current_price?.usd)
          : "N/A"
      }`,
      icon: <MonetizationOnOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.market_cap_rank || "N/A", icon: <NumbersOutlined /> },
    {
      title: "Market Cap Change in 24h",
      value: `${
        cryptoDetails?.market_data?.market_cap_change_24h_in_currency?.usd
          ? millify(cryptoDetails?.market_data?.market_cap_change_24h_in_currency?.usd)
          : "N/A"
      }`,
      icon: <FlashOnOutlined />,
    },
    {
      title: "Market Cap",
      value: `${
        cryptoDetails?.market_data?.market_cap?.usd
          ? millify(cryptoDetails?.market_data?.market_cap?.usd)
          : "N/A"
      }`,
      icon: <MonetizationOnOutlined />,
    },
    {
      title: "All-time-high",
      value: `${
        cryptoDetails?.market_data?.ath?.usd
          ? millify(cryptoDetails?.market_data?.ath?.usd)
          : "N/A"
      }`,
      icon: <StarOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Total Volume",
      value: `${
        cryptoDetails?.market_data?.total_volume?.usd
          ? millify(cryptoDetails?.market_data?.total_volume?.usd)
          : "N/A"
      }`,
      icon: <MonetizationOnOutlined />,
    },
    {
      title: "Watchlist Portfolio Users",
      value: millify(cryptoDetails?.watchlist_portfolio_users || 0),
      icon: <PeopleAltOutlined />,
    },
    {
      title: "Fully Diluted Valuation",
      value: `${
        cryptoDetails?.market_data?.fully_diluted_valuation?.usd
          ? millify(cryptoDetails?.market_data?.fully_diluted_valuation?.usd)
          : "N/A"
      }`,
      icon: <MonetizationOnOutlined />,
    },
    {
      title: "Total Supply",
      value: `${
        cryptoDetails?.market_data?.total_supply
          ? millify(cryptoDetails?.market_data?.total_supply)
          : "N/A"
      }`,
      icon: <PriorityHighOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `${
        cryptoDetails?.market_data?.circulating_supply
          ? millify(cryptoDetails?.market_data?.circulating_supply)
          : "N/A"
      }`,
      icon: <StackedLineChartOutlined />,
    },
  ];

  return (
    <div className="main-layout">
      <Grid container spacing={3}>
        {/* Heading Section */}
        <Grid xs={12}>
          <Typography variant="h4" gutterBottom className="common-title">
            {cryptoDetails.name} ({cryptoDetails.symbol?.toUpperCase()}) Price
          </Typography>
          <Typography variant="body1">
            {cryptoDetails.name} live price in US dollars. View value statistics, market cap, and
            supply.
          </Typography>
        </Grid>

        {/* Description and Links */}
        <Grid xs={12}>
          <Typography variant="h5" className="common-title">
            What is {cryptoDetails.name}?
          </Typography>
          {cryptoDetails.description?.en ? (
            <Typography>{HTMLReactParser(cryptoDetails.description.en)}</Typography>
          ) : (
            <Typography>No description available.</Typography>
          )}
        </Grid>

        {/* Statistics Section */}
        <Grid xs={12} md={6}>
          <Typography variant="h5" className="common-title">
            {cryptoDetails.name} Value Statistics
          </Typography>
          {stats.map(({ icon, title, value }) => (
            <Grid container spacing={2} padding={1} key={title} alignItems="center">
              <Grid xs={2}>{icon}</Grid>
              <Grid xs={6}>
                <Typography>{title}:</Typography>
              </Grid>
              <Grid xs={4}>
                <Typography>
                  <b>{value}</b>
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid xs={12} md={6}>
          <Typography variant="h5" className="common-title">
            Other Statistics
          </Typography>
          {genericStats.map(({ icon, title, value }) => (
            <Grid container spacing={2} padding={1} key={title} alignItems="center">
              <Grid xs={2}>{icon}</Grid>
              <Grid xs={6}>
                <Typography>{title}:</Typography>
              </Grid>
              <Grid xs={4}>
                <Typography>
                  <b>{value}</b>
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default CryptoDetails;
