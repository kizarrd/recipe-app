import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="font-sans bg-neutral-900">
      {/* <Header /> */}
      <Outlet />
      {/* <Footer /> */}
    </div>
    // <div className="flex= flex-col md:flex-row md:overflow-hidden">
    //   <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
    //     <Outlet />
    //   </div>
    // </div>
  );
}

export default RootLayout;
