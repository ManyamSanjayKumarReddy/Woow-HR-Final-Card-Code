import React, { useContext, useState } from 'react';
import './login.css';
import Authcontext from '../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//image imported

import logo from './Assets/logo.png';
function Login() {
    const navigate = useNavigate();
    const authcontext = useContext(Authcontext);

    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form validation
        const validationErrors = {};
        if (!authcontext.Name.trim()) {
            validationErrors.name = 'Name is required';
        }
        // if (!authcontext.Linkedin.trim()) {
        //     validationErrors.linkedin = 'LinkedIn username is required';
        // }
        if (!authcontext.designation.trim()) {
            validationErrors.designation = 'Designation is required';
        }

        if (Object.keys(validationErrors).length === 0) {
            toast.success(' successful!');
            setTimeout(() => {
                navigate('/ProudMemberCard');
            }, 3000);
        } else {
            setErrors(validationErrors);
            toast.error('form check!');
        }
    };

    const handleImageChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            authcontext.setdp(imageUrl);
        }
    };

    return (
        <>
         <ToastContainer />
         <div className='loginformcontainer1 container-fluid '>

            <div className='row'>

                <div className='col-lg-6 col-md-4'>
                    <img src={logo} alt='Logo'className='logo_img col-6 col-md-12 col-lg-4'/>
                </div>    
        
            
                <div className='col-lg-5 col-md-12 '>
                    <div className='card_design'>
                        <form onSubmit={handleSubmit}>
    
                            <div data-mdb-input-init class="form-outline mb-4">
                                <h3 className='h1login'>Get Started with WoW HR</h3>
                                <label>NAME:</label>
                                <input
                                    className='name-style'
                                    type="text"
                                    name="instituteName"
                                    placeholder="Enter your Name"
                                    autoComplete="off"
                                    onChange={(e) => {
                                        authcontext.setName(e.target.value);
                                    }}
                                />
                                {errors.name && <span className="error">{errors.name}</span>}
                            </div>

                            
                            <div data-mdb-input-init class="form-outline mb-4">
                                <label>DESIGNATION:</label>
                                <input
                                    className='designation-style'
                                    type="text"
                                    name="designation"
                                    placeholder="Enter your Designation"
                                    autoComplete="off"
                                    onChange={(e) => {
                                        authcontext.setdesignation(e.target.value);
                                    }}
                                />
                                {errors.designation && <span className="error">{errors.designation}</span>}
                            </div>

                            <div data-mdb-input-init class="form-outline mb-4">
                                <label>UPLOAD IMAGE:</label>
                                <input
                                    id="imageInput"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                />
                                <div
                                    className="image-drop"
                                    onClick={() => document.getElementById('imageInput').click()}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        handleImageChange(e);
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                >
                                    {authcontext.dp ? (
                                        <p className='image_text'>Image uploaded</p> // Message indicating image uploaded
                                    ) : (
                                        <p className='image_text'>UPLOAD IMAGE HERE</p>
                                    )}
                                </div>
                            </div>

                            <button type="submit" cassName=" submit  mb-4">Get Started</button>


                            <div class="text-center">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;