import React from 'react';
import { useCart, useDispatchCart } from '../context/ContextReducer';
import trash from "../trash.svg";

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    console.log(data)

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
            </div>
        );
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");

        let response = await fetch("http://localhost:5000/api/orderData", {
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
            dispatch({ type: "DROP" })
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
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
                                        style={{
                                            height: "50px",
                                            width: "50px",
                                            objectFit: "cover",
                                            borderRadius: "6px"
                                        }}
                                    />
                                </td>

                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>₹{food.price}</td>

                                <td>
                                    <button
                                        type="button"
                                        className="btn p-0"
                                        onClick={() => dispatch({ type: "REMOVE", index: index })}
                                    >
                                        <img
                                            src={trash}
                                            alt="delete"
                                            style={{
                                                height: '24px',
                                                filter: 'brightness(0) invert(1)'
                                            }}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-3">
                    <h2>Total Price: ₹{totalPrice}/-</h2>
                </div>

                <button
                    className='btn bg-success mt-3'
                    onClick={handleCheckOut}
                >
                    Check Out
                </button>
            </div>
        </div>
    );
}