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
        <NavbarPetani />
        {/* content */}
        <main className="w-full md:ml-60 md:p-6 overflow-auto">
            {/* children */}
            {children}
        </main>
      </div>
    </>
    );
}