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
  <div style={{display:'flex',flexWrap:'wrap', marginBottom:"5%"}}>
  {products.map((product) => (
    <div key={product._id} style={{ display:'flex',margin:'10px',boxShadow:'4px 2px 15px black',borderRadius:'10px'}}>
      <Card sx={{ width: 200, textAlign:'end'}}>
      <CardMedia
        sx={{ height: 70, width:70, margin:'auto',marginTop:1}}
        image={product.url}
        title={product.name}
       
      />
      <CardContent sx={{padding:2}}>
        <Typography sx={{textAlign:'center', margin:0, padding:0}} gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="h5" color="text.primary">
          <div style={{display:'block'}}>
            <h5 style={{ margin:1, textAlign:'center'}}>{product.modalidadVenta}</h5>   
            <h5 style={{ margin:1, textAlign:'center'}}>$ {new Intl.NumberFormat().format(product.precio)}</h5>
          </div>
        </Typography>
      </CardContent>
      {cart.find((cartItem) => cartItem.product._id ===  product._id) === undefined ?
        <Tooltip fontSize='small' title="Agregar al carrito" arrow>

        <Button onClick={() => addToCart(product)} sx={{textAlign:'start'}} size="small">
        
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