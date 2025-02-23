import Logo from "@/assets/icons/logo";
import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { PageSearch } from "../docs/page-search";

function Header() {
  return (
    <nav className=" sticky top-0 flex items-center justify-between py-4 px-8 border-b bg-background z-[999]">
      <Logo />
      <aside className="ml-auto flex items-center gap-4">
        <PageSearch />
        <ThemeToggle />
      </aside>
    </nav>
  );
}

export default Header;
