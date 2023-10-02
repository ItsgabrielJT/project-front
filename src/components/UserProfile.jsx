import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { userProfileData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import avatar from '../data/avatar.jpg';
import { FiUser } from 'react-icons/fi';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate()


  const handleSubmit = () => {
    navigate('/')
  }

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <FiUser
          className="rounded-full h-20 w-20"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> Selma </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">  Administrator   </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> salma@gmail.com </p>
        </div>
      </div>

      <div className="mt-5">
        <button
          className="rounded-xl w-full bg-gradient-to-br from-[#6025F5] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50"
          onClick={handleSubmit}
        >
          Logout
        </button>
      </div>
    </div>

  );
};

export default UserProfile;
