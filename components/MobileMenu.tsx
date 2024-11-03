"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { navLinks } from "@/lib/navLinks";
import NavLink from "./ui/NavLink";
import { twMerge } from "tailwind-merge";
import Button from "./ui/Button";
import { signOutThenRedirect } from "@/actions/authActions";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  return (
    <div>
      <HamburgerMenuIcon
        className="relative z-50 size-5"
        onClick={() => setIsOpen(!isOpen)}
      />

      <div
        className={twMerge(
          "absolute left-0 top-0 z-40 h-screen w-screen translate-x-full bg-zinc-50 transition-transform duration-300 ease-out",
          isOpen && "translate-x-0",
          !isOpen && "hidden",
        )}
      >
        <ul className="mt-80 flex flex-col items-center justify-center gap-12 text-3xl font-bold uppercase">
          {navLinks.map((link, index) => (
            <li
              key={index}
              onClick={() => {
                setTimeout(() => {
                  setIsOpen(false);
                }, 300);
              }}
            >
              <NavLink link={link} />
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Button
            // className="absolute right-6 top-6"
            onClick={async () => {
              await signOutThenRedirect();
            }}
          >
            🚪 Déconnexion
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
