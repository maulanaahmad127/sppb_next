import NavbarPetani from './navbarPetani';
import { useState } from 'react';

export default function Layout({ children }) {
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const handleViewSidebar = () => {
    setSideBarOpen(!sidebarOpen);
  };

  return (
    <>
    <Head>
        <title>Sistem Pencatatan Produksi Beras</title>
        <meta name="description" content="Full Stack Book JWT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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