import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

function  Convo() {
  const [navigate, setNavigate] = useState(false);

  const handleClick = () => {
    setNavigate(true);
  };

  if (navigate) {
    return <Navigate to="/conversation" />;
  }

  return (
    <div>
      <button onClick={handleClick}>convo</button>
    </div>
  );
}

export default Convo;
