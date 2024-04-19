import React, { useState, useEffect } from "react";
import { getAllProducts, removeProduct } from "../api/products.api";
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FormProduct from "../components/FormProduct";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from '@mui/material/Tooltip';

export const PanelPage = () => {
  const [products, setProducts] = useState([]);
  const [open,setOpen] = useState(false);
  const [cambio,setCambio] = useState(true);
  const [product, setProduct] = useState({
    name: '',
    precio: '',
    modalidadVenta: '',
    url: '',
});

  useEffect(() => {
    fetchData();
  }, [cambio]);

  const fetchData = (param) => {
    getAllProducts(param).then((response) => {
      setProducts(response.data);
      // console.log(response.data)
    });
  };

  const handleClickOpen = () => {
    setProduct({
      name: '',
      precio: '',
      modalidadVenta: '',
      url: '',
  });
    setOpen(true);
}

const handleClose = () => {
    setOpen(false);
};

const handleEdit = (item) => {
  setProduct(item)
  setOpen(true);

}

const clickDelete = (id) => {
  const response = window.confirm('¿estás seguro que deseas eliminar este producto?')
  if(response) {
    removeProduct(id);
    setCambio(!cambio)
  }
  }

  return (<>
  
       <FormProduct  product={product} open={open} fetchData={fetchData} handleClickOpen={handleClickOpen} handleClose={handleClose}></FormProduct>     
     
      <div style={{ display: "flex", flexWrap: "wrap" ,marginBottom:"5%"}}>
        {products.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              margin: "10px",
              boxShadow: "4px 2px 15px black",
              borderRadius: "10px",
            }}
          >
            <Card sx={{ width: 200, textAlign: "end" }}>
              <CardMedia
                sx={{ height: 100, width: 100, margin: "auto" }}
                image={item.url}
                title={item.name}
              />
              <CardContent>
                <Typography
                  sx={{ textAlign: "center" }}
                  gutterBottom
                  variant="h5"
                  component="h5"
                >
                  {item.name}
                </Typography>
                <Typography variant="h5" color="text.primary">
                  <div style={{ display: "block" }}>
                    <h5 style={{ margin: 10, textAlign: "center" }}>
                      {item.modalidadVenta}
                    </h5>
                    <h5 style={{ margin: 10, textAlign: "center" }}>
                      $ {new Intl.NumberFormat().format(item.precio)}
                    </h5>
                  </div>
                </Typography>
              </CardContent>
              <Tooltip fontSize="small" title="Editar producto" arrow>
                <IconButton color="primary" aria-label="Edit" size="large" 
                onClick={(e) => handleEdit(item)}
                >
                  <EditIcon fontSize="large" color="primary" />
                </IconButton>
              </Tooltip>

              <Tooltip fontSize="small" title="Eliminar producto" arrow>
                <IconButton color="error" aria-label="Delete" size="large" onClick={(e) => clickDelete(item._id)}>
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Card>

          </div>
        ))}
      </div>
   
    </>
  );
};
