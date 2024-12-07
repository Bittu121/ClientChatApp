import React, { useEffect } from "react";
import Messages from "./Messages";
import SendInput from "./SendInput";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/userSlice.js";

function MessageBox() {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  // const isOnline = true;
  const isOnline = onlineUsers.includes(selectedUser?._id);

  const dispatch = useDispatch();

  //redux cleanup
  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, []);
  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[550px] flex flex-col h-full bg-[#01664E]">
          <div className="flex gap-2 items-center bg-[#8ED18E] text-white px-4 py-2 mb-2">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="user-profile" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto ">
            <Messages />
          </div>
          <div className="bg-[#01664E]">
            <SendInput />
          </div>
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center h-full bg-transparent bg-[#264441]">
          <h1
            className="text-4xl font-bold"
            style={{
              color: "transparent",
              backgroundImage: "linear-gradient(90deg, #FFF4C2, #F9E79F)",
              WebkitBackgroundClip: "text",
              textShadow: "0px 0px 6px rgba(255, 244, 194, 0.8)",
            }}
          >
            Hi,{authUser?.fullName}
          </h1>
          <h1
            className="text-2xl text-white"
            style={{
              color: "transparent",
              backgroundImage: "linear-gradient(90deg, #FFF4C2, #F9E79F)",
              WebkitBackgroundClip: "text",
              textShadow: "0px 0px 5px rgba(255, 244, 194, 0.6)",
            }}
          >
            Let's talk!
          </h1>
        </div>
      )}
    </>
  );
}

export default MessageBox;
