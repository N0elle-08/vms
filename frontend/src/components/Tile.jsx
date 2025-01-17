import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Tile = ({ title, count, navigateTo }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <div className="tile" onClick={handleClick}>
      <h2>{title}</h2>
      {count !== undefined && <p>{count}</p>}
    </div>
  );
};

export default Tile;
