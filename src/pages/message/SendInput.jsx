import React, { useState } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../redux/messageSlice";
import BASE_URL from "../../utils/config";

function SendInput() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser) return;

    try {
      const res = await axios.post(
        `${BASE_URL}/message/send/${selectedUser._id}`,
        { message },
        { withCredentials: true }
      );
      dispatch(addMessage(res.data.newMessage));
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="px-4 my-3 rounded-medium">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Send a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border text-sm rounded-lg block w-full p-3 bg-[#474240]  text-white focus:outline-none"
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 items-center pr-4 bg-transparent  text-white p-2 rounded-medium focus:outline-none"
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
}

export default SendInput;
