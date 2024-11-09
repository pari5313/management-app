import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user_login");
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <NavLink to="/" className="navbar-brand text-decoration-none text-light mx-2">
                        User Registration
                    </NavLink>
                    <Nav className="ms-auto justify-content-end">
                        {isLoggedIn ? (
                            <span
                                onClick={handleLogout}
                                className="text-decoration-none text-light mx-3"
                                style={{ cursor: "pointer" }}
                            >
                                Logout
                            </span>
                        ) : (
                            <>
                                <NavLink to="/" className="text-decoration-none text-light mx-3">
                                    Sign Up
                                </NavLink>
                                <NavLink to="/login" className="text-decoration-none text-light mx-3">
                                    Login
                                </NavLink>
                                <NavLink to="/contact" className="text-decoration-none text-light mx-3">
                                    Contact
                                </NavLink>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
