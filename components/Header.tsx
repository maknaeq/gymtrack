import React from "react";
import Logo from "@/public/images/Logo.png";
import Image from "next/image";
import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

const navLinks = [
  { title: "Séance", href: "/workout" },
  { title: "Performances", href: "/performances" },
  { title: "Goals", href: "/goals" },
];

function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <Link href={"/"} className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100">
          <Image src={Logo} alt="Logo" className="size-7" />
        </div>
        <h1 className="font-bold text-blue-500">Gymtrack</h1>
      </Link>
      <nav className="hidden w-80 items-center justify-between md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="rounded-md underline-offset-4 hover:underline"
          >
            {link.title}
          </Link>
        ))}
      </nav>
      <nav className="block md:hidden">
        <HamburgerMenuIcon className="size-5" />
      </nav>
      <div className="hidden md:block">
        <div className="avatar size-10">
          <div className="w-24 rounded-full ring-offset-2 ring-offset-base-100 transition-all ease-out hover:ring hover:ring-primary">
            <Image
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="avatar"
              height={40}
              width={40}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
