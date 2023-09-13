import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { SidebarContext } from "../context/navbarContext";

const Navbar = () => {
  const router = useRouter();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  return (
    <div className="relative">
      {/* <button className="btn" onClick={toggleSidebarcollapse}>
        {isCollapsed ? (
          // menu icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-menu-2"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 6l16 0"></path>
            <path d="M4 12l16 0"></path>
            <path d="M4 18l16 0"></path>
          </svg>
        ) : (
          ""
        )}
      </button> */}
      <aside
        className="absolute left-0 top-0 z-9999 flex h-screen w-60 flex-col overflow-y-hidden bg-indigo-900 duration-300 ease-linear lg:block lg:translate-x-0"
        data-collapsed={isCollapsed}
      >
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5"></div>

        {/* sidebar logo */}
        <div className="sidebar-header flex items-center justify-center py-3">
          <div className="inline-flex">
            <a href="#" className="inline-flex flex-row items-center">
              <span className=" leading-10 text-4x1 text-white font-bold font-large ml-1">
                SPPB
              </span>
            </a>
          </div>
        </div>

        {/* sidebar item */}
        <div className="sidebar-content px-4 py-4">
          <ul className="flex flex-col w-full gap-1">
            <li>
              <Link
                href="/"
                className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                  router.pathname == "/" ? "bg-indigo-700" : ""
                } `}
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link
                href="/DataProduksiBeras/getDataProduksiBeras"
                className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                  router.pathname == "/DataProduksiBeras/getDataProduksiBeras"
                    ? "bg-indigo-700"
                    : ""
                } `}
              >
                Data Beras
              </Link>
            </li>
            <li>
              <Link
                href="/StokBeras/getStokBeras"
                className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                  router.pathname == "/StokBeras/getStokBeras"
                    ? "bg-indigo-700"
                    : ""
                } `}
              >
                Stok Beras
              </Link>
              <ul>
                <li>
                  <Link href="/StokBeras/updateStokBeras">Edit Stok Beras</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="/PenjualanBeras/getDataPenjualan"
                className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                  router.pathname == "/PenjualanBeras/getDataPenjualan"
                    ? "bg-indigo-700"
                    : ""
                } `}
              >
                Penjualan Beras
              </Link>
            </li>
            <li>
              <Link
                href="/JenisBeras/getJenisBeras"
                className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                  router.pathname == "/JenisBeras/getJenisBeras"
                    ? "bg-indigo-700"
                    : ""
                } `}
              >
                Jenis Beras
              </Link>
            </li>
            <li>
              <Link
                href="/Profil/getProfil"
                className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                  router.pathname == "/Profil/getProfil" ? "bg-indigo-700" : ""
                } `}
              >
                Profil
              </Link>
              <ul>
                <li>
                  <Link href="/Profil/updatePassword">Edit Password</Link>
                </li>
                <li>
                  <Link href="/Profil/updateEmail">Edit Email</Link>
                </li>
                <li>
                  <Link href="/Profil/updateUsername">Edit Username</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="/signout"
                className="flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-red-600"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};
export default Navbar;
