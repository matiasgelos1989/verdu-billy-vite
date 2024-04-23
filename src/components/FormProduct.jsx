import { useEffect, useState } from 'react';
import { TextField, Box, Button } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createProduct, updateProduct } from '../api/products.api';


function FormProduct(props) {
   
    const [product, setProduct] = useState({
        name: '',
        precio: '',
        modalidadVenta: '',
        url: '',
    });
   

    useEffect(() => {
      setProduct(props.product)
    }, [props.product])
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(product._id !== undefined) {
            updateProduct(product._id, product).then((response) => {
                if(response.data) {
                    props.handleClose();
                    props.fetchData();
                }
            }).catch((error) => {
                alert(error);
                console.log(error)
               props.handleClose();
            });
        }else {
        createProduct(product).then((response) => {
            if (response.data) {
               props.handleClose()
                props.fetchData()
            }
        }).catch((error) => {
            alert(error);
           props.handleClose()
        });}

    };

    return (
        <Box>
            <div style={{margin:'20px'}}>
            <Button variant="outlined" onClick={props.handleClickOpen}>
                Nuevo Producto
            </Button>
            </div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
            >
                <form onSubmit={handleSubmit}>

                    <DialogTitle id="alert-dialog-title">
                        {"Crear nuevo Producto"}
                    </DialogTitle>
                    <DialogContent>

                        <TextField fullWidth
                            label="Nombre"
                            margin="normal"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                        <TextField fullWidth
                            label="precio"
                            margin="normal"
                            name="precio"
                            value={product.precio}
                            onChange={handleChange}
                            required
                            type={'Number'}
                        />
                        <TextField fullWidth
                            label="modalidadVenta"
                            margin="normal"
                            name="modalidadVenta"
                            value={product.modalidadVenta}
                            onChange={handleChange}
                            required

                        />
                        <TextField fullWidth
                            label="imagen"
                            margin="normal"
                            name="url"
                            value={product.url}
                            onChange={handleChange}
                            required 
                            />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.handleClose}>Cancelar</Button>
                        <Button type='submit' autoFocus onClick={handleSubmit}>
                            Guardar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </Box>
    )
}
export default FormProduct;
