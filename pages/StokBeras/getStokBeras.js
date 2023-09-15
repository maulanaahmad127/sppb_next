import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Layout from "../../components/layout";
import Link from "next/link";
import FileSaver from 'file-saver';

export default function editStok() {
  const [content, setContent] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [isTerjual, setIsTerjual] = useState(false);
  let roleSignin = localStorage.getItem("role");
  const [role, setRole] = useState(roleSignin);

  useEffect(() => {
    fetchContent();
  }, [page, search, isTerjual]);

  async function fetchContent() {
    const tokenx = localStorage.getItem("token");
    console.log(tokenx);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        x: tokenx,
        size: size,
        page: page,
      },
    };
    const url = "../api/StokBeras/getStokBerasHandler";
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

  async function pagginationHandler(event) {
    const curpage = event.selected;
    console.log(`sekarang ada di page ${curpage}`);
    setPage(curpage);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const tokenx = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        x: tokenx,
      },
    };
    const url = "../api/StokBeras/getStokBerasPDF";
    try {
      const pdf = await fetch(url, options);
      const file = await pdf.blob();
      let currentDate = `lastSync=${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}@${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}` 
      let fileName =  `data_stok_beras${currentDate}`
      FileSaver(file, fileName);
    } catch (error) {
      console.log(error);
    }
  }

  if (role === "ROLE_ADMIN") {
    return (
      <>
        <Layout>
          <div className="px-6 pt-9 pb-4 rounded-sm border border-stroke bg-white shadow-default">
            <h2 className="font-bold text-2xl my-4">Data Stok Beras</h2>
            <div className="container pt-2.5">
              <div className="inline-flex justify-between w-full mb-5">
                <Link
                  className="inline-flex items-stretch rounded bg-blue-500 hover:opacity-80 active:bg-blue-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
                  href="/StokBeras/updateStokBeras"
                >
                  <span className="pr-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-edit"
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
                      <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                      <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                      <path d="M16 5l3 3"></path>
                    </svg>
                  </span>
                  Edit Stok Beras
                </Link>

                <button
                  className="inline-flex items-stretch rounded bg-green-500 hover:opacity-80 active:bg-green-600 text-center text-white text-xs px-2 py-1 cursor-pointer"
                  onClick={handleSubmit}
                >
                  <span className="pr-1.5">
                    <svg
                      className="mr-1.5"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-download"
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
                      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                      <path d="M7 11l5 5l5 -5"></path>
                      <path d="M12 4l0 12"></path>
                    </svg>
                  </span>
                  Download
                </button>
              </div>
              <div className="w-fit">
                <table className="table-auto border rounded-sm pt-3 mb-2 w-auto overflow-auto">
                  <thead>
                    <tr className="bg-gray-300 border">
                      <th className="px-3 py-2 border" scope="col">
                        ID
                      </th>
                      <th className="px-3 py-2 border" scope="col">
                        Jenis Beras
                      </th>
                      <th className="px-3 py-2 border" scope="col">
                        Stok (Kilogram)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {content &&
                      content.map((content) => (
                        <tr key={content.jenisBerasID}>
                          <td className="px-3 py-2 border">
                            {content.jenisBerasID}{" "}
                          </td>
                          <td className="px-3 py-2 border">
                            {content.jenisBeras}{" "}
                          </td>
                          <td className="px-3 py-2 border">{content.stok}</td>
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
          </div>
        </Layout>
      </>
    );
  } else if (role === "ROLE_PK") {
    return (
      <>
        <Layout>
          <div className="px-6 pt-9 pb-4 rounded-sm border border-stroke bg-white shadow-default">
            <h2 className="font-bold text-2xl my-4">Data Stok Beras</h2>
            <div className="container pt-2.5">
              <button
                className="inline-flex items-stretch rounded bg-green-500 hover:opacity-80 active:bg-green-600 text-center text-white text-xs px-2 py-1 mb-5 cursor-pointer"
                onClick={handleSubmit}
              >
                <span className="pr-1.5">
                  <svg
                    className="mr-1.5"
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-download"
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
                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                    <path d="M7 11l5 5l5 -5"></path>
                    <path d="M12 4l0 12"></path>
                  </svg>
                </span>
                Download
              </button>
              <div className="w-fit">
                <table className="table-auto border rounded-sm pt-3 mb-2 w-auto overflow-auto">
                  <thead>
                    <tr className="bg-gray-300 border">
                      <th className="px-3 py-2 border" scope="col">
                        ID
                      </th>
                      <th className="px-3 py-2 border" scope="col">
                        Jenis Beras
                      </th>
                      <th className="px-3 py-2 border" scope="col">
                        Stok (Kilogram)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {content &&
                      content.map((content) => (
                        <tr key={content.jenisBerasID}>
                          <td className="px-3 py-2 border">
                            {content.jenisBerasID}{" "}
                          </td>
                          <td className="px-3 py-2 border">
                            {content.jenisBeras}{" "}
                          </td>
                          <td className="px-3 py-2 border">{content.stok}</td>
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
          </div>
        </Layout>
      </>
    );
  }
}
