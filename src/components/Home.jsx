import React from "react";
import Sidebar from "../pages/Sidebar";
import MessageBox from "../pages/message/MessageBox";

function Home() {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-blur-lg bg-opacity-50">
      <Sidebar />
      <MessageBox />
    </div>
  );
}

export default Home;
