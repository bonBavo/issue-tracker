"use client";
import React from "react";
import Link from "next/link";
import { AiFillApple } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "dashboard", href: "/" },
    { label: "issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-4 border-b mb-5 px-5 h-16 items-center">
      <Link href="/">
        <AiFillApple />
      </Link>
      <ul className="flex space-x-4">
        {links.map((link) => (
          <Link
            key={link.href}
            className={classNames({
              "text-zinc-950": currentPath === link.href,
              "text-zinc-600": currentPath !== link.href,
              "hover:text-zinc-900 transition-colors": true,
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
