import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import BASE_URL from "../utils/config.js";
import { setAuthUser } from "../redux/userSlice.js";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post(`${BASE_URL}/user/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      navigate("/");
      // console.log(res);
      toast.success(res.data.message);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <div
        className="min-w-96 mx-auto"
      >
        <div className="w-full p-6 rounded-lg shadow-lg" style={{
          background: "linear-gradient(90deg, #F9E1B1 0%, #D8B06D 10%, #C6A151 25%, #F9E1B1 40%, #F3D9A1 55%, #F9E1B1 70%, #E6C98B 85%, #D8B06D 100%)",
        }}>
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
            Login
          </h2>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-4">
              <label>
                <span className="block text-gray-600 text-sm mb-1">
                  Username
                </span>
              </label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-md text-gray-700 text-sm focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label>
                <span className="block text-gray-600 text-sm mb-1">
                  Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md text-gray-700 text-sm focus:outline-none"
              />
            </div>
            <div>
              <button
                type="submit"
                className="btn w-full text-white py-2 rounded-md text-sm transition bg-cyan-500 hover:bg-cyan-600"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?
            <Link to="/signup" className="text-purple-600 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
