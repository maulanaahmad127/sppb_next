import { useEffect, useState } from "react";
import Router from "next/router";
import ReactPaginate from "react-paginate";
import Layout from "../../components/layout";
import styles from "../../styles/dashboard.module.css";

export default function editStok() {
  const [content, setContent] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [isTerjual, setIsTerjual] = useState(false);

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
      <Layout>
        <div className="px-6 pt-9 pb-4 rounded-sm border border-stroke bg-white shadow-default">
          <h2 className="font-bold text-2xl my-4">
            Data Produksi Beras yang Belum Terjual
          </h2>
          <form className="flex justify-end items-strecth w-full mb-5">
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

          <div className="container pt-2.5">
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
