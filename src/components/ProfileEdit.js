import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProfileEdit.css';  

const ProfileEdit = () => {
    const history = useNavigate();

    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        password: "",
        dob: "",
        photo: null,
    });

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user_login"));
        if (userData && userData.length > 0) {
            setInpval({
                name: userData[0].name,
                email: userData[0].email,
                password: userData[0].password,
                dob: userData[0].dob,
                photo: userData[0].photo,
            });
        }
    }, []);

    const getdata = (e) => {
        const { value, name } = e.target;
        setInpval((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    };

    const handlePhotoChange = (e) => {
        setInpval((prevData) => ({
            ...prevData,
            photo: e.target.files[0],
        }));
    };

    const updateProfile = (e) => {
        e.preventDefault();

        const { name, email, password, dob, photo } = inpval;
        if (name === "") {
            toast.error('Name field is required', {
                position: "top-center",
            });
        } else if (email === "") {
            toast.error('Email field is required', {
                position: "top-center",
            });
        } else if (!email.includes("@")) {
            toast.error('Please enter a valid email address', {
                position: "top-center",
            });
        } else if (password === "") {
            toast.error('Password field is required', {
                position: "top-center",
            });
        } else if (password.length < 5) {
            toast.error('Password length should be greater than five', {
                position: "top-center",
            });
        } else if (dob === "") {
            toast.error('Date of Birth is required', {
                position: "top-center",
            });
        } else {
            const photoUrl = photo ? URL.createObjectURL(photo) : null;
          
            localStorage.setItem("user_login", JSON.stringify([{ name, email, password, dob, photo: photoUrl }]));

            toast.success('Profile updated successfully!', {
                position: "top-center",
            });

           
            alert("We are updating the profile! Please refresh the page to see the changes.");

            
            history("/details");
        }
    };

    return (
        <>
            <div className="container mt-3">
                <section className='d-flex justify-content-between'>
                    <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
                        <h3 className='text-center col-lg-6'>Edit Profile</h3>
                        <Form>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicName">
                                <Form.Control 
                                    type="text" 
                                    name="name" 
                                    onChange={getdata} 
                                    value={inpval.name} 
                                    placeholder="Enter your name" 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control 
                                    type="email" 
                                    name="email" 
                                    onChange={getdata} 
                                    value={inpval.email} 
                                    placeholder="Enter email" 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                                <Form.Control 
                                    type="password" 
                                    name="password" 
                                    onChange={getdata} 
                                    value={inpval.password} 
                                    placeholder="Password" 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicDOB">
                                <Form.Control 
                                    type="date" 
                                    name="dob" 
                                    onChange={getdata} 
                                    value={inpval.dob} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPhoto">
                                <Form.Label>Upload Photo</Form.Label>
                                <div className="photo-upload">
                                    <input 
                                        type="file" 
                                        name="photo" 
                                        onChange={handlePhotoChange} 
                                        id="file" 
                                    />
                                    <label htmlFor="file" className="upload-circle">
                                        {inpval.photo ? (
                                            <img src={URL.createObjectURL(inpval.photo)} alt="Profile" className="profile-photo" />
                                        ) : (
                                            <span className="upload-icon">+</span>
                                        )}
                                    </label>
                                </div>
                            </Form.Group>

                            <Button 
                                variant="primary" 
                                className='col-lg-6' 
                                onClick={updateProfile} 
                                style={{ background: "rgb(67, 185, 127)" }} 
                                type="submit"
                            >
                                Update Profile
                            </Button>
                        </Form>
                    </div>
                </section>
                <ToastContainer />
            </div>
        </>
    );
};

export default ProfileEdit;
