import React, { useState } from 'react' // Import useState
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from './Modal' // Assuming Modal is in src/Modal.js
import Cart from '../screens/Cart' // Assuming Cart is in src/screens/Cart.js
import { useCart } from '../context/ContextReducer' // Import useCart to get item count

export default function Navbar() {
    const [cartView, setCartView] = useState(false) // 1. State to manage modal visibility
    const navigate = useNavigate();
    let data = useCart(); // Get cart data for badge count

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid px-4">
                    <Link className="navbar-brand logo" to="/">🍽️ CraveFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link nav-item-custom" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link nav-item-custom" to="/myOrder">My Orders</Link>
                                </li>
                                : ""
                            }
                        </ul>
                        {(!localStorage.getItem("authToken")) ?
                            <div className="nav-actions">
                                <Link className="nav-btn login-btn" to="/login">Login</Link>
                                <Link className="nav-btn signup-btn" to="/signup">Sign Up</Link>
                            </div>
                            :
                            <div className="nav-actions">
                                {/* My Cart Button: Opens the modal */}
                                <div className="nav-btn cart-btn" onClick={() => { setCartView(true) }} >
                                    My Cart{" "}
                                    {/* Display badge with item count */}
                                    {data.length > 0 && <Badge pill bg="danger">{data.length}</Badge>}
                                </div>

                                {/* Conditional Rendering: Show Modal if cartView is true */}
                                {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}

                                <div className="nav-btn logout-btn" onClick={handleLogout}>
                                    Logout
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
