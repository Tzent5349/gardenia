"use client";

import Link from "next/link"
import {usePathname } from "next/navigation";

import { cn } from "@/lib/utils"


export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: `/`,
      label: 'Home',
      active: pathname === `/`,
    },
    {
      href: `/`,
      label: 'Brands',
      active: pathname === `/ad`,
    },
    {
      href: `/`,
      label: 'Categories',
      active: pathname === `/a`,
    },

  ]

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6" , className)}
      {...props}
    >

    

      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-md font-semibold transition-colors hover:text-amber-400',
            route.active ? 'text-accent dark:text-accent' : 'text-primary'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};
