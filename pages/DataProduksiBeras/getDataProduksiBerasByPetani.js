import { useEffect, useState } from "react"
import Router from "next/router"
import ReactPaginate from 'react-paginate';
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

  }, [page, search])


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
    const url = "../api/DataProduksiBeras/getDataProduksiBerasByPetaniHandler";
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


    return (
      <>
        <LayoutPetani>
          <h2>Log Data Produksi Beras Oleh Petani {content && content[0].petani.nama}</h2>
          <form className={styles.form}>
            <input  type="search" id="query" name="q" placeholder="Search..." onChange={(e) => setSearch(e.target.value)}/>
              <button onClick={handleSubmit}> Search</button>
          </form>
          
          <div className="container">
            <table className="table table-bordered mb-0">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Berat Beras</th>
                  <th scope="col">Harga Beras</th>
                  <th scope="col">Petani</th>
                  <th scope="col">Jenis Beras</th>
                  <th scope="col">Tanggal Input</th>
                </tr>
              </thead>
              <tbody>
                {content && content.map((content) => (
                  <tr key={content.id}>
                    <td>{content.id} </td>
                    <td>{content.berat_beras} </td>
                    <td>{content.harga}</td>
                    <td>{content.petani.nama}</td>
                    <td>{content.jenisBeras.nama}</td>
                    <td>{content.tanggal_masuk}</td>
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
  
        </LayoutPetani>
      </>
  
  
    )
}
 
