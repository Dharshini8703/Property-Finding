import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
 import '../../index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import eyeFill from '../../assets/eye.png';
import eyeSlash from '../../assets/eyeSlash.png';
import user from '../../assets/user.png';


function CompanyLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState({
        username: true,
        password: true
      });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        e.preventDefault(); 
        const { name, value } = e.target;
        let passPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
        if (name === 'username') {
            (value.length < 8 || value.length > 16) ? setValid((prevValid) => ({ ...prevValid, username: false })) : setValid((prevValid) => ({ ...prevValid, username: true }));
            setUsername(value);
        }
        if (name === 'password') {
            (!passPattern.test(value) || value.length < 8 || value.length > 16) ? setValid((prevValid) => ({ ...prevValid, password: false })) : setValid((prevValid) => ({ ...prevValid, password: true }));
            setPassword(value);
        }
    }

    function showPassword() {
        var x = document.getElementById("passwordInput");
        var y = document.getElementById('eyeImg');
        if (x.type === "password") {
            x.type = "text";
            y.src = eyeSlash;
        } else {
            x.type = "password";
            y.src = eyeFill;
        }
    }

    const customToastStyle = {
        marginTop: "50px", // Move toast down by 20px
    };

    const notifyError = (msg) => toast.error(msg);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/login', { username }, {
                headers: {
                    'password': password  
                }
            });
            console.log(res.data.accessToken);
            if (res.data.accessToken) {
                localStorage.setItem('token', res.data.accessToken);
           }

            if (res.data.message) {
                toast.success(res.data.message, { 
                  position: "top-center",
                  autoClose: 2000, // Close the toast after 2 seconds
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  toastClassName: 'custom-toast', // Apply custom class for styling
                  bodyClassName: 'custom-toast-body', // Apply custom class for body styling
                  style: customToastStyle
                });
              }
              else {
                // Fallback in case response structure is not as expected
                toast.success('Login successful!', {
                  position: "top-center",
                  autoClose: 2000, // Close the toast after 2 seconds
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  toastClassName: 'custom-toast', // Apply custom class for styling
                  bodyClassName: 'custom-toast-body', // Apply custom class for body styling
                  style: customToastStyle
                });
              }
                if (res.data.accessToken) {
                setTimeout(() => { 
                    navigate('/company/companyHome');
                }, 2000);
            } }
        catch (error) {
            notifyError(error.response.data.error)
        }
};

    return (
        <div>
          <nav className="navbar navbar-expand-md navbar-dark bg-black border-bottom border-white fixed-top navbar-custom" aria-label="Fourth navbar example">
                <div className="container-fluid">
                    <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                        <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlinkHref="#bootstrap"></use></svg>
                    </a>
                    {/* <a className="navbar-brand" href="#">Expand at md</a> */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                  
                       <div className="collapse navbar-collapse" id="navbarsExample04">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Buy</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Rent</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Commercial</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">New Projects</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="dropdown04" data-bs-toggle="dropdown" aria-expanded="false">Explore</a>
                                <ul className="dropdown-menu" aria-labelledby="dropdown04">
                                    <li><a className="dropdown-item" href="#">Property Blog</a></li>
                                    <li><a className="dropdown-item" href="#">Company Insights</a></li>
                                    <li><a className="dropdown-item" href="#">Know Your Rights</a></li>
                                </ul>
                            </li>
                        </ul>
                        <div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle golden-btn mx-5" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                LOGIN
                            </a>
                            <ul className="dropdown-menu my-3" aria-labelledby="dropdownMenuLink">
    
                            <li><a className="dropdown-item font-style" href="/admin/login">ADMIN</a></li>
                                <li><a className="dropdown-item font-style" href="/agent/login">AGENT</a></li>
                                <li><a className="dropdown-item font-style" href="/owner/login">PROPERTY OWNER</a></li>
                                <li><a className="dropdown-item font-style" href="/client/login">CLIENT</a></li>
                                {/* <li><a className="dropdown-item font-style" href="#">CLIENT</a></li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="login-box">
            <div className="form-box" id="form-box">
                <form onSubmit={handleSubmit} className="login-form" id="admin">
                    <h1 className="my-heading">Company Login</h1>
                    <h4 className="sub-heading">We're glad to see you again!</h4>
                    <div className="link">
                        <p>Don't have an account ? <a href="/company/Register">Click here</a></p>
                    </div>
                    <div className="input-box">
                        <label htmlFor="username" className="input-label">User name*</label>
                        <div className="input-field-password">
                            <input type="text" className="password-input" name="username" value={username} onChange={handleInputChange} required />
                            <div className="eye-icon">
                                <img src={user} alt="user" />
                            </div>
                        </div>
                        {!valid.username && (
                            <div>
                                <span>Please enter valid username</span><br />
                            </div>                           
                        )}
                        <label htmlFor="password" className="input-label">Password*</label>
                        <div className="input-field-password">
                            <input type="password" className="password-input" id="passwordInput" name="password" value={password} onChange={handleInputChange} required />
                            <div className="eye-icon">
                                <img src={eyeFill} alt="eye" id="eyeImg" onClick={showPassword} />
                            </div>
                        </div>
                        {!valid.password && (
                            <div>
                                <span>Please enter valid password</span><br />
                            </div>
                        )}
                    </div> 
                    <div className="link">
                        <a href="/company/forgotPassword">Forgot password</a>
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
            </div>
            <ToastContainer />
        </div>
        </div> 
                 
 
    )
}

export default CompanyLogin;
