import Logo from "@/assets/icons/logo";
import React from "react";
import { ThemeToggle } from "./theme-toggle";

function Header() {
  return (
    <nav className=" sticky top-0 flex items-center justify-between py-4 px-8 border-b bg-background z-[9999]">
      <Logo />
      <ThemeToggle />
    </nav>
  );
}

export default Header;
