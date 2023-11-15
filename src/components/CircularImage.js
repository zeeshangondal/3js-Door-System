import React, { useState, useEffect } from 'react';

const CircularImage = ({ size, glassType, label }) => {
  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    import(`../GlassPictures/${glassType}.jpg`)
      .then(image => setImagePath(image.default))
      .catch(error => console.error('Error loading image:', error));
  }, [glassType]);

  const imageStyle = {
    width: size,
    height: size,
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `url(${imagePath})`
  };

  const labelStyle = {
    textAlign: 'center',
    marginTop: '2px', // Adjust as needed
    fontWeight:"normal"
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin:'1vh' }}>
      <div style={imageStyle} />
      <div style={labelStyle}>{label}</div>
    </div>
  );
};

export default CircularImage;
