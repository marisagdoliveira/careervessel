import React, { useEffect, useState } from 'react';


const UserPic = ({ user }) => {
  const [userPic, setUserPic] = useState(null);

  useEffect(() => {
    // Update userPic state when user.img prop changes
    setUserPic(user.img || null);
  }, [user.img]);

 

  return (


        <div className="w-[100%] rounded-full flex justify-center items-center">
          {userPic ? (
            <img src={`/assets/userPics/${userPic}`} alt="User Pic" className="w-[100%] rounded-full object-cover" />
          ) : (
            <div className='w-[100%] box-gradient'><div/></div>
          )}
        </div>


  );
};

export default UserPic;