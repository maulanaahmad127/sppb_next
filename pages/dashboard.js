import { useEffect, useState } from "react";
import Router from "next/router";
import ReactPaginate from "react-paginate";
import Layout from "../../components/layout";
import Link from "next/link";


export default function Beranda () {
const [content, setContent] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  async function fetchContent() {
    const tokenx = localStorage.getItem("token");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        x: tokenx,
      },
      body: JSON.stringify({
        size: size
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

  return (
    <>
    <Layout>
    
    </Layout></>
  )
}

