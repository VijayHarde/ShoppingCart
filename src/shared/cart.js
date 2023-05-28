import React, { useContext, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CartDataContext from "../context/cardDataContext";
import Snackbar from '@mui/material/Snackbar';
import { Alert } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Product({
  id,
  path = '',
  title = '',
  description = "",
  price = '',
  quantity
}) {

  const context = useContext(CartDataContext);
  const [openToast, setOpenToast] = useState(false);
  const [count, setCount] = useState(0)

  const addToCard = async () => {
    setCount(1);
    const item = {
      id: id,
      title: title,
      description: description,
      path: path,
      quantity: count,
      price: price,
      count:1
    }
    await context.updateState(item);
    setOpenToast(true);
  }

  const closeToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  const addQuantity = () => {
    setCount(count + 1);
    const item = {
      id: id,
      title: title,
      description: description,
      path: path,
      quantity: quantity,
      price: price,
      count:count+1
    }
    context.updateQuantity(item);
  }

  const removeQuantity = () => {
    if (count > 0) {
      setCount(count - 1);
      const item = {
        id: id,
        title: title,
        description: description,
        path: path,
        quantity: quantity,
        price: price,
        count:count-1
      }
      context.updateQuantity(item);
    }
  }

  return (

    <>

      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={closeToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={closeToast} severity="success" sx={{ width: '100%' }}>
          Product Added To Card
        </Alert>
      </Snackbar>

      <Card style={{ height: '100%' }} sx={{ maxWidth: 250 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={require('../assets/' + path)}
            alt="Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>

            <Typography style={{ borderTop: '1px solid black' }} variant="body2" color="text.secondary">
              <span><b>Price :-</b></span> {price}
            </Typography>
            {
              count > 0 ? (
                <Typography style={{ borderTop: '1px solid black' }} variant="body2" color="text.secondary">
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>

                    <IconButton onClick={removeQuantity} edge="end" aria-label="delete">
                      <RemoveIcon />
                    </IconButton>

                    <h5>{count}</h5>

                    <IconButton onClick={addQuantity} edge="end" aria-label="delete">
                      <AddIcon />
                    </IconButton>
                  </div>
                </Typography>

              ) : (

                <Typography style={{ borderTop: '1px solid black' }} variant="body2" color="text.secondary">
                  <button onClick={() => addToCard()} className="cartBtn">Add To Cart</button>
                </Typography>
              )
            }


          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
