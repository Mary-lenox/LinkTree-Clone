"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const hideNavbarPaths = ["/generate"];

  const showNavbar = !hideNavbarPaths.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}
