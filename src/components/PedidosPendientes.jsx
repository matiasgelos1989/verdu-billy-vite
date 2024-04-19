import React from 'react'
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Button from "@mui/material/Button";
// import Switch from '@mui/material/Switch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Checkbox from '@mui/material/Checkbox';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// const label = { inputProps: { 'aria-label': 'Switch demo' } };

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const PedidosPendientes = ({clickDelete, handleCompletarPedido,pedidosPendientes,fetchData}) => {



  const handleDelete = async (cliente) => {
    await clickDelete(cliente);
    return fetchData();
  }

  // const handleClose = () => {
  //   setOpen(false);
  // }

  return (<>
  
  {pedidosPendientes.length > 0 ? (<> 
  {pedidosPendientes.map((cliente) => (
          <div
            style={{
              display: "block",
              margin: 10,
              padding: 5              
            }}
            key={cliente._id}
          >
            {/* {console.log(cliente)} */}
            <Accordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel-header"
              >
                <h3>
                  {cliente.name} - {cliente.phone} - {cliente.address}
                </h3>
              </AccordionSummary>
              <AccordionDetails>
                <div style={{display:'flex', flexWrap: 'wrap'}}>
                {cliente.pedido.map((detalle) => (
                  <div key={detalle._id} style={{ display: "flex", boxShadow:'1px 1px 4px 2px lightblue',borderRadius:'20px', width:'450px' , margin:4}}>
                     <Checkbox color='success' {...label} />
                    <h4 style={{ margin: 5 }}>
                      {(detalle.product.name)}
                    </h4>
                    {/* {console.log(detalle)} */}
                    <h4 style={{ margin: 5 }}>
                      {detalle.product.modalidadVenta}
                    </h4>
                    <h4 style={{ margin: 5 }}>
                      precio: ${new Intl.NumberFormat().format(detalle.product.precio)}
                    </h4>
                    <h4>
                     cantidad: {detalle.quantity}
                    </h4>
                  </div>
                ))}
                </div>
                <div style={{ display: "flex", textAlign: "center" }}>
                  <p
                    style={{
                      marginLeft: "10px",
                      fontFamily: "sans-serif",
                      marginRight: "50px",
                      fontSize: "20px",
                      fontWeight: "800",
                    }}
                  >
                    Total de la compra{" "}
                  </p>
                  <p
                    style={{
                      fontFamily: "sans-serif",
                      fontSize: "20px",
                      fontWeight: "800",
                      color: "green",
                    }}
                  >
                    {/* {console.log(cliente)} */}$ {new Intl.NumberFormat().format(cliente.precioTotal)}
                  </p>
                </div>
              </AccordionDetails>
              <div style={{display:'flex',justifyContent:'end'}}>
              <Tooltip fontSize="small" title="Eliminar pedido" arrow>
              <IconButton
                color="error"
                aria-label="Delete"
                size="large"
                onClick={(e) => handleDelete(cliente._id)}
              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            </Tooltip>
              {!cliente.complete ?
              <AccordionActions>
                <Tooltip fontSize="small" title="Completar pedido" arrow>
                <IconButton sx={{marginLeft:'30px'}} color='success' size='large' variant='contained' onClick={(e)=>handleCompletarPedido(cliente)}><CheckCircleIcon fontSize='large'/></IconButton>
                </Tooltip>
              </AccordionActions>
              : ''}
              
              </div>
            </Accordion>
            
          </div>
        ))
           }
           </> )
            : 
          <h1 style={{ textAlign: "center" }}>No hay pedidos pendientes</h1>}
   </>
   
  )
}
