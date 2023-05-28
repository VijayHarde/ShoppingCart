import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CartDataContext from '../context/cardDataContext';

export default function ListItems({
  productName = '',
  description = '',
  path = '',
  price = '',
  index,
  count
}) {

  const context = React.useContext(CartDataContext);
  const removeProduct = () => {
    context.removeProduct(index, price);
    let productPrice = price * count;
    context.setTotal(context.total - productPrice);
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>

      <ListItem alignItems="flex-start">

        <ListItemAvatar>
          <Avatar alt="Image" src={require('../assets/' + path)} />
        </ListItemAvatar>
        <ListItemText
          primary={productName}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {description}
              </Typography><br />
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Price :-
              </Typography>
              {price}<br />

              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Quantity :- {count}
              </Typography>
            </React.Fragment>
          }
        />

        <IconButton onClick={removeProduct} edge="end" aria-label="delete">
          <RemoveShoppingCartIcon />
        </IconButton>

      </ListItem>

      <Divider variant="inset" component="li" />
    </List>
  );
}