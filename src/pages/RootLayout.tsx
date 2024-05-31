import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="font-sans">
      {/* <Header /> */}
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
    // <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
    //   <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
    //     <Outlet />
    //   </div>
    // </div>
  );
}

export default RootLayout;
