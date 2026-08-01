import './App.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/SignUp';
import { CartProvider } from './context/ContextReducer';
import MyOrder from './screens/MyOrder.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import MyOrder from './screens/MyOrder';


function App() {
  return (
    <CartProvider>
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            {/* <Route exact path="/myorder" element={<MyOrder />} /> */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
