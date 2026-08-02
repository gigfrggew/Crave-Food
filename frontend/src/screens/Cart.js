import React from 'react';
import { useCart, useDispatchCart } from '../context/ContextReducer';
import trash from "../trash.svg";
import { toast } from 'react-toastify';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    console.log(data)

    if (data.length === 0) {
        return (
            <div className="empty-cart"><strong>Your cart is waiting.</strong>Add something delicious from the menu to get started.</div>
        );
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");

        try {
            let response = await fetch("https://crave-food-backend.onrender.com/api/orderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString()
                })
            });

            if (response.status === 200) {
                dispatch({ type: "DROP" });
                toast.success("Order placed successfully.", { toastId: 'order-success' });
            } else {
                toast.error("Failed to place order.", { toastId: 'order-error' });
            }
        } catch (error) {
            toast.error("Failed to place order.", { toastId: 'order-error' });
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className='cart-wrap'>
                <div className="table-responsive"><table className='table cart-table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Option</th>
                            <th>Amount</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>

                                {/* ✅ Image Cell */}
                                <td>
                                    <img
                                        src={food.img}
                                        alt={food.name}
                                        className="cart-image"
                                    />
                                </td>

                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>₹{food.price}</td>

                                <td>
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={() => {
                                            dispatch({ type: "REMOVE", index: index });
                                            toast.info("Item removed from cart.", { toastId: 'cart-removed' });
                                        }}
                                    >
                                        <img
                                            src={trash}
                                            alt="delete"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table></div>

                <div className="cart-total"><h2>Total <span>₹{totalPrice}/-</span></h2>

                <button
                    className='checkout-btn'
                    onClick={handleCheckOut}
                >
                    Order
                </button>
                </div>
            </div>
        </div>
    );
}
