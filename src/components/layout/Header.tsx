"use client";

// Chadson v69.0.0: RC Performance Header Component
// This component displays the business logo and navigation links.

import React, { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-b-border/40 relative">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/blog" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "hover:text-primary transition-colors")}>
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/knowledge-base" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "hover:text-primary transition-colors")}>
                  Knowledge Base
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="tel:+18607755770" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "hover:text-primary transition-colors")}>
                  +1-860-775-5770
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="mailto:inquiries@rcperformance.shop" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "hover:text-primary transition-colors")}>
                  inquiries@rcperformance.shop
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-b-border/40 z-50">
          <NavigationMenu>
            <NavigationMenuList className="flex-col items-start p-4 space-y-2">
              <NavigationMenuItem className="w-full">
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink onClick={() => setIsMenuOpen(false)} className={cn(navigationMenuTriggerStyle(), "w-full justify-start hover:text-primary transition-colors")}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
             <NavigationMenuItem className="w-full">
               <Link href="/knowledge-base" legacyBehavior passHref>
                 <NavigationMenuLink onClick={() => setIsMenuOpen(false)} className={cn(navigationMenuTriggerStyle(), "w-full justify-start hover:text-primary transition-colors")}>
                   Knowledge Base
                 </NavigationMenuLink>
               </Link>
             </NavigationMenuItem>
             <NavigationMenuItem className="w-full">
               <Link href="tel:+18607755770" legacyBehavior passHref>
                  <NavigationMenuLink onClick={() => setIsMenuOpen(false)} className={cn(navigationMenuTriggerStyle(), "w-full justify-start hover:text-primary transition-colors")}>
                    +1-860-775-5770
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link href="mailto:inquiries@rcperformance.shop" legacyBehavior passHref>
                  <NavigationMenuLink onClick={() => setIsMenuOpen(false)} className={cn(navigationMenuTriggerStyle(), "w-full justify-start hover:text-primary transition-colors")}>
                    inquiries@rcperformance.shop
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </header>
  );
}