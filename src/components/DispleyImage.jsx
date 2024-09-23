import React from "react";

import { IoIosCloseCircleOutline } from "react-icons/io";


const DispleyImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded max-w-5x1 mx-auto p-4">
        <div className='w-fit ml-auto text-2xl hover:text-blue-500 cursor-pointer' onClick={onClose}>
            <IoIosCloseCircleOutline/>
        </div>
        <div className="flex justify-center p-4 max-w-[70vh] max-h-[70vh]">
          <img src={imgUrl} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default DispleyImage;
