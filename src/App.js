import './App.css';
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import Home from './pages/home/home-page'
import CartItems from './pages/card-items/card-items.page';
import AppHeader from './shared/Menu';

function App() {
  return (
    <>

      <BrowserRouter>
        <AppHeader />
        <Routes>
          {/* Default Routes */}
          <Route path="/" element={<Home />}>
          </Route>

          {/* Route for home page */}
          <Route path="/home" element={<Home />}>
          </Route>
          {/* Route for Cart Items */}

          <Route path="/cartitems" element={<CartItems />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
