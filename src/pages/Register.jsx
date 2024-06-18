import React,{useState,useEffect} from 'react'
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';
import { getuser } from '../axios/axios';
import {Routes, Route, useNavigate} from 'react-router-dom';
import api from "../axios/config";
import axios from 'axios';

function RegistrationForm() {
    const [username, setUsername] = useState('');
    //const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = api.post('/auth/signup', { username, password });
        const data = (await response).data;

      localStorage.getItem('token',data.token)
        navigate('/');
        alert('User registered successfully');
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed');
      }
    };
  
    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div class="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form>
                            <div class="form my-3">
                                <label for="Name">Full Name</label>
                                <input
                                    type="Name"
                                    className="form-control"
                                    id="Name"
                                    placeholder="Enter Your Name"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="form my-3">
                                <label for="Email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div className="form  my-3">
                                <label for="Password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="my-3">
                                <p>Already has an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link> </p>
                            </div>
                            <div className="text-center">
                            <button onClick={handleSubmit} className="my-2 mx-auto btn btn-dark" >Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default RegistrationForm