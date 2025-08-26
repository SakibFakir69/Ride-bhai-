import Navbar from "@/components/Navbar";

import { Outlet } from "react-router";

import Footer from "./Footer";

function MainLayouts() {
  return (
    <div className="h-screen">
    
        <nav>
          <Navbar />
        </nav>

        <main className="">
          <Outlet />
          
        </main>
        <footer>
          <Footer/>
        </footer>

    </div>
  );
}

export default MainLayouts;
