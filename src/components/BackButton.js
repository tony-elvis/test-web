import React from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)} className="flex items-center cursor-pointer">
      <BsArrowLeftShort size={40} /> Back
    </div>
  );
};

export default BackButton;
