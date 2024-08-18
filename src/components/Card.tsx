import React from "react";
import { IoIosContact } from "react-icons/io";

interface CardProps {
  fullName: string;
  phoneNumber: string;
  email: string;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({
  fullName,
  phoneNumber,
  email,
  onClick,
}) => {
  return (
    <div
      className="px-3 py-4 md:p-6 border bg-black border-white rounded-3x rounded-xl w-full cursor-pointer hover:bg-gray-900"
      onClick={onClick}
    >
      <div className="flex-col justify-center items-center gap-2 ">
        <div className="flex justify-center items-center mb-2">
          <IoIosContact className="text-white" size="40px" />
        </div>

        <div className="flex justify-center items-center mb-2">
          <span className="text-white text-[17px]">{fullName}</span>
        </div>

        <div className="flex justify-start items-center">
          <p className="text-[#98948C] text-sm">Phone:</p>

          <p className="text-white text-sm ml-3 overflow-hidden text-ellipsis">
            {phoneNumber}
          </p>
        </div>
        <div className="flex justify-start items-center">
          <p className="text-[#98948C] text-sm">Email:</p>

          <p className="text-white text-sm ml-3 overflow-hidden text-ellipsis">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
