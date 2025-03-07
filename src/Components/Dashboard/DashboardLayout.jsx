import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../SideNav";
import Center from "../Center";

const DashboardLayout = () => {
  return (
    <div id="main" className="h-screen w-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 h-16 md:h-full bg-gray-200">
        <SideNav />
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-4 overflow-y-auto">
        <Center> {/* Center ke andar Outlet nahi hona chahiye */}
          <Outlet /> {/* Yeh sirf ek baar hona chahiye */}
        </Center>
      </main>
    </div>
  );
};

export default DashboardLayout;
