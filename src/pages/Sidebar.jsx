import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import BASE_URL from "../utils/config.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setAuthUser, setlistOfUsers } from "../redux/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ListOfUsers from "../pages/users/ListOfUsers.jsx";

function Sidebar() {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { listOfUsers } = useSelector((store) => store.user);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const listOfUser = listOfUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (listOfUser) {
      dispatch(setlistOfUsers([listOfUser]));
    } else {
      toast.error("OOP'S user not found!");
    }
  };

  return (
    <>
      <div className="border-r border-slate-500 p-4 flex flex-col bg-[#248A50]">
        <form
          onSubmit={searchSubmitHandler}
          className="flex items-center gap-2 bg-white/20 p-2 rounded-md shadow-lg backdrop-blur-sm"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input bg-transparent border border-gray-300 rounded-md text-white placeholder-white w-48 px-3 "
            type="text"
            placeholder="Search"
          />
          <button
            type="submit"
            className="btn bg-zinc-700 hover:bg-zinc-600 text-white p-2 rounded-md shadow-md"
          >
            <IoSearchOutline className="w-5 h-5 outline-none" />
          </button>
        </form>
        <div className="divider px-3"></div>
        <ListOfUsers />
        <div className="mt-2 flex items-center justify-between">
          <button
            onClick={logoutHandler}
            className="btn btn-sm flex items-center  px-2 "
          >
            Logout
            <BiLogOut size={20} className="ml-2" />
          </button>
          <img src="/chat.png" alt="Chat Icon" className="w-8 h-8" />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
