import React from "react";
import CenterTop from "./CenterTop";

import CenterBottom from "./CenterBottom";

const Center = () => {
  return (
    <div className="h-full w-[75vw] bg-blue-500">
      <CenterTop />
      {/* Dynamic Routing Content */}
      <CenterBottom/>
      
    </div>
  );
};

export default Center;
