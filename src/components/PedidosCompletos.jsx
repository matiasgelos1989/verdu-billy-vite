import React from 'react';
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';

// const label = { inputProps: { 'aria-label': 'Switch demo' } };

export const PedidosCompletos = ({clickDelete,pedidosCompletos}) => {
// const [open, setOpen] = useState(false);

const handleDelete =  (cliente) => {
     clickDelete(cliente);
}

  return (<>
  {pedidosCompletos.length > 0 ? ( <> 
  {pedidosCompletos.map((cliente) => (
          <div
            style={{
              display: "flex",
              margin: 10,
              padding: 5,
              border: "1px solid black",
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
                {cliente.pedido.map((detalle) => (
                  <div key={detalle._id} style={{ display: "flex", margin: 5 }}>
                    <ul style={{margin:0}}>
                      <li key={detalle._id}> {`${detalle.product.name} ${detalle.product.modalidadVenta} ${new Intl.NumberFormat().format(detalle.product.precio)} - cantidad: ${detalle.quantity} `}</li>
                    </ul>
                  </div>
                ))}
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
              </div>
            </Accordion>
            
          </div>
        ))
              }  </> )
              : 
              <h1 style={{ textAlign: "center" }}>No hay pedidos completos</h1>}
  </>
   
  )
}
