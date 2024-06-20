import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import { Toaster } from "../components/ui/toaster";

function RootLayout() {
  return (
    // <div className="font-sans bg-background min-h-screen">
    <div className="font-sans bg-background">
      <Toaster />
      <Nav />
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
