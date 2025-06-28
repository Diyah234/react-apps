import React from "react";
import Navbar from "./views/Navbar"; // Assuming Navbar is in the same directory
import homebg from '../assets/homebg.jpg'

const Landing = () => {
  return (
    // The background image will cover the screen, which works well for mobile.
    // min-h-screen ensures the div takes at least the full viewport height.
    <div className="bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: `url(${homebg})` }}>
      <Navbar />
      {/* For mobile, center the text and adjust padding */}
      <div className="text-center py-10 px-4 pb-20 sm:pb-40"> {/* Add horizontal padding for smaller screens */}
        {/* Adjust text size for mobile using default (unprefixed) classes,
            then override for larger screens with sm:, md: etc. */}
        <h1 className="text-4xl font-bold text-white leading-tight sm:text-5xl lg:text-6xl">
          Stop Leaving Money <br className="sm:hidden"/>on the Table.
        </h1>
        {/* Adjust paragraph width and font size for mobile */}
        <p className="text-[#CDCDCD] text-base pt-6 mx-auto max-w-sm sm:max-w-md lg:max-w-lg px-4 sm:px-0">
          Gain complete control over your recurring revenue, reduce churn, and
          optimize your subscription business.
        </p>
        <div className="pt-8 flex flex-col items-center space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
          <button className="text-[#000020] text-lg bg-white p-3 px-6 font-semibold rounded-lg w-full max-w-[200px] sm:w-auto">
            Get Started
          </button>
          {/* For mobile, remove ml-10 and make it a block element with full width */}
          <button className="bg-[#191934] text-[#FAFAFA] text-lg p-3 px-6 font-semibold rounded-lg w-full max-w-[200px] sm:w-auto sm:ml-0">
            Request a Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;