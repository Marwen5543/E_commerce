import React from 'react';

function Footer() {
  return (
    <footer style={footerStyle}>
      <div style={contentContainer}>
        <div style={leftContent}>
          <h3>Contact Us</h3>
          <p>Email: TUNshopping@gmail.com</p>
          <p>Phone: (+216) 20555444</p>
        </div>
        <div style={rightContent}>
          <h3>Follow Us  {'\u00A0'}    </h3>
          <div style={socialIcons}>
            <a href="https://facebook.com">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <p style={copyright}>© {new Date().getFullYear()} Online Market. All rights reserved.</p>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '2rem 0',
};

const contentContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: '1200px',
  margin: '0 auto',
};

const leftContent = {
  flex: 1,
};

const rightContent = {
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
};

const socialIcons = {
  display: 'flex',
  gap: '1rem',
};

const copyright = {
  textAlign: 'center',
  marginTop: '1rem',
};

export default Footer;
