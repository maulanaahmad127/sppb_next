import NavbarPetani from './navbarPetani';
import { useState } from 'react';

export default function Layout({ children }) {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* main body */}
      <div className="flex h-full bg-gray-100 overflow-auto">
        {/* sidebar */}
        <NavbarPetani isOpen={sidebarOpen} toggleSidebar={handleViewSidebar}/>
        {/* content */}
        <main className="w-full md:p-6 2xl:p-10">
          {/* header */}
          <></>
          <div className="w-full flex flex-col">
            {/* children */}
            {children}
          </div>
        </main>
      </div>
    </>
    );
}