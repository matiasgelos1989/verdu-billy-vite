import React, { useEffect, useState } from "react";
import { getAllPedidos, removePedido, updatePedido } from "../api/pedidos.api";
// import { IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Tooltip from "@mui/material/Tooltip";
// import Accordion from "@mui/material/Accordion";
// import AccordionActions from "@mui/material/AccordionActions";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {PedidosPendientes} from '../components/PedidosPendientes'
import {PedidosCompletos} from '../components/PedidosCompletos'
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 28,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));




export const Pedidos = () => {

const [pedidos, setPedidos] = useState([]);
const pedidosCompletos = pedidos.filter((pedido) => pedido.complete === true);
const pedidosPendientes = pedidos.filter((pedido) => pedido.complete === false);
const [mostrarPendientes,setMostrarPendientes] = useState(true)


const [cambio, setCambio] = useState(false)


const fetchData = (param) => {
    getAllPedidos(param).then((response) => {
      const newPedidos = response.data
      setPedidos(newPedidos);
      // console.log(pedidos);
    }); 
  };

useEffect(() => {
    fetchData();
  }, [pedidosCompletos,pedidosPendientes]);


  
  

const clickDelete = (id) => {
    const response = window.confirm("estás seguro que deseas eliminar este pedido?");
    if (response) {
      removePedido(id);
      setCambio(!cambio)
    }
}

const handleClickPendientes = () => {
  setMostrarPendientes(true);
}

const handleClickCompletos = () => {
  setMostrarPendientes(false)
}


const handleCompletarPedido = (cliente) => {
  const newPedido = {
    name: cliente.name,
    phone: cliente.phone,
    pedido: cliente.pedido,
    precioTotal: cliente.precioTotal,
    complete: true,
    _id: cliente._id
  }  
  const response = window.confirm('estás por completar el pedido, deseas confirmar ?')
  if(response) {
    if(newPedido._id !== undefined) {
      updatePedido(newPedido._id, newPedido)
    }
  }

}


return (
    <div style={{ display: "block", marginBottom: "5%" }}>
   
   <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'black'}}>
          <Toolbar>
            <Typography variant="h6" component="div" >
                <Stack spacing={1} direction="row">
                  <StyledBadge badgeContent={pedidosPendientes.length} color="primary">
                        <Button onClick={() => handleClickPendientes()} sx={{color:'white', width:'min-content'}} color='secondary' variant="contained">
                        Pedidos pendientes
                        </Button>
                  </StyledBadge>
                  <StyledBadge badgeContent={pedidosCompletos.length} color="primary">
                      <Button onClick={()=>handleClickCompletos()} sx={{color:'white',marginLeft:4,width:'min-content'}} color='secondary' variant="contained">
                        Pedidos completos
                      </Button>
                  </StyledBadge>
               </Stack>
            </Typography>
          </Toolbar>
      </AppBar>
    </Box>
      
        {mostrarPendientes ? 
            

              <PedidosPendientes fetchData={fetchData} pedidosPendientes={pedidosPendientes} clickDelete={clickDelete} handleCompletarPedido={handleCompletarPedido} pedidosCompletos={pedidosCompletos} ></PedidosPendientes>
          :
          
             <PedidosCompletos fetchData={fetchData} pedidosCompletos={pedidosCompletos} clickDelete={clickDelete} handleCompletarPedido={handleCompletarPedido}></PedidosCompletos>
      }

    </div>
  );

};
