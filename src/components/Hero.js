import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-blue-900 via-black to-black px-4 md:px-8 text-white">
      {/* Background Blurs */}
      <div className="absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] bg-blue-500 sm:w-[68.75rem]" />
      <div className="absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] bg-gray-400 sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]" />

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Blockchain Illustration"
          className="mb-8 w-48 h-48 object-cover rounded-full"
        />
        <h1 className="text-5xl font-bold mb-4">
          Welcome to Blockchain Innovators
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Harnessing the power of blockchain technology to revolutionize the future of secure transactions and decentralized applications.
        </p>
        <Link to={'/form'} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Hero;
