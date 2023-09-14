import styles from "../styles/Home.module.css";
import NavbarPK from "./navbarPK";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <>
      {/* main body */}
      <div className="flex h-full bg-gray-100 overflow-auto">
        {/* sidebar */}
        <NavbarPK isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
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
