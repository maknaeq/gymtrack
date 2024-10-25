import React from "react";
import Logo from "@/public/images/Logo.png";
import Image from "next/image";
import Link from "next/link";
import { ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { auth, signOut } from "@/auth";
import Button from "@/components/ui/Button";

const navLinks = [
  { title: "Séances", href: "/sessions" },
  { title: "Performances", href: "/performances" },
  { title: "Goals", href: "/goals" },
];

async function Header() {
  const session = await auth();
  return (
    <header className="flex items-center justify-between px-8 py-4">
      <Link href={"/"} className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100">
          <Image src={Logo} alt="Logo" className="size-7" />
        </div>
        <h1 className="font-bold text-blue-500">Gymtrack</h1>
      </Link>
      {session ? (
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
      ) : (
        <div></div>
      )}
      <nav className="block md:hidden">
        <HamburgerMenuIcon className="size-5" />
      </nav>
      {session ? (
        <div className="hidden cursor-pointer items-center gap-2 md:flex">
          <div
            className="avatar placeholder dropdown dropdown-end size-10"
            tabIndex={0}
          >
            <div className="rounded-full bg-zinc-100 ring-offset-2 ring-offset-base-100 transition-all ease-out hover:ring hover:ring-primary">
              {/* <Image
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="avatar"
                height={40}
                width={40}
              /> */}
              <span>{session.user?.name?.charAt(0)}</span>
            </div>
            <form
              className="menu dropdown-content z-[1] rounded-box border bg-base-100 p-1"
              tabIndex={0}
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button
                type="submit"
                variant="ghost"
                className="flex items-center gap-2 rounded-box p-3 hover:bg-zinc-50"
              >
                <ExitIcon /> Déconnexion
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="hidden md:block"></div>
      )}
    </header>
  );
}

export default Header;
