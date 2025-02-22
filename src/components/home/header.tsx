import Logo from "@/assets/icons/logo";
import React from "react";
import { ThemeToggle } from "./theme-toggle";

function Header() {
  return (
    <nav className="flex items-center justify-between py-4 px-8">
      <Logo />
      <ThemeToggle />
    </nav>
  );
}

export default Header;
