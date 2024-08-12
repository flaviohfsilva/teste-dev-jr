"use client";

import styles from "./page.module.css";
import { Sidenav } from "./components/sidenav/Sidenav";
import { HomePage } from "./pages/home/Home";
import { AppContextProviders } from "./contexts/AppContext";


export default function Home() {
  return (
    <main className={styles.main}>
      {/* <AppContextProviders> */}
        <Sidenav></Sidenav>
        {/* ========== HOME AREA ========== */}
        <HomePage></HomePage>
      {/* </AppContextProviders> */}
      
    </main>
  );
}
