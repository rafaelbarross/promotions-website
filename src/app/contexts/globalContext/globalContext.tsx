"use client";

import { createContext, useContext, useState } from "react";

interface Props {
  search: string;
  setSearch: (search: string) => void;
  selectedLayout: string;
  setSelectedLayout: (selectedLayout: string) => void;
  showLogo: boolean;
  setShowLogo: (showLogo: boolean) => void;
  showLogoBar: boolean;
  setShowLogoBar: (showLogo: boolean) => void;
}

const GlobalContext = createContext<Props>({} as Props);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState("");
  const [showLogo, setShowLogo] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState("grid"); // Initial layout
  // console.log("Valor:", search);
  const [showLogoBar, setShowLogoBar] = useState(false);

  const value = {
    search,
    setSearch,
    selectedLayout,
    setSelectedLayout,
    showLogo,
    setShowLogo,
    showLogoBar,
    setShowLogoBar,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const UseGlobal = () => {
  return useContext(GlobalContext);
};
