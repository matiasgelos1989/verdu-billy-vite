import React from "react";
import { Feed } from "../components/Feed";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import { getAllProducts } from "../api/products.api";
import { useCart } from "../context/CartContext";
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export const HomePage = () => {
  const { showCart } = useCart();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const fetchData = (param) => {
    getAllProducts(param).then((response) => {
        setProducts(response.data);
      // console.log(response.data)
    });
};

const handleFilter = (e) => {
  e.preventDefault()
  searchTerm ? fetchData(searchTerm) : fetchData('');
}

  useEffect(() => {
    fetchData(); 
  }, [showCart]);

  return (
    <>
    <div style={{margin:'20px', display:'flex'}}>
      <form style={{display:'flex'}} onSubmit={handleFilter}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          "& .MuiTextField-root": { width: "25ch" },
        }}
      >
        <TextField label={"Producto"} id="producto" onChange={(e) => setSearchTerm(e.target.value)} />
      </Box>
      <Stack spacing={2} sx={{marginLeft:'5px'}} direction="row">
      <Button variant="contained" onClick={handleFilter}>
      <SearchIcon 
      value={searchTerm}
      fontSize="large"
      color="default">
      </SearchIcon>Buscar
      </Button>
    </Stack>
    </form>

   
      </div>
      <Feed products={products} fetchData={fetchData}></Feed>
    </>
  );
};
