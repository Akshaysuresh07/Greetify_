import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Greetify</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? "underline" : ""}
              >
                Templates
              </NavLink>
            </li>
           
            <li>
              <NavLink
                to="/emails"
                className={({ isActive }) => isActive ? "underline" : ""}
              >
                Emails
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/recipients"
                className={({ isActive }) => isActive ? "underline" : ""}
              >
                Recipients
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;