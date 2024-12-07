import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/userSlice.js";

function ListOfUser({ user }) {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  console.log("online", onlineUsers);

  const isOnline = onlineUsers?.includes(user._id);
  // console.log("bk",isOnline);

  const selectedUserHandler = (user) => {
    console.log("user", user);
    dispatch(setSelectedUser(user));
  };
  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          selectedUser?._id === user?._id
            ? "bg-zinc-200 text-black"
            : "text-white"
        } flex items-center gap-2 hover:bg-zinc-200 rounded-sm p-2 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="profile-photo" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-2 ">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
}

export default ListOfUser;
