import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartDataContext from '../context/cardDataContext';
import { useNavigate } from 'react-router-dom';
import { productList } from '../pages/home/helper/product-helper';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
// { callback}
export default function AppHeader() {

  const navigate = useNavigate();

  const context = React.useContext(CartDataContext);

  const navigateToCartItems = () => {
    navigate('/cartitems');
  }

  /**
  * Handling the logic for serach functionality
  * @param {*} event 
  */
  const handleSearch = (event) => {
    if(context.filtertype == 'home') {
      let filteredData = productList.filter((ele) => ele.title.toLocaleLowerCase().startsWith(event.target.value.toLocaleLowerCase()));
      context.setProducts(filteredData);
    }else if(context.filtertype == 'card') {
      let filteredData = context.cartData.filter((ele) => ele.title.toLocaleLowerCase().startsWith(event.target.value.toLocaleLowerCase()));
      context.setFilterCartData(filteredData);
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          {/* App Title */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Shopping Cart
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              onChange={handleSearch}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}

            />
          </Search>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { md: 'flex' } }}>

            {/* Nitification Icon */}
            <span onClick={navigateToCartItems}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={context.cartData.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </span>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
