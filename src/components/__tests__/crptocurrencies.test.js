import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Cryptocurrencies from "../Cryptocurrencies";
import * as cryptoApi from "../../services/cryptoApi";

// Mock data based on the object structure
const mockCryptos = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "btc",
    market_cap_rank: 1,
    image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
    current_price: 97900,
    market_cap: 1941823408751,
    fully_diluted_valuation: 2058957293062,
    total_volume: 36024294583,
    high_24h: 98971,
    low_24h: 96010,
    price_change_24h: 1133.07,
    price_change_percentage_24h: 1.16944,
    market_cap_change_24h: 22817655298,
    market_cap_change_percentage_24h: 1.18904,
    circulating_supply: 19805312.0,
    total_supply: 21000000.0,
    max_supply: 21000000.0,
    ath: 108135,
    ath_change_percentage: -9.2741,
    ath_date: "2024-12-17T15:02:41.429Z",
    atl: 67.81,
    atl_change_percentage: 144580.18071,
    atl_date: "2013-07-06T00:00:00.000Z",
    roi: null,
    last_updated: "2025-01-04T00:34:34.931Z",
  },
];

jest.mock("../../services/cryptoApi", () => ({
  useGetCryptosQuery: jest.fn(),
}));

test("renders cryptocurrency data correctly", () => {
  cryptoApi.useGetCryptosQuery.mockReturnValue({
    data: mockCryptos,
    isFetching: false,
    isError: false,
  });

  render(
    <BrowserRouter>
      <Cryptocurrencies />
    </BrowserRouter>
  );

  // Check for Bitcoin data
  expect(screen.getByText("Bitcoin")).toBeInTheDocument();
  expect(screen.getByText("$97.9K")).toBeInTheDocument();
  expect(screen.getByText("$1.9T")).toBeInTheDocument();
  // Can add other fields if required

  // Check for Bitcoin image
  const bitcoinImage = screen.getByAltText("Bitcoin");
  expect(bitcoinImage).toHaveAttribute("src", mockCryptos[0].image);
});

test("displays error message on API error", () => {
  cryptoApi.useGetCryptosQuery.mockReturnValue({
    data: null,
    isFetching: false,
    isError: true,
    error: { message: "Failed to fetch cryptocurrencies" },
  });

  render(
    <BrowserRouter>
      <Cryptocurrencies />
    </BrowserRouter>
  );

  expect(
    screen.getByText(/Failed to fetch cryptocurrencies/i)
  ).toBeInTheDocument();
});
