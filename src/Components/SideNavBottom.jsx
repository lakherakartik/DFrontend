import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ to, icon, text }) => (
  <div className="w-full h-16 border-t border-gray-300 transition-all hover:bg-sky-100 px-8 flex items-center justify-between">
    <h3 className="text-xl font-semibold cursor-pointer flex items-center gap-2">
      <Link to={to} className="flex items-center gap-2">
        <i className={`text-2xl ${icon}`}></i> {text}
      </Link>
    </h3>
    <i className="text-2xl ri-arrow-right-s-line"></i>
  </div>
);

const SideNavBottom = () => {
  return (
    <div className="w-full pt-5">
      <NavItem to="/dashboard/" icon="ri-home-line" text="Home" />
      <NavItem to="/dashboard/upload-advertise" icon="ri-advertisement-line" text="Upload Advertise" />
      <NavItem to="/dashboard/category" icon="ri-menu-search-line" text="Category" />
      <NavItem to="/dashboard/upload-post" icon="ri-upload-2-line" text="Upload Post" />
      <NavItem to="/dashboard/manage-post" icon="ri-stack-line" text="Manage Post" />
    </div>
  );
};

export default SideNavBottom;
