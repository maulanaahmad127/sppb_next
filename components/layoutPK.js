import styles from '../styles/Home.module.css';
import NavbarPK from './navbarPK';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <>
    <NavbarPK />
    <div className={styles.container}>
        {children}
    </div>


    <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
      
    </>
    );
}