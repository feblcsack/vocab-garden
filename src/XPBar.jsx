import React from "react";
import tree1 from "./assets/labulip.png";
import tree2 from "./assets/labupan.png";
import tree3 from "./assets/labupoo.png";

const XPBar = ({ xp }) => {
  const level = Math.floor(xp / 100); 
  const progress = xp % 100; 

  const getTreeImage = () => {
    if (xp < 50) return tree1;
    if (xp < 100) return tree2;
    return tree3;
  };

  return (
    <div className="bg-green-100 p-4 rounded shadow-md text-center">
      <h2 className="text-lg font-bold mb-4">Tree Progress</h2>
      <img
        src={getTreeImage()}
        alt="Tree Level"
        className="w-32 h-32 mx-auto mb-4"
      />
      <div className="w-full bg-gray-300 h-4 rounded relative overflow-hidden">
        <div
          className="bg-green-500 h-4"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <span className="text-sm font-bold mt-2 block">{progress}/100 XP</span>
      <p className="text-sm mt-2">Level: {level}</p>
    </div>
  );
};

export default XPBar;