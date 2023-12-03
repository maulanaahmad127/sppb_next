import { useEffect, useState } from "react";
import Router from "next/router";
import ReactPaginate from "react-paginate";
import Layout from "../../components/layout";
import styles from "../../styles/dashboard.module.css";
import Link from "next/link";

export default function EditStok() {
  const [content, setContent] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [isTerjual, setIsTerjual] = useState(false);
  let [isOpenDetail, setIsOpenDetail] = useState(false);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    fetchContent();
  }, [page, search, isTerjual]);

  async function fetchContent() {
    const tokenx = localStorage.getItem("token");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        x: tokenx,
      },
      body: JSON.stringify({
        page: page,
        size: size,
        search: search,
      }),
    };
    const url = "../api/StokBeras/getDataByNotTerjual";
    const res = await fetch(url, options);
    const data = await res.json();
    const listData = data.content;
    const totalPage = data.data.totalPages;
    const currentPage = data.pageable.pageNumber;
    setPage(currentPage);
    setTotalPage(totalPage);
    data.data;
    setContent(listData);
  }

  function pagginationHandler(event) {
    const curpage = event.selected;
    console.log(`sekarang ada di page ${curpage}`);
    setPage(curpage);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(jenisBeras);
  }
  async function handleDetail(event) {
    setIsOpenDetail(true);
    let idx = event.target.value;
    try {
      const tokenx = localStorage.getItem("token");

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x: tokenx,
          id: idx,
        },
      };
      const url = "../api/DataProduksiBeras/getDataProduksiBersaByIDHandler";
      const res = await fetch(url, options);
      const data = await res.json();
      const det = await data.data.payload;

      console.log(det);
      setDetail(det);

    } catch (error) {
      console.log(error.message);
    }

  }

  async function handleEditStok(event) {
    event.preventDefault();
    let idx = event.target.value;
    const tokenx = localStorage.getItem("token");

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        x: tokenx,
        id: idx,
      },
    };
    const url = "../api/StokBeras/updateStokHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const status = data.status;
    if (status) {
      alert("stok data berhasil dirubah menjadi terjual");
      if (isTerjual) {
        setIsTerjual(false);
      } else {
        setIsTerjual(true);
      }
    } else {
      alert(data.data.message);
    }
  }

  return (
    <>
    {/* detail menu */}
    {isOpenDetail ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Detail Data Produksi Beras
                  </h3>
                  <button
                    className=" ml-10 bg-transparent border-0 text-black  float-right text-2xl leading-none outline-none focus:outline-none"
                    onClick={() => setIsOpenDetail(false)}
                  >x
                    
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-3 flex-auto">
                 <table class="table-auto ">
                  <tbody>
                      <tr className="px-12 py-2 ">
                        
                        <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">ID</td>
                        <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.id}</td>
                      </tr>
                      <tr className="px-12 py-2 ">
                        <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Jenis Beras</td>
                        <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.jenisBeras.nama}</td>
                      </tr>
                      <tr className="px-12 py-2 ">
                        <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Nama Petani </td>
                        <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.petani.nama}</td>
                      </tr>
                      <tr className="px-12 py-2 ">
                        <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Berat Beras</td>
                        <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.berat_beras} Kg</td>
                      </tr>
                      <tr className="px-12 py-2 ">
                        <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Harga</td>
                        <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">Rp. {detail && detail.harga}</td>
                      </tr>
                      <tr className="px-12 py-2 ">
                        <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Tanggal Masuk</td>
                        <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.tanggal_masuk}</td>
                      </tr>
                      <tr className="px-12 py-2 ">
                        <td className="px-3 py-2 border-r my-4 text-blueGray-500 text-lg leading-relaxed font-bold">Terjual</td>
                        <td className="px-3 py-2  my-4 text-blueGray-500 text-lg leading-relaxed">{detail && detail.terjual ? "Sudah Terjual" : "Belum Terjual"}</td>
                      </tr>
                      
                  </tbody>
                 </table>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setIsOpenDetail(false)}
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <Layout>
        <div className="px-6 pt-8 pb-4 rounded-sm border border-stroke bg-white shadow-default">
          <div className="flex justify-between">
            <h2 className="font-bold text-2xl self-center">
              Data Produksi Beras yang Belum Terjual
            </h2>
            <Link
              className="py-1 pr-3 pl-2 h-fit border rounded-md hover:bg-gray-500 hover:text-white mt-7 md:mt-4 flex"
              href="/StokBeras/getStokBeras"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-arrow-left"
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
                <path d="M5 12l14 0"></path>
                <path d="M5 12l6 6"></path>
                <path d="M5 12l6 -6"></path>
              </svg>
              <span className="pl-2">Kembali</span>
            </Link>
          </div>
          <form className="flex justify-end items-strecth w-full mt-3 mb-5">
            <input
              className="rounded-l-md border bg-transparent p-1 outline-none focus:border-blue-600 focus-visible:shadow-none"
              type="search"
              id="query"
              name="q"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="inline-flex rounded-r-lg border border-stroke cursor-pointer bg-gray-300 active:bg-gray-500 p-1"
              onClick={handleSubmit}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-search"
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
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                <path d="M21 21l-6 -6"></path>
              </svg>
            </button>
          </form>

          <div className="container pt-2.5 w-fit">
            <table className="table-auto border rounded-sm pt-3 mb-2 w-full overflow-auto">
              <thead>
                <tr className="bg-gray-300 border">
                  <th className="px-3 py-2 border" scope="col">
                    No
                  </th>
                  <th className="px-3 py-2 border" scope="col">
                    Berat Beras
                  </th>
                  <th className="px-3 py-2 border" scope="col">
                    Harga Beras
                  </th>
                  <th className="px-3 py-2 border" scope="col">
                    Petani
                  </th>
                  <th className="px-3 py-2 border" scope="col">
                    Jenis Beras
                  </th>
                  <th className="px-3 py-2 border" scope="col">
                    Tanggal Input
                  </th>
                  <th className="px-3 py-2 border" scope="col">
                    Terjual
                  </th>
                  <th className="px-3 py-2 border" scope="col">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody>
                {content &&
                  content.map((content) => (
                    <tr key={content.id}>
                      <td className="px-3 py-2 border">{content.id} </td>
                      <td className="px-3 py-2 border">
                        {content.berat_beras}{" "}
                      </td>
                      <td className="px-3 py-2 border">{content.harga}</td>
                      <td className="px-3 py-2 border">
                        {content.petani.nama}
                      </td>
                      <td className="px-3 py-2 border">
                        {content.jenisBeras.nama}
                      </td>
                      <td className="px-3 py-2 border">
                        {content.tanggal_masuk}
                      </td>
                      <td className="px-3 py-2 border">
                        {content.terjual.toString()}
                      </td>
                      <td className="px-3 py-2 border">
                      <button
                              className="inline-flex rounded mr-2 bg-green-500 hover:opacity-80 active:bg-blue-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
                              onClick={handleDetail}
                              value={content.id}
                            >
                              <span className="mr-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                class="icon icon-tabler icon-tabler-eye" 
                                width="24" height="24" viewBox="0 0 24 24" 
                                stroke-width="2" stroke="currentColor" 
                                fill="none" stroke-linecap="round" 
                                stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                  <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                  <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                  </svg>
                              </span>
                              DETAILS
                            </button>
                        <button
                          className="inline-flex rounded mr-2 bg-blue-500 hover:opacity-80 active:bg-blue-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
                          onClick={handleEditStok}
                          value={content.id}
                        >
                          <span className="mr-1.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="icon icon-tabler icon-tabler-check"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              stroke-width="2"
                              stroke="currentColor"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              ></path>
                              <path d="M5 12l5 5l10 -10"></path>
                            </svg>
                          </span>
                          Set Terjual
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <ReactPaginate
              activeClassName={"item active "}
              breakClassName={"item break-me "}
              breakLabel={"..."}
              containerClassName={"pagination"}
              disabledClassName={"disabled-page"}
              nextClassName={"item next "}
              pageClassName={"item pagination-page "}
              nextLabel={">"}
              previousLabel={"<"}
              previousClassName={"item previous"}
              initialPage={page}
              pageCount={totalPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={pagginationHandler}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
