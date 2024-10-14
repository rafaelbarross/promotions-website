// import { Outlet } from "react-router-dom";
// import Header from "./ui-demo/header";
// import { AuthContextProvider } from "@/contexts/authContext/authContext";
// import { GlobalContextProvider } from "@/contexts/globalContext/globalContext";
// import { ProductContextProvider } from "@/contexts/productContext/productContext";
// // import { NavBarMenu } from "./ui-demo/navbar-menu";
// import { Toaster } from "@/components/ui/toaster";
// import { Analytics } from "@vercel/analytics/react";
// import { ThemeProvider } from "@/components/theme-provider";
// export default function Layout() {
//   return (
//     <ProductContextProvider>
//       <GlobalContextProvider>
//         <AuthContextProvider>
//           <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
//             <Analytics />
//             <Toaster />
//             <Header />
//             <main className="container mx-auto ">
//               {/* <NavBarMenu/> */}
//               <Outlet />
//             </main>
//           </ThemeProvider>
//         </AuthContextProvider>
//       </GlobalContextProvider>
//     </ProductContextProvider>
//   );
// }
