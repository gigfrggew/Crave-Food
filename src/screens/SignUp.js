import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {

    const [credentials, setcredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/creatuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation
            })
        });

        const json = await response.json();
        console.log("Signup Response:", json);

        // If backend returns success:false
        if (!json.success) {
            if (json.errors) {
                alert(json.errors[0].msg);  // Show first validation error
            } else if (json.error) {
                alert(json.error);
            } else {
                alert("Signup failed");
            }
            return;
        }

        // If signup successful
        alert("Signup successful! Please log in.");
    };

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    };

    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={credentials.name}
                            onChange={onChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={credentials.email}
                            onChange={onChange}
                            id="exampleInputEmail1"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={credentials.password}
                            onChange={onChange}
                            id="exampleInputPassword1"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputAddress" className="form-label">Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="geolocation"
                            value={credentials.geolocation}
                            onChange={onChange}
                            id="exampleInputAddress"
                            required
                        />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">
                        Submit
                    </button>

                    <Link to="/login" className="m-3 btn btn-danger">
                        Already a user
                    </Link>
                </form>
            </div>
        </>
    );
}
