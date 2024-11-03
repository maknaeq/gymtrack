"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

function NavLink({ link }: { link: { title: string; href: string } }) {
  const pathname = usePathname();

  return (
    <Link
      key={link.title}
      href={link.href}
      className={twMerge(
        "rounded-md underline-offset-8 hover:underline",
        pathname.includes(link.href) && "text-blue-500 underline",
      )}
    >
      {link.title}
    </Link>
  );
}

export default NavLink;
