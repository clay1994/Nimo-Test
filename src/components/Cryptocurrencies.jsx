import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Pagination,
  TextField,
  Paper,
} from "@mui/material";
import { ClipLoader } from "react-spinners";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = () => {
  const { data: cryptosList, isFetching } = useGetCryptosQuery();
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [sortField, setSortField] = useState("market_cap_rank");
  const [sortDirection, setSortDirection] = useState("asc");

  // Filter cryptos based on the search term
  useEffect(() => {
    if (cryptosList) {
      const filteredData = cryptosList.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCryptos(filteredData);
    }
  }, [cryptosList, searchTerm]);

  // Handle sorting logic
  const handleSort = (field) => {
    const isAsc = sortField === field && sortDirection === "asc";
    setSortField(field);
    setSortDirection(isAsc ? "desc" : "asc");
  };

  const sortedCryptos = cryptos.sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    }
    return a[sortField] < b[sortField] ? 1 : -1;
  });

  // Paginate data
  const paginatedCryptos = sortedCryptos.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Loader
  if (isFetching) return <ClipLoader size={35} color="#1890ff" />;

  return (
    <div style={{ padding: 20 }}>
      {/* Search Bar */}
      <TextField
        fullWidth
        placeholder="Search Cryptocurrency"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      {/* Crypto Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortField === "market_cap_rank"}
                  direction={sortField === "market_cap_rank" ? sortDirection : "asc"}
                  onClick={() => handleSort("market_cap_rank")}
                >
                  Rank
                </TableSortLabel>
              </TableCell>
              <TableCell>Image</TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === "name"}
                  direction={sortField === "name" ? sortDirection : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === "current_price"}
                  direction={sortField === "current_price" ? sortDirection : "asc"}
                  onClick={() => handleSort("current_price")}
                >
                  Price
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortField === "market_cap"}
                  direction={sortField === "market_cap" ? sortDirection : "asc"}
                  onClick={() => handleSort("market_cap")}
                >
                  Market Cap
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptos.map((crypto) => (
              <TableRow key={crypto.id}>
                <TableCell>{crypto.market_cap_rank}</TableCell>
                <TableCell>
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    style={{ width: 30, height: 30 }}
                  />
                </TableCell>
                <TableCell>{crypto.name}</TableCell>
                <TableCell>${crypto.current_price.toLocaleString()}</TableCell>
                <TableCell>${crypto.market_cap.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Pagination
        count={Math.ceil(cryptos.length / rowsPerPage)}
        page={page}
        onChange={(e, value) => setPage(value)}
        style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};

export default Cryptocurrencies;
