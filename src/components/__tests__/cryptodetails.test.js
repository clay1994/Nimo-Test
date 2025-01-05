import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CryptoDetails from "../CryptoDetails";
import * as cryptoApi from "../../services/cryptoApi";

// Mock data based on the object structure
const mockCryptoDetails = {
  name: "Bitcoin",
  symbol: "btc",
  description: {
    en: "Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process.\r\n\r\nBitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. It is a decentralized peer-to-peer internet currency making mobile payment easy, very low transaction fees, protects your identity, and it works anywhere all the time with no central authority and banks.\r\n\r\nBitcoin is designed to have only 21 million BTC ever created, thus making it a deflationary currency. Bitcoin uses the <a href=\"https://www.coingecko.com/en?hashing_algorithm=SHA-256\">SHA-256</a> hashing algorithm with an average transaction confirmation time of 10 minutes. Miners today are mining Bitcoin using ASIC chip dedicated to only mining Bitcoin, and the hash rate has shot up to peta hashes.\r\n\r\nBeing the first successful online cryptography currency, Bitcoin has inspired other alternative currencies such as <a href=\"https://www.coingecko.com/en/coins/litecoin\">Litecoin</a>, <a href=\"https://www.coingecko.com/en/coins/peercoin\">Peercoin</a>, <a href=\"https://www.coingecko.com/en/coins/primecoin\">Primecoin</a>, and so on.\r\n\r\nThe cryptocurrency then took off with the innovation of the turing-complete smart contract by <a href=\"https://www.coingecko.com/en/coins/ethereum\">Ethereum</a> which led to the development of other amazing projects such as <a href=\"https://www.coingecko.com/en/coins/eos\">EOS</a>, <a href=\"https://www.coingecko.com/en/coins/tron\">Tron</a>, and even crypto-collectibles such as <a href=\"https://www.coingecko.com/buzz/ethereum-still-king-dapps-cryptokitties-need-1-billion-on-eos\">CryptoKitties</a>."
  },
  market_data: {
    current_price: { usd: 97900 },
    market_cap: { usd: 1941823408751 },
    market_cap_change_24h_in_currency: { usd: 22817655298 },
    ath: { usd: 108135 },
    total_volume: { usd: 36024294583 },
    fully_diluted_valuation: { usd: 2058957293062 },
    total_supply: 21000000,
    circulating_supply: 19805312,
  },
};

// Mock the `useGetCryotoDetailsQuery` hook
jest.mock("../../services/cryptoApi", () => ({
  useGetCryotoDetailsQuery: jest.fn(),
}));

test("renders cryptocurrency details correctly", () => {
  cryptoApi.useGetCryotoDetailsQuery.mockReturnValue({
    data: mockCryptoDetails,
    isFetching: false,
    isError: false,
  });

  render(
    <BrowserRouter>
      <CryptoDetails />
    </BrowserRouter>
  );

  // Check for the cryptocurrency details
  expect(screen.getByText("Bitcoin (BTC) Price")).toBeInTheDocument();
  expect(screen.getByText("Bitcoin live price in US dollars. View value statistics, market cap, and supply.")).toBeInTheDocument();

  // Check for statistics
  expect(screen.getByText("97.9K")).toBeInTheDocument();
  expect(screen.getByText("22.8B")).toBeInTheDocument();
  expect(screen.getByText("1.9T")).toBeInTheDocument();
  expect(screen.getByText("108.1K")).toBeInTheDocument();
});

test("displays error message on API error", () => {
  cryptoApi.useGetCryotoDetailsQuery.mockReturnValue({
    data: null,
    isFetching: false,
    isError: true,
    error: { message: "Failed to fetch cryptocurrency details" },
  });

  render(
    <BrowserRouter>
      <CryptoDetails />
    </BrowserRouter>
  );

  expect(
    screen.getByText(/Failed to fetch cryptocurrency details/i)
  ).toBeInTheDocument();
});
