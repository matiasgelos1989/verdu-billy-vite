import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import {Box} from "@mui/material/";
import Paper from "@mui/material/Paper";
import { Counter } from "../components/Counter";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {  useNavigate } from "react-router-dom";
import {  TableRow, Table, Avatar, TableBody, TableCell, TableHead, TableContainer } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {createPedido} from '../api/pedidos.api';
import { TextField } from "@mui/material";
import logo from '../assets/logo.jpg'

export const Cart = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
  };

  const { setShowCart, setCart, cart, removeFromCart } = useCart();
  const total = calculateTotalPrice(cart);
  
  const navigate = useNavigate();
  
  function calculateTotalPrice(cart) {
    let total = 0;
    for (const item of cart) {
      total += item.product.precio * item.quantity;
    }
    return total;
  };
  
  const [open, setOpen] = useState(false);
  const [openDatosCliente, setOpenDatoscliente] = useState(false);
  const [pedido,setPedido] = useState({});
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedido({
        ...pedido,
        [name]: value,
    });
};


  const handleOpen = () => {
    setOpen(true);
    
  };

  const handleSubmitOne = (e) => {
    e.preventDefault();
    
    // console.log(pedido);
    createPedido(pedido);
   
    setOpenDatoscliente(false);
    handleOpen();
    
    // console.log(pedido)
  }

  const handleOpenOne = () => {
    setPedido({
      pedido: cart,
      precioTotal: total,
      complete: false})
    setOpenDatoscliente(true);
  }

  const handleCloseOne = () => {
    setOpenDatoscliente(false);
  }

  const handleClose = () => {
    setPedido({
      name: '',
      phone: '',
      address: '',
    });
    setOpen(false);
    setShowCart(false);
    setCart([]);
    navigate("/");
    
  };

  return (
    <div style={{textAlign:'center', display:'flex', flexDirection:'column'}} >
      {cart.length > 0 ? (
        <div 
        style={{ padding:'10px' }}
        >
          <div
            style={{ display: "block", paddingBottom: "20px", textAlign: "center" }}
          >
            <div
              style={{
                backgroundColor: "lightgreen",
                display:'flex',
                position: "sticky",
                top: 0,
                zIndex: 98,
                border: "1px solid lightgrey",
                borderRadius: "10px 10px 0 0",
                marginBottom: "0px",
                // boxShadow: "1px 1px 5px 1px grey",
                color: "black",
                fontFamily: "monospace",
                justifyContent:'center'
              }}
            >
              <h1 style={{margin:'18px'}}>Tu Pedido</h1>
              
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ }} aria-label="simple table">
                  <TableHead >
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell sx={{textAlign:'start'}}>Nombre</TableCell>
                      <TableCell >Cantidad</TableCell>
                      <TableCell sx={{ fontWeight: "500", textAlign:'center' }} >Total x unidad</TableCell>
                      <TableCell ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.map((cartItem) => (
                    
                      <TableRow
                        key={cartItem._id}
                        sx={{padding:0,
                          "&:last-child td, &:last-child th": { border: 0 },
                          lineHeight:'100px'
                        }}
                      >
                        <TableCell sx={{padding:0}}>
                          {" "}
                          <Avatar alt="Product Image" src={cartItem.product.url} sx={{width:'50px'}} />
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "400",padding:0 }}
                          component="th"
                          scope="cartItem"
                        >
                          {cartItem.product.name} x {cartItem.product.modalidadVenta}
                        </TableCell>
                        <TableCell sx={{padding:0}} ><Counter cartItem={cartItem} /></TableCell>
                        <TableCell sx={{padding:0, fontWeight: "800" }} align="center">$ {new Intl.NumberFormat().format(cartItem.quantity * cartItem.product.precio)}</TableCell>
                        {/* {console.log(cartItem.quantity)} */}
                        <TableCell sx={{padding:0}} align="left">
                        <IconButton
                           color="error"
                           aria-label="Delete"
                           size='large'
                           onClick={() => removeFromCart(cartItem)}
                       >
                           <DeleteIcon fontSize='normal' />
                       </IconButton>
                       </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            
            <div
              style={{
                // backgroundColor: "lightgreen",
                // position: "sticky",
                // bottom: 32,
                // zIndex: 99,
                display: "flex",
                flexDirection:'column',
                textAlign:'center',
                // border: "1px solid lightgrey",
                borderRadius: "0 0 10px 10px",
                }}
            >
              <div 
              style={{display:'flex', margin:'auto', flexDirection:'row'}}
              >
                <p
                  style={{
                    // marginLeft: "10px",
                    fontFamily: "sans-serif",
                    // marginRight: "50px",
                    fontSize: "16px",
                    fontWeight: "800",
                  }}
                >
                  Total de la compra
                </p>
                <p
                  style={{
                    fontFamily: "sans-serif",
                    padding: '2px',
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "black",
                    alignContent:'center',     
                    backgroundColor:'lightgrey'                
                    }}
                >
                  ${ new Intl.NumberFormat().format(total) }
                </p>
                <div style={{ padding: "8px", justifyContent:'center',justifyItems:'center',display:'flex', flexDirection:'column' }}>
                  <Button
                    variant="contained"
                    // sx={{ height: "80%", marginLeft: "20px" }}
                    onClick={handleOpenOne}
                  >
                    Continuar
                  </Button>
                  
                  <Dialog
                open={openDatosCliente}
                onClose={handleCloseOne}
            >
                <form onSubmit={handleSubmitOne}>

                    <DialogTitle id="alert-dialog-title">
                        {"Datos para finalizar pedido"}
                    </DialogTitle>
                    <DialogContent>

                        <TextField fullWidth
                            label="nombre"
                            margin="normal"
                            name="name"
                            value={pedido.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField fullWidth
                            label="telefono"
                            margin="normal"
                            name="phone"
                            value={pedido.phone}
                            onChange={handleChange}
                            required
                            type={'Number'}
                            inputProps={{minLength: 10, maxLength: 10}}
                        />
                         <TextField fullWidth
                            label="dirección"
                            margin="normal"
                            name="address"
                            value={pedido.address}
                            onChange={handleChange}
                            required
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseOne}>Cancelar</Button>
                        <Button type='submit' autoFocus>
                            Enviar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>


                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <DialogContent>
                      <div style={{textAlign:'center', fontFamily:'sans-serif'}}>
                    <img src={logo} alt="logo" style={{width:'100px', height:'100px'}}/>
                    <h3 >Gracias por elegirnos !!</h3>
                    </div>
                      <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h2"                    
                      >
                        Tu pedido ha sido creado con éxito
                        <CheckCircleIcon
                          fontSize="small"
                          color="success"
                        ></CheckCircleIcon>
                      </Typography>
                      <Typography id="modal-modal-description" sx={{ mt: 6 }}>
                        te contactaremos via WhatsApp para confirmar pedido
                      </Typography>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
                <hr />
                <p style={{margin:0, fontWeight:"bold"}}>El precio es aproximado ya que puede que algunos productos no den el peso exacto</p>
            </div>
          </div>
        </div>
      ) : (
        <div style={{textAlign:'center',padding:20, margin:10, border:'1px solid black', boxShadow:'1px 1px 1px 1px'}}>
          <h3>El carrito está vacío</h3>
        </div>
      )}
    </div>
  );
};

// <div style={{alignItems:'center'}} key={cartItem._id}>
// <Box key={cartItem._id} sx={{ width: '100%',margin:'5px' }}>
//   <Stack spacing={1}>
//     <Item  sx={{ display:'flex'}}>
//       <div style={{width:'400px', display:'flex'}}>
//       <img alt={cartItem.product.name} src={cartItem.product.url} style={{width:30,height:30}}/>
//       <p style={{margin:'0 50px ', fontWeight:'800'}}>{cartItem.product.name}</p>
//       <p style={{margin:'5px 0', fontWeight:'800'}}>{cartItem.product.modalidadVenta}</p>
//       <p style={{width:'50px',margin:'5px', fontWeight:'800'}}>${cartItem.product.precio}</p>
//       </div>

//      <Counter cartItem={cartItem}></Counter>

//       <p style={{fontWeight:'800',width:'100px'}}>$ {cartItem.product.precio * cartItem.quantity}</p>

//       <IconButton
//           color="error"
//           aria-label="Delete"
//           size='large'
//           onClick={() => removeFromCart(cartItem)}
//       >
//           <DeleteIcon fontSize='large' />
//       </IconButton>
//     </Item>

//   </Stack>
// </Box>
/* </div> */
