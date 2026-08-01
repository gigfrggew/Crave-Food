import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from '../context/ContextReducer'
import { toast } from 'react-toastify';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options)
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const handleAddToCart = async () => {
        let existingItem = data.find(item => item.id === props.foodItem._id);
        if (existingItem) {
            if (existingItem.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty, size: size });
                toast.success("Added to cart successfully.", { toastId: 'cart-added' });
                return;
            }
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img });
            toast.success("Added to cart successfully.", { toastId: 'cart-added' });
            return;
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img });
        toast.success("Added to cart successfully.", { toastId: 'cart-added' });
    };
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => { setSize(priceRef.current.value) }, [])
    return (
        <article className="card food-card">
            <img src={props.foodItem.img} className="food-card-image" alt={props.foodItem.name} />
            <div className="card-body">
                <h5 className="food-card-title">{props.foodItem.name}</h5>
                <div className="food-controls">
                    <select className="food-select" aria-label="Quantity" onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => <option key={i + 1} value={i + 1}>Qty: {i + 1}</option>)}
                    </select>
                    <select className="food-select" aria-label="Size" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {priceOptions.map((data) => <option key={data} value={data}>{data}</option>)}
                    </select>
                </div>
                <div className="food-price"><small>Total</small><span>₹{finalPrice}</span></div>
                <button className="add-cart-btn" onClick={handleAddToCart}>Add to cart</button>
            </div>
        </article>
    )
}
