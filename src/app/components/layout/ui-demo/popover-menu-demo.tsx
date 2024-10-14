"use client"

import { UseGlobal } from "@/app/contexts/globalContext/globalContext";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { LayoutGrid, Rows3, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";

export function PopoverMenuDemo() {
  const { selectedLayout, setSelectedLayout } = UseGlobal();
  const [isIconActive, setIsIconActive] = useState(false); // Initial state

  const handleClick = () => {
    setIsIconActive(!isIconActive); // Toggle state on click
  };

  // const [selectedLayout, setSelectedLayout] = useState<string>("grid"); // Initial layout

  useEffect(() => {
    const storedLayout = localStorage.getItem("selectedLayout");
    if (storedLayout) {
      setSelectedLayout(storedLayout);
    }
  }, []);

  const handleLayoutChange = (value: string) => {
    setSelectedLayout(value);
    localStorage.setItem("selectedLayout", value);
  };

  return (
    <Popover onOpenChange={handleClick}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          {!isIconActive ? <SlidersHorizontal size={16} /> : <X size={16} />}
        </Button>
      </PopoverTrigger>
      <PopoverContent forceMount side="bottom" align="end" className="w-fit">
        <div className="grid gap-4">
          <div className="space-y-4">
            <h4 className="font-medium leading-none">Opções</h4>

            <div className="flex items-center gap-5">
              <p className="text-sm text-muted-foreground">
                Modo de visualização
              </p>

              <div className=" p-0 h-fit flex gap-1 items-center">
                <Button
                  value={"grid"}
                  variant={selectedLayout === "grid" ? "default" : "outline"}
                  size="icon"
                  className="w-fit h-fit p-2"
                  onClick={() => handleLayoutChange("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  value={"list"}
                  variant={selectedLayout === "list" ? "default" : "outline"}
                  size="icon"
                  className="w-fit h-fit p-2"
                  onClick={() => handleLayoutChange("list")}
                >
                  <Rows3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
