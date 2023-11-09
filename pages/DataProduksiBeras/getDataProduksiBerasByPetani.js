import { useEffect, useState } from "react";
import Router from "next/router";
import ReactPaginate from "react-paginate";
import Layout from "../../components/layout";
import LayoutPetani from "../../components/layoutPetani";
import styles from "../../styles/dashboard.module.css";

export default function getDataProduksiBeras() {
  const [content, setContent] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchContent();
  }, [page, search]);

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
    const url = "../api/DataProduksiBeras/getDataProduksiBerasByPetaniHandler";
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
  return (
    <>
      <LayoutPetani>
        <div className="px-6 md:pt-9 pt-13 pb-4 rounded-sm border border-stroke bg-white shadow-default">
          <h2 className="font-bold pt-3 md:pt-0 text-2xl my-4">
            Log Data Produksi Beras oleh Petani
          </h2>

          <div className="container pt-2.5">
            <div className="flex justify-end items-strecth mb-5">
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
            </div>
            <table className="table-auto border rounded-sm pt-3 mb-2 w-full overflow-auto">
              <thead>
                <tr className="bg-gray-300 border">
                  <th scope="col" className="px-3 py-2 border">
                    No
                  </th>
                  <th scope="col" className="px-3 py-2 border">
                    Berat Beras
                  </th>
                  <th scope="col" className="px-3 py-2 border">
                    Harga Beras
                  </th>
                  <th scope="col" className="px-3 py-2 border">
                    Petani
                  </th>
                  <th scope="col" className="px-3 py-2 border">
                    Jenis Beras
                  </th>
                  <th scope="col" className="px-3 py-2 border">
                    Tanggal Input
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
      </LayoutPetani>
    </>
  );
}
