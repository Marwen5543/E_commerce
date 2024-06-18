import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(prevOffset => prevOffset + 1);
    }, 50); // Adjust the interval to control the animation speed

    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    position: 'relative',
    height: '100vh',
    backgroundImage: `url("https://plus.unsplash.com/premium_photo-1683796112978-fa4b9fa79e58?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")`,
    backgroundPosition: `${offset}px 0`,
    transition: 'background-position 0.1s ease-in-out',
  };

  const contentStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    color: '#f0f0f0', // Cool white
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#00008B', // Dark Blue
  };
  
  const subtitleStyle = {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    color: '#333333', // Dark Gray
  };

  const browseButtonStyle = {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#ff0000', // Red
    color: '#ffcc00', // Yellow
    fontWeight: 'bold',
    borderRadius: '5px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  };

  const handleButtonHover = (e) => {
    e.target.style.backgroundColor = '#ffcc00'; // Yellow on hover
    e.target.style.color = '#ff0000'; // Red on hover
  };

  const handleButtonLeave = (e) => {
    e.target.style.backgroundColor = '#ff0000'; // Red on leave
    e.target.style.color = '#ffcc00'; // Yellow on leave
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>Welcome to Our Online Clothing Market</h1>
        <p style={subtitleStyle}>Explore a wide range of fashionable clothes.</p>
        <Link
          to="/Product"
          style={browseButtonStyle}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}

export default Home;
