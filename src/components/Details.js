import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';
import './Details.css';

const Details = () => {
    const [logindata, setLoginData] = useState([]);
    const [show, setShow] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const history = useNavigate();

    const todayDate = new Date().toISOString().slice(0, 10);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const userlogout = () => {
        localStorage.removeItem("user_login");
        history("/");
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
                const updatedData = { ...logindata[0], profilePicture: reader.result };
                localStorage.setItem("user_login", JSON.stringify([updatedData]));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfilePicClick = () => {
        document.getElementById('fileInput').click();
    };

    useEffect(() => {
        const getuser = localStorage.getItem("user_login");
        if (getuser && getuser.length) {
            const user = JSON.parse(getuser);
            setLoginData(user);
            setProfilePic(user[0]?.profilePicture || null);
        }
    }, []);

    return (
        <>
            <div className="details-container">
                <h1 className="text-center">User Profile</h1>

                <div className="profile-pic-container">
                    <img
                        src={profilePic || logindata[0]?.profilePicture || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="profile-pic"
                        onClick={handleProfilePicClick}
                    />
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleProfilePicChange}
                        style={{ display: 'none' }}
                    />
                </div>

                <div className="detail-item">
                    <span className="detail-label">Name:</span> {logindata[0]?.name}
                </div>
                <div className="detail-item">
                    <span className="detail-label">Email:</span> {logindata[0]?.email}
                </div>
                <div className="detail-item">
                    <span className="detail-label">Date of Birth:</span> {logindata[0]?.dob}
                </div>

                <Button className="edit-profile-button" onClick={handleShow}>
                    Edit Profile
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ProfileEdit setLoginData={setLoginData} handleClose={handleClose} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default Details;
