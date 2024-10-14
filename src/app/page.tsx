import { Suspense } from "react";
import NavBarMenu from "./components/layout/ui-demo/navbar-menu";
import { Spinner } from "./components/layout/ui-demo/spinner";

export default function Home() {
  return (
    <Suspense fallback={<Spinner className="fixed  left-[50%] top-[50%]" />}>
      <NavBarMenu />
    </Suspense>
  );
}
