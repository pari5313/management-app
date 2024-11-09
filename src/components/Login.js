import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SIgn_img from './SIgn_img';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const history = useNavigate();

    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    });

    const getdata = (e) => {
        const { value, name } = e.target;
        setInpval((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const addData = (e) => {
        e.preventDefault();

        const getuserArr = localStorage.getItem("useryoutube");

        const { email, password } = inpval;

        if (email === "") {
            toast.error('Email field is required', { position: "top-center" });
        } else if (!email.includes("@")) {
            toast.error('Please enter a valid email address', { position: "top-center" });
        } else if (password === "") {
            toast.error('Password field is required', { position: "top-center" });
        } else if (password.length < 5) {
            toast.error('Password should be longer than five characters', { position: "top-center" });
        } else {
            if (getuserArr) {
                const userdata = JSON.parse(getuserArr);
                const userlogin = userdata.filter((el) => el.email === email && el.password === password);

                if (userlogin.length === 0) {
                    toast.error("Invalid email or password", { position: "top-center" });
                } else {
                    localStorage.setItem("user_login", JSON.stringify(userlogin));
                    localStorage.setItem("isLoggedIn", "true"); 
                    toast.success("Login successful!", { position: "top-center" });
                    history("/details");
                    window.location.reload(); 
                }
            } else {
                toast.error("No registered users found. Please sign up.", { position: "top-center" });
            }
        }
    };

    return (
        <>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Sign IN</h3>
                        <Form onSubmit={addData}>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" required />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" required />
                            </Form.Group>
                            
                            <Button variant="primary" className='col-lg-6' style={{ background: "rgb(67, 185, 127)" }} type="submit">
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3'>
                            Do not Have an Account? 
                            <span><NavLink to="/">Sign In</NavLink></span>
                        </p>
                    </div>
                    <SIgn_img />
                </section>
                <ToastContainer />
            </div>
        </>
    );
};

export default Login;
