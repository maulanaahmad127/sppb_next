import NavbarPK from "./navbarPK";

export default function Layout({ children }) {
  return (
    <>
      {/* main body */}
      <div className="flex h-full bg-gray-100 overflow-auto">
        {/* sidebar */}
        <NavbarPK />
        {/* content */}
        <main className="w-full md:ml-60 md:p-6 2xl:p-10">
          <div className="w-full flex flex-col">
            {/* children */}
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
