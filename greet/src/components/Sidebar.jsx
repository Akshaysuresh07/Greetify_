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
    <aside className="hidden md:block md:sticky md:top-0 h-full bg-slate-600  text-white p-6 min-h-screen shadow-lg">
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
// import React, { useState } from 'react';

// const Navbar = () => {
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [isFooterOpen, setIsFooterOpen] = useState(false);

//   return (
//     <div className="flex  ">
//       <div
//         className={`relative flex flex-col bg-gray-800 min-h-screen h-full text-white transition-all duration-300 ${isNavOpen ? 'w-20' : 'w-64'} h-full rounded-lg`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 ">
//           {!isNavOpen && <a href="#" target="_blank"  className="text-xl font-bold">Greetify</a>}
//           <button
//             onClick={() => setIsNavOpen(!isNavOpen)}
//             className="text-xl focus:outline-none"
//           >
//             ☰
//           </button>
//         </div>

//         <hr className="border-gray-600" />

//         {/* Content */}
//         <div className="flex-1 p-4 overflow-y-auto">
//           <NavButton icon="palette" label="Your Work" isNavOpen={isNavOpen} />
//           <NavButton icon="images" label="Assets" isNavOpen={isNavOpen} />
//           <NavButton icon="thumbtack" label="Pinned Items" isNavOpen={isNavOpen} />

  

       


//         </div>

       
//         </div>
//       </div>
   
//   );
// };

// const NavButton = ({ icon, label, isNavOpen }) => (
//   <div className="flex items-center p-2 text-gray-400 hover:text-white cursor-pointer">
//     <i className={`fas fa-${icon} text-lg`}></i>
//     {!isNavOpen && <span className="ml-4">{label}</span>}
//   </div>
// );

// export default Navbar;
