import React,{useState,useEffect} from 'react'
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import axios from 'axios';
import api from "../axios/config";
import {Routes, Route, useNavigate} from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = api.post('/auth/login',{username,password});
      const data = (await response).data;

      localStorage.setItem('token',data.token)
      navigate('/');
    } catch (error) {
      setError('Invalid credentials');
      // console.error('Error during login:', error);
    }
  };

  return (

    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            {error}
              <div className="my-3">
                <label for="display-4">user</label>
                <input
                  type="user"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Utilisateur"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="text-center"></div>
                  <button onClick={handleLogin} className="my-2 mx-auto btn btn-dark" >Login</button>
                </div>
              
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
