import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function SignUp() {

    const [credentials, setcredentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://crave-food-backend.onrender.com/api/creatuser", {
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
                toast.error(json.errors[0].msg, { toastId: 'signup-error' });
            } else if (json.error) {
                toast.error(json.error, { toastId: 'signup-error' });
            } else {
                toast.error("Unable to create account.", { toastId: 'signup-error' });
            }
            return;
        }

        // If signup successful
        toast.success("Account created successfully.", { toastId: 'signup-success' });
    };

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    };

    return (
        <>
            <main className="auth-page">
                <form className="auth-card" onSubmit={handleSubmit}>
                    <div className="auth-kicker">Start ordering</div>
                    <h1 className="auth-title">Create your account</h1>
                    <p className="auth-copy">A few details and your next favourite meal is close by.</p>
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

                    <button type="submit" className="btn btn-success auth-submit">
                        Create account
                    </button>

                    <p className="mb-0 text-center text-muted">Already have an account? <Link to="/login" className="auth-link">Sign in</Link></p>
                </form>
            </main>
        </>
    );
}
