import React from 'react';
import { useCart } from '../context/CartContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import Tooltip from '@mui/material/Tooltip';

export const Feed =  ( { products }) => {
  
  const { addToCart,cart } = useCart();


  return (<>
  <div style={{ display:'flex',flexWrap:'wrap', justifyContent:'center'}}>
  {products.map((product) => (
    <div key={product._id} style={{minWidth:'140px' , maxWidth:'max-content', margin:'6px',boxShadow:'4px 2px 19px black'}}>
      <Card sx={{textAlign:'center'}}>
      <CardMedia
        sx={{ height: 40, width:40, margin:'auto',marginTop:1}}
        image={product.url}
        title={product.name}
       
      />
      <CardContent sx={{padding:1}}>
        <Typography sx={{textAlign:'center', margin:0, padding:0}} gutterBottom variant="p" component="div">
          {product.name}
        </Typography>
        <Typography variant="p" color="text.primary">
          <div style={{display:'block'}}>
            <h5 style={{ margin:1, textAlign:'center'}}>{product.modalidadVenta}</h5>   
            <h5 style={{ margin:1, textAlign:'center'}}>$ {new Intl.NumberFormat().format(product.precio)}</h5>
          </div>
        </Typography>
      </CardContent>
      {cart.find((cartItem) => cartItem.product._id ===  product._id) === undefined ?
        <Tooltip fontSize='small' title="Agregar al carrito" arrow>

        <Button onClick={() => addToCart(product)}  size="small">
        
          <AddShoppingCartSharpIcon     fontSize='large'>
      
          </AddShoppingCartSharpIcon>

        </Button>
        </Tooltip>
 : <div style={{textAlign:'center',marginBottom:'5px'}}><Button sx={{alignContent:'center'}} variant='outlined' disabled>Agregado</Button></div>
} 
    </Card>
    </div>



  ))}

</div>
  </>
  )
}
