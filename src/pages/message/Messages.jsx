// import { useEffect } from "react";
// import axios from "axios";
// import BASE_URL from "../../utils/config.js";
// import { useDispatch,useSelector } from "react-redux";
// import Message from "./Message";
// import { setMessages } from "../../redux/messageSlice";

// function Messages() {
//   const dispatch = useDispatch();
//   const { selectedUser } = useSelector((store) => store.user);
//   const { messages } = useSelector((store) => store.message);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         axios.defaults.withCredentials = true;
//         const res = await axios.get(`${BASE_URL}/message/${selectedUser?._id}`);
//         console.log("res", res);
//         dispatch(setMessages(res.data));
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchMessages();
//   }, [selectedUser?._id]);

//   if (!messages) return;
//   return (
//     <>
//       <div className="px-4 flex-1 overflow-auto">
//         {messages &&
//           messages?.map((message) => {
//             return <Message key={message?._id} message={message} />;
//           })}
//       </div>
//     </>
//   );
// }

// export default Messages;
// import { useEffect } from "react";
// import axios from "axios";
// import BASE_URL from "../../utils/config.js";
// import { useDispatch, useSelector } from "react-redux";
// import { setMessages, resetMessages } from "../../redux/messageSlice";
// import Message from "./Message";
// import useGetRealTimeMessage from "../../hook/getRealTimeMessage.js";

// function Messages() {
//   useGetRealTimeMessage();
//   const dispatch = useDispatch();
//   const { selectedUser } = useSelector((store) => store.user);
//   const { messages } = useSelector((store) => store.message);

//   useEffect(() => {
//     if (!selectedUser) return;

//     const fetchMessages = async () => {
//       try {
//         axios.defaults.withCredentials = true;
//         const res = await axios.get(`${BASE_URL}/message/${selectedUser?._id}`);
//         dispatch(setMessages(res.data));
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     // Reset messages before fetching new ones
//     dispatch(resetMessages());
//     fetchMessages();
//   }, [selectedUser, dispatch]);

//   if (!messages?.length) return <p className="text-center">No messages yet</p>;

//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       {messages &&
//         messages.map((message) => (
//           <Message key={message?._id} message={message} />
//         ))}
//     </div>
//   );
// }

// export default Messages;

import React, { useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, addMessage } from "../../redux/messageSlice";
import Message from "./Message";
import useGetRealTimeMessage from "../../hook/getRealTimeMessage";

function Messages() {
  useGetRealTimeMessage();
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/message/${selectedUser?._id}`,
          {
            withCredentials: true,
          }
        );
        dispatch(setMessages(res.data || []));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]);

  if (!selectedUser) return <p>Select a user to start chatting</p>;

  return (
    <div className="messages-container">
      {messages.map((msg) => (
        <Message key={msg._id} message={msg} />
      ))}
    </div>
  );
}

export default Messages;
