import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SIgn_img from './SIgn_img';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const history = useNavigate();

    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        date: "",
        password: "",
        profilePicture: null 
    });

    const [data, setData] = useState([]);

    const getdata = (e) => {
        const { value, name } = e.target;
        setInpval((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setInpval((prevState) => ({
                    ...prevState,
                    profilePicture: reader.result 
                }));
            };
            reader.readAsDataURL(file); 
        }
    };

    const addData = (e) => {
        e.preventDefault();
        const { name, email, date, password, profilePicture } = inpval;

        if (name === "") {
            toast.error('Name field is required!', { position: "top-center" });
        } else if (email === "") {
            toast.error('Email field is required', { position: "top-center" });
        } else if (!email.includes("@")) {
            toast.error('Please enter a valid email address', { position: "top-center" });
        } else if (date === "") {
            toast.error('Date field is required', { position: "top-center" });
        } else if (password === "") {
            toast.error('Password field is required', { position: "top-center" });
        } else if (password.length < 5) {
            toast.error('Password must be at least 5 characters', { position: "top-center" });
        } else {
           
            setData([...data, inpval]); 
            localStorage.setItem("useryoutube", JSON.stringify([...data, inpval])); 
            toast.success("Data added successfully!", { position: "top-center" });
            history("/login"); 
        }
    };

    return (
        <>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Register</h3>
                        <Form>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control type="text" name='name' onChange={getdata} placeholder="Enter Your Name" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control onChange={getdata} name='date' type="date" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                                <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
                            </Form.Group>
                            
                          
                            <Form.Group className="mb-3 col-lg-6" controlId="formProfilePicture">
                                <Form.Label style={{ fontWeight: 'bold', color: '#6c757d' }}>Edit Profile Picture</Form.Label> {/* Bold and greyish text */}
                                <Form.Control 
                                    type="file" 
                                    onChange={handleProfilePicChange} 
                                    accept="image/*"
                                />
                                {inpval.profilePicture && (
                                    <div 
                                        style={{
                                            width: '80px', 
                                            height: '80px', 
                                            borderRadius: '50%',  
                                            backgroundColor: '#d3d3d3', 
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            overflow: 'hidden',
                                            marginTop: '10px',
                                            cursor: 'pointer', 
                                            border: '2px solid #ccc', 
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                                            transition: 'all 0.3s ease', 
                                        }}
                                        onClick={() => document.getElementById('profilePicInput').click()} 
                                    >
                                        <img 
                                            src={inpval.profilePicture} 
                                            alt="Profile Preview" 
                                            style={{ 
                                                width: '100%', 
                                                height: '100%', 
                                                objectFit: 'cover',
                                            }} 
                                        />
                                    </div>
                                )}
                            </Form.Group>

                            <Button 
                                variant="primary" 
                                className='col-lg-6' 
                                onClick={addData} 
                                style={{ background: "rgb(67, 185, 127)" }}
                            >
                                Submit
                            </Button>
                        </Form>
                        <p className='mt-3'>
                            Already Have an Account? 
                            <span><NavLink to="/Login">Sign In</NavLink></span>
                        </p>
                    </div>
                    <SIgn_img />
                </section>
                <ToastContainer />
            </div>
        </>
    );
}

export default Home;
