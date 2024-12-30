import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkClass = (isActive) =>
    `w-full text-left px-3 py-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`;

  const links = [
    { path: "/", label: "Templates" },
    { path: "/emails", label: "Emails" },
    // { path: "/recipients", label: "Recipients" },
  ];

  return (
    <aside className="hidden md:block md:sticky md:top-0 h-full bg-black text-white p-6 min-h-screen shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Pages</h2>
      <nav>
        <ul>
          {links.map(({ path, label }) => (
            <li key={path} className="mb-4">
              <NavLink 
                to={path} 
                className={({ isActive }) => linkClass(isActive)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
