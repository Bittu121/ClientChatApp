import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { setSocket } from "./redux/socketSlice.js";
import { setOnlineUsers } from "./redux/userSlice.js";

function App() {
  // const [socket, setSocket] = useState(null);
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8000", {
        query: { userId: authUser._id },
      });
      // setSocket(socket);

      dispatch(setSocket(socket));
      //received online user from backend and saved in onlineUsers slice redux
      socket.on("getOnlineUsers", (onlineUsers) => {
        console.log("Online users received:", onlineUsers);
        dispatch(setOnlineUsers(onlineUsers));
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser, dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/signup",
      element: !authUser ? <Signup /> : <Navigate to="/" />,
    },
    {
      path: "/login",
      element: !authUser ? <Login /> : <Navigate to="/" />,
    },
  ]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
