import React from 'react';
import { FiLayers, FiList } from 'react-icons/fi';

const Card = ({ name, numberOfQuestion, onClick }) => {
  return (
    <div
      className="bg-[#1f1f1f] rounded-xl shadow-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-[#182232] transition-all duration-200"
      style={{ minWidth: "220px", minHeight: "140px" }}
      onClick={onClick}
    >
      <FiLayers className="text-[#dd8725] w-8 h-8 mb-2" />
      <h3 className="text-xl font-bold text-[#dd8725] mb-2 text-center">{name}</h3>
      <div className="flex items-center gap-2 text-[#ffffffcc]">
        <FiList />
        <span>{numberOfQuestion} Questions</span>
      </div>
    </div>
  );
};

export default Card;