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
        <h2>Log Data Jenis Beras</h2>
        <form className={styles.form}>
          <input  type="search" id="query" name="q" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={handleSubmit}> Search</button>
        </form>
        
        <div className="container">
        <button onClick={addJenisBerasHandler}> Add New Jenis Beras</button>
          <table className="table table-bordered mb-0">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Jenis Beras</th>
                <th scope="col">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {content && content.map((content) => (
                <tr key={content.id}>
                  <td>{content.id} </td>
                  <td>{content.nama} </td>
                  <td className="text-center">
                    <button onClick={handleEdit} value={content.id}>EDIT</button>
                    <button onClick={handleDelete} value={content.id}>DELETE</button>
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