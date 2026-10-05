"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { navItems } from "@/lib/nav";
import { cn } from "cn";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="font-heading text-sm font-semibold tracking-tight">
          Target
        </Link>
        <NavigationMenu aria-label="Principal" className="flex-none">
          <NavigationMenuList className="flex-wrap justify-end gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <NavigationMenuItem key={item.href}>
                 <NavigationMenuLink
    active={isActive} 
    render={<Link href={item.href} />} 
    className={navigationMenuTriggerStyle()} 
  >
    {item.label}
  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
