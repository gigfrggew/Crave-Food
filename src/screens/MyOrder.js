import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([])

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            console.log('Fetched order data:', response)
            setOrderData(response)
        })
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>
                    {orderData && orderData.orderData && orderData.orderData.order_data ? 
                        orderData.orderData.order_data.slice(0).reverse().map((orderGroup, groupIndex) => {
                            return (
                                <div key={groupIndex} className='row'>
                                    {orderGroup.map((item, itemIndex) => {
                                        // Check if this is a date entry
                                        if (item.Order_date) {
                                            return (
                                                <div key={itemIndex} className='m-auto mt-5'>
                                                    <div className='text-center'>
                                                        <h4>{item.Order_date}</h4>
                                                        <hr />
                                                    </div>
                                                </div>
                                            )
                                        } 
                                        // Check if item is an array (contains multiple items)
                                        else if (Array.isArray(item)) {
                                            return item.map((arrayData, arrayIndex) => {
                                                if (arrayData.Order_date) {
                                                    return (
                                                        <div key={arrayIndex} className='m-auto mt-5'>
                                                            <div className='text-center'>
                                                                <h4>{arrayData.Order_date}</h4>
                                                                <hr />
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={arrayIndex} className='col-12 col-md-6 col-lg-3'>
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img 
                                                                    src={arrayData.img} 
                                                                    className="card-img-top" 
                                                                    alt={arrayData.name || "Food item"} 
                                                                    style={{ height: "120px", objectFit: "cover" }} 
                                                                    onError={(e) => {
                                                                        e.target.src = 'https://via.placeholder.com/256x120?text=No+Image'
                                                                    }}
                                                                />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>Qty: {arrayData.qty}</span>
                                                                        <span className='m-1'>Size: {arrayData.size}</span>
                                                                        <div className='d-inline ms-2 h-100 fs-5'>
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        // If item is a single object
                                        else {
                                            return (
                                                <div key={itemIndex} className='col-12 col-md-6 col-lg-3'>
                                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                        <img 
                                                            src={item.img} 
                                                            className="card-img-top" 
                                                            alt={item.name || "Food item"} 
                                                            style={{ height: "120px", objectFit: "cover" }} 
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/256x120?text=No+Image'
                                                            }}
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.name}</h5>
                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                <span className='m-1'>Qty: {item.qty}</span>
                                                                <span className='m-1'>Size: {item.size}</span>
                                                                <div className='d-inline ms-2 h-100 fs-5'>
                                                                    ₹{item.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            )
                        })
                        : 
                        <div className='text-center mt-5'>
                            <h3>No orders found</h3>
                        </div>
                    }
                </div>
            </div>

            <Footer />
        </div>
    )
}