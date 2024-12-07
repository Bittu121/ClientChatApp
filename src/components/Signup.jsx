import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import BASE_URL from "../utils/config.js";

function Signup() {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post(`${BASE_URL}/user/register`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("register", res);

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <>
      <div className="min-w-96 mx-auto">
        <div
          className="w-full p-6 rounded-lg shadow-lg"
          style={{
            background:
              "linear-gradient(90deg, #F9E1B1 0%, #D8B06D 10%, #C6A151 25%, #F9E1B1 40%, #F3D9A1 55%, #F9E1B1 70%, #E6C98B 85%, #D8B06D 100%)",
          }}
        >
          <h2 class="text-center text-2xl font-bold text-gray-800 mb-1">
            Signup
          </h2>
          <p class="text-center text-sm text-gray-600 mb-5">
            Please enter your details to sign in
          </p>
          <form onSubmit={onSubmitHandler}>
            <div class="mb-2">
              <labe>
                <span class="block text-gray-600 text-sm mb-1">Full Name</span>
              </labe>
              <input
                type="text"
                name="fullName"
                value={user.fullName}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-md text-gray-700
            text-sm focus:outline-none"
              />
            </div>
            <div class="mb-2">
              <label>
                <span class="block text-gray-600 text-sm mb-1">Username</span>
              </label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full px-4 py-2 border rounded-md text-gray-700
            text-sm focus:outline-none"
              />
            </div>
            <div class="mb-2">
              <label>
                <span class="block text-gray-600 text-sm mb-1">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md text-gray-700
            text-sm focus:outline-none"
              />
            </div>
            <div class="mb-2">
              <label>
                <span class="block text-gray-600 text-sm mb-1">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-md text-gray-700
            text-sm focus:outline-none"
              />
            </div>
            <div className="flex items-center my-4">
              <div className="flex items-center">
                <p>Male</p>
                <input
                  type="checkbox"
                  checked={user.gender === "male"}
                  onChange={() => handleCheckbox("male")}
                  defaultChecked
                  className="checkbox mx-2 w-5 h-5"
                />
              </div>
              <div className="flex items-center">
                <p>Female</p>
                <input
                  type="checkbox"
                  checked={user.gender === "female"}
                  onChange={() => handleCheckbox("female")}
                  defaultChecked
                  className="checkbox mx-2 w-5 h-5"
                />
              </div>
            </div>
            <div>
              <button className="btn w-full text-white py-2 rounded-md text-sm transition bg-cyan-500 hover:bg-cyan-600">
                Signup
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <Link to="/login" class="text-purple-600 hover:underline">
              login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
