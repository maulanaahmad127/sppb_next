import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { SidebarContext } from "../context/navbarContext";

const Navbar = () => {
  const router = useRouter();
  const { isCollapsed, toggleSidebarcollapse } = useContext(SidebarContext);

  return (
    <>
      <div className="relative h-full">
        <aside
          className="left-0 top-0 bottom-0 h-screen flex w-60 flex-col bg-indigo-900 duration-300 ease-linear lg:block lg:translate-x-0"
          data-collapsed={isCollapsed}
        >
          <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5"></div>
          {/* sidebar logo */}
          <div className="flex items-center justify-center py-3">
            <div className="inline-flex">
              {/* insert logo */}
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
                  href="/DataProduksiBeras/getDataProduksiBerasByPetani"
                  className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                    router.pathname == "/DataProduksiBeras/getDataProduksiBerasByPetani"
                      ? "bg-indigo-700"
                      : ""
                  } `}
                >
                  Data Beras
                </Link>
              </li>

              <li>
                <Link
                  href="/Profil/getProfil"
                  className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                    router.pathname == "/Profil/getProfil"
                      ? "bg-indigo-700"
                      : ""
                  } `}
                >
                  Profil
                </Link>
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
    </>
  );
};
export default Navbar;
