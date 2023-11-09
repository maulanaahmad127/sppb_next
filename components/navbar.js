import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Disclosure } from "@headlessui/react";

const Navbar = () => {
  const router = useRouter();

  return (
    <div>
      <Disclosure as="nav" defaultOpen="true">
        {/* toggle button */}
        <Disclosure.Button className="absolute top-4 left-6 inline-flex peer cursor-pointer rounded-md md:hidden p-2 hover:bg-indigo-800 active:bg-indigo-800 text-white bg-indigo-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-menu-2"
            width="28"
            height="28"
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
        </Disclosure.Button>

        {/* sidebar container start */}
        <Disclosure.Panel
          as="div"
          className="h-screen -left-96 bg-indigo-900 z-20 fixed top-0 px-4 md:left-0 w-60 peer-focus:left-0 peer:transition ease-out delay-150 duration-200"
        >
          {/* sidebar head */}
          <div className="flex items-center justify-between py-5">
            <div className="flex">
              {/* title */}
              <h1 className="text-white font-bold text-md text-center ml-20">SPPB</h1>
            </div>
            <div className="flex justify-end">
              {/* toggle button */}
              <Disclosure.Button className="md:hidden text-white align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-x"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M18 6l-12 12"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </Disclosure.Button>
            </div>
          </div>

          {/* sidebar item */}
          <div className="sidebar-content pt-5">
            <ul className="flex flex-col w-full gap-1">
              {/* <li>
                <Link
                  href="/"
                  className={`flex items-center py-2 px-3 rounded-lg text-white text-base cursor-pointer hover:bg-indigo-500  ${
                    router.pathname == "/" ? "bg-indigo-700" : ""
                  } `}
                >
                  Beranda
                </Link>
              </li> */}
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
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
};
export default Navbar;
