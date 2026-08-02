import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([])

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("https://crave-food-backend.onrender.com/api/myOrderData", {
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
        <div className="orders-page">
            <div>
                <Navbar />
            </div>

            <main className='container orders-content'>
                <div className="section-heading"><div><p className="section-kicker">Order history</p><h1 className="category-title">Your past favourites</h1></div></div>
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
                                                    <div className='order-date'>
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
                                                        <div className='order-date'>
                                                                <h4>{arrayData.Order_date}</h4>
                                                                <hr />
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={arrayIndex} className='col-12 col-md-6 col-lg-3'>
                                                            <div className="card order-card mt-3">
                                                                <img 
                                                                    src={arrayData.img} 
                                                                    className="card-img-top" 
                                                                    alt={arrayData.name || "Food item"} 
                                                                    onError={(e) => {
                                                                        e.target.src = 'https://via.placeholder.com/256x120?text=No+Image'
                                                                    }}
                                                                />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='order-meta'>
                                                                        <span>Qty: {arrayData.qty}</span><span>•</span><span>{arrayData.size}</span>
                                                                    </div>
                                                                    <div className='order-price'>₹{arrayData.price}/-</div>
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
                                                    <div className="card order-card mt-3">
                                                        <img 
                                                            src={item.img} 
                                                            className="card-img-top" 
                                                            alt={item.name || "Food item"} 
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/256x120?text=No+Image'
                                                            }}
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.name}</h5>
                                                            <div className='order-meta'>
                                                                <span>Qty: {item.qty}</span><span>•</span><span>{item.size}</span>
                                                            </div>
                                                            <div className='order-price'>₹{item.price}/-</div>
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
            </main>

            <Footer />
        </div>
    )
}
