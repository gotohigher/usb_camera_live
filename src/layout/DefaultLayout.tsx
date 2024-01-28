import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden h-screen justify-between">
          <Header />
          <main className="flex-1 h-full">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 h-full">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
