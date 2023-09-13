import { useEffect, useState } from "react"
import Router from "next/router"
import ReactPaginate from 'react-paginate';
import Layout from "../../components/layout";
import styles from "../../styles/dashboard.module.css";
import LayoutPK from "../../components/layoutPK";

export default function Dashboard() {
  const [content, setContent] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  let roleSignin = localStorage.getItem("role");
  const [role, setRole] = useState(roleSignin);

  useEffect(() => {

    fetchContent();

  }, [page, search, isDeleted])


  async function fetchContent() {

    const tokenx = localStorage.getItem("token")

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x": tokenx
      },
      body: JSON.stringify({
        'page': page,
        'size': size,
        'search': search
      })
    }
    const url = "../api/JenisBeras/getJenisBerasHandler";
    const res = await fetch(url, options);
    const data = await res.json();
    const listData = data.content;
    const totalPage = data.data.totalPages;
    const currentPage = data.pageable.pageNumber;
    setPage(currentPage);
    setTotalPage(totalPage);
    data.data
    setContent(listData);

  }

  function pagginationHandler (event) {
    const curpage = event.selected;
    console.log(`sekarang ada di page ${curpage}`)
    setPage(curpage);

  }

  function handleSubmit (event){
    event.preventDefault();
      // console.log(jenisBeras);
  }

  function addJenisBerasHandler (event){
    event.preventDefault();
    Router.push("/JenisBeras/addJenisBeras");
  }

  function handleEdit (event){
    event.preventDefault();
    let idx = event.target.value;
    
    Router.push({
      pathname: "/JenisBeras/updateJenisBeras",
      query: {idx}
  }, "/JenisBeras/updateJenisBeras")
  }

  async function handleDelete (event){
    event.preventDefault();
    let idx = event.target.value;
    const tokenx = localStorage.getItem("token")

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x": tokenx,
                "id" : idx

            }
        }
        const url = "../api/JenisBeras/deleteJenisBerasHandler";
        const res = await fetch(url, options);
        const data = await res.json();
        const status = data.status;
        if(status){
            alert('data berhasil dihapus');
            if(isDeleted){
              setIsDeleted(false);
            }else{
              setIsDeleted(true);
            }
        }else{
            alert(data.data.message);
        }
    
  }
if(role === 'ROLE_ADMIN'){
  return (
    <>
      <Layout>
        <h2 className="text-bold text-2xl">Log Data Jenis Beras</h2>
        <form className="relative flex items-end">
          <input 
          className="rounded-lg border bg-transparent p-1 outline-none focus:border-blue-600 focus-visible:shadow-none" type="search" id="query" name="q" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
            <button className="ml-1.5" onClick={handleSubmit}>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
   <path d="M21 21l-6 -6"></path>
</svg>
            </button>
        </form>
        
        <div className="container">
        <button 
        className="inline-flex rounded mr-2 bg-blue-500 hover:opacity-80 active:bg-blue-600 text-center text-white text-xs px-2 py-1 cursor-pointer"onClick={addJenisBerasHandler}> Add New Jenis Beras</button>
          <table className="table-auto border rounded-sm pt-2 mb-0 w-auto overflow-auto">
            <thead>
              <tr className="bg-gray-300 border">
                <th className="px-3 py-2 border" scope="col">No</th>
                <th className="px-3 py-2 border" scope="col">Jenis Beras</th>
                <th className="px-3 py-2 border" scope="col">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {content && content.map((content) => (
                <tr key={content.id}>
                  <td className="px-3 py-2 border">{content.id} </td>
                  <td className="px-3 py-2 border">{content.nama} </td>
                  <td className="px-3 py-2 border align-baseline">
                    <button 
                    className="inline-flex rounded mr-2 bg-blue-500 hover:opacity-80 active:bg-blue-600 text-center text-white text-xs px-2 py-1 cursor-pointer"onClick={handleEdit} value={content.id}>EDIT</button>
                    <button 
                    className="inline-flex rounded bg-red-500 hover:opacity-80 active:bg-red-600 text-center text-white text-xs px-2 py-1 cursor-pointer"onClick={handleDelete} value={content.id}>DELETE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate 
              activeClassName={'item active '}
              breakClassName={'item break-me '}
              breakLabel={'...'}
              containerClassName={'pagination'}
              disabledClassName={'disabled-page'}
              nextClassName={"item next "}
              pageClassName={'item pagination-page '}
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

      </Layout>
    </>


  )
}else if(role === 'ROLE_PK'){
  return (
    <>
      <LayoutPK>
        <h2>Log Data Jenis Beras</h2>
        <form className={styles.form}>
          <input  type="search" id="query" name="q" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={handleSubmit}> Search</button>
        </form>
        
        <div className="container">
          <table className="table table-bordered mb-0">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Jenis Beras</th>
              </tr>
            </thead>
            <tbody>
              {content && content.map((content) => (
                <tr key={content.id}>
                  <td>{content.id} </td>
                  <td>{content.nama} </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ReactPaginate 
              activeClassName={'item active '}
              breakClassName={'item break-me '}
              breakLabel={'...'}
              containerClassName={'pagination'}
              disabledClassName={'disabled-page'}
              nextClassName={"item next "}
              pageClassName={'item pagination-page '}
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

      </LayoutPK>
    </>


  )
}
 
}