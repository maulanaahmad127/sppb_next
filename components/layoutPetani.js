import NavbarPetani from './navbarPetani';
import Head from "next/head";

export default function Layout({ children }) {

  return (
    <>
    <Head>
        <title>Sistem Pencatatan Produksi Beras</title>
        <meta name="description" content="Full Stack Book JWT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* main body */}
      <div className="bg-gray-100">
        {/* sidebar */}
        <NavbarPetani />
        {/* content */}
        <main className="md:ml-60 max-md:mb-4 max-md:mt-20 max-md:mx-4 md:p-6 overflow-auto">
            {/* children */}
            {children}
        </main>
      </div>
    </>
    );
}