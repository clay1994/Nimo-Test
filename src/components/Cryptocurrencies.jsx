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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { ClipLoader } from "react-spinners";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = () => {
  const { data: cryptosList, isFetching } = useGetCryptosQuery();
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
      <Grid container spacing={2} style={{ marginBottom: 20 }}>
        <Grid item size={{ xs: 12, sm: 12, md: 10, lg: 10 }}>
            <h1>Cryptocurrency Prices by Market Cap</h1>
        </Grid>
        <Grid item size={{ xs: 12, sm: 12, md: 2, lg: 2 }}></Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: 20 }}>
        {/* Search Bar Section */}
        <Grid item size={{ xs: 12, sm: 12, md: 10, lg: 10 }}>
          <TextField
            fullWidth
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>

        {/* Rows per Page Selector Section */}
        <Grid item size={{ xs: 12, sm: 12, md: 2, lg: 2 }}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="rows-per-page-label">Rows per Page</InputLabel>
            <Select
              labelId="rows-per-page-label"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(e.target.value);
                setPage(1); // Reset to the first page
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Crypto Table */}
      <TableContainer component={Paper} 
        style={{ overflowX: "auto"}}>
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
