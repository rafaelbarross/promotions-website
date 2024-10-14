// "use client";

// import { Search } from "lucide-react";

// import {
//   AlertDialog,
//   // AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   // AlertDialogDescription,
//   // AlertDialogFooter,
//   AlertDialogHeader,
//   // AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// import { ArrowLeft } from "lucide-react";
// import { useEffect, useRef } from "react";
// import NavBarMenu from "./navbar-menu";
// // import { UseGlobal } from "@/contexts/globalContext/globalContext";
// import InputDemo from "./input-searh-demo";

// export function SearchModal() {
//   // const { search, setSearch } = UseGlobal();
//   // const { showLogo } = UseGlobal();
//   const inputRef = useRef<HTMLInputElement>(null);
//   // const [searchText, setSearchText] = useState("");

//   useEffect(() => {
//     if (inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, []); // Dependency array for useEffect

//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild className=" sm:hidden">
//         <Button variant="outline">
//           <Search size={16} />
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent className=" h-full px-0 max-w-full bg-gray-100">
//         <AlertDialogHeader className="p-0 flex items-center h-fit bg-red-600 fixed top-0 right-0 left-0">
//           <header
//             className={`px-4  flex h-20 w-full shrink-0 items-center md:px-8 justify-between  bg-white transition-all duration-300 ease-in-out  gap-5`}
//           >
//             <div>
//               <AlertDialogCancel className=" m-0">
//                 <ArrowLeft className="h-4 w-4" />
//               </AlertDialogCancel>
//             </div>

//             <div className="w-full relative flex justify-end">
//               {/* <Input
//                 // autoFocus={isExpanded}
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 autoFocus
//                 ref={inputRef}
//                 type="search"
//                 placeholder="Pesquisar produtos"
//                 // onBlur={() => setTimeout(() => setIsExpanded(false), 100)} // Delayed blur handling to prevent accidental collapse
//                 className={` rounded-md border border-neutral-300  py-2  text-sm focus:!ring-[1px] focus:!ring-neutral-300 focus:border-none  focus:outline-none duration-200 2 search-input pl-2 pr-9 sm:flex w-full truncate`}
//               />

//               <Search
//                 className={`h-4 w-4  absolute top-1/2 right-3 -translate-y-1/2`}
//               /> */}

//               <InputDemo />
//             </div>
//           </header>
//         </AlertDialogHeader>

//         {/* <div className="px-4 mt-16 overflow-auto h-full pb-10 w-full">
//           <ListProduct projects={filteredProducts} />
//         </div> */}
//         <div className="px-4 mt-16 overflow-auto h-full pb-10 w-full  container mx-auto">
//           <NavBarMenu />
//         </div>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
