import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";
import Footer from "./Footer";

function MainLayouts() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav>
        <Navbar />
      </nav>

      {/* Main content grows */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer stays at bottom */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayouts;
