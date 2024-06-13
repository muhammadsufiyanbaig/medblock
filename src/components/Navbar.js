import React, { useState } from "react";
import healthReport from "../assets/health-report.png";
import { loadAccount } from "../store/interactions";
import { useDispatch, useSelector } from "react-redux";
import Blockies from "react-blockies";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.connection);
  const account = useSelector((state) => state.provider.account);
  const balance = useSelector((state) => state.provider.balance);

  const connectHandler = async () => {
    await loadAccount(provider, dispatch);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 flex items-center justify-between py-4 md:py-4 bg-black w-full">
      {/* Logo and Branding */}
      <Link
        to="/"
        className="inline-flex items-center gap-2.5 text-2xl font-bold text-white md:text-3xl"
        aria-label="logo"
      >
        <img src={healthReport} alt="Health Report" className="w-10 h-10 mr-3" />
        <h2 className="text-xl font-bold">MedBlock</h2>
      </Link>

      {/* Account Information and Connect Button */}
      <div className="flex items-center">
        {balance && (
          <p className="text-white mr-4">
            <small className="mr-1">My Balance:</small>
            {Number(balance).toFixed(4)} ETH
          </p>
        )}
        {!account && (
          <button
            className="p-2 bg-blue-600 rounded hover:bg-blue-700 mr-4"
            onClick={connectHandler}
          >
            Connect
          </button>
        )}
        {account && (
          <a
            className="flex items-center"
            target="_blank"
            href="https://portfolio.metamask.io/"
            rel="noopener noreferrer"
          >
            {account.slice(0, 5) + "...." + account.slice(38, 42)}
            <Blockies
              seed={account}
              size={10}
              scale={3}
              color="#2187D0"
              bgColor="#F1F2F9"
              spotColor="#767F92"
              className="ml-2 rounded-full"
            />
          </a>
        )}
      </div>

      {/* Menu Toggle Button (for smaller screens) */}
      <button className="md:hidden" onClick={toggleMenu}>
        {menuOpen ? (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        )}
      </button>

      {/* Dropdown Menu (for smaller screens) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-end bg-blue-900 px-4 space-y-4">
          <Link
            to="/form"
            className="text-white py-2 px-1 bg-black rounded-md w-full"
          >
            New
          </Link>
          <Link
            to="/data"
            className="text-white py-2 px-1 bg-black rounded-md w-full"
          >
            All Patients
          </Link>
          <div>
            {balance ? (
              <p className="text-white">
                <small className="mr-1 font-bold font-serif">My Balance:</small>
                {Number(balance).toFixed(4)} ETH
              </p>
            ) : (
              <p className="text-white">
                <small className="mr-1 font-bold font-serif">My Balance:</small>
                0 ETH
              </p>
            )}
          </div>
          {!account && (
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-2.5 py-2 text-sm font-semibold text-gray-500 ring-indigo-300 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:hidden"
              onClick={connectHandler}
            >
              Connect
            </button>
          )}
        </div>
      )}
      <Outlet/>
    </header>
  );
};

export default Navbar;
