import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', () => setVisible(true));
      document.addEventListener('mouseleave', () => setVisible(false));
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', () => setVisible(true));
      document.removeEventListener('mouseleave', () => setVisible(false));
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        pointerEvents: 'none',
        width: 20,
        height: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        transition: 'background-color 0.2s ease, transform 0.1s ease',
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        mixBlendMode: 'difference',
      }}
    />
  );
};

export default CustomCursor;
