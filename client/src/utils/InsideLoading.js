import React, { useState, useEffect } from 'react';

function InsideLoading() {
  const [fadeIn, setFadeIn] = useState(false);

  const styles = {
    backgroundColor: 'white',
    fontFamily: 'fantasy',
    fontSize: '1.5rem',
    textAlign: 'center',
    color: '#ff6e14',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',  
    justifyContent: 'center',
    alignItems: 'center',
    opacity: fadeIn ? 1 : 0,
    transition: 'opacity 3s ease-in-out',
  };

  const paragraphStyles = {
    marginBottom: '10px', 
  };

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div style={styles}>
      <img src='/JOBCY ICON.png'></img>
      <p style={paragraphStyles}>Welcome to Jobcy</p>
    </div>
  );
}

export default InsideLoading;
