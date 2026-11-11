"use client";

import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Heart, LayoutDashboard, Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import porchlightLogo from "@/public/lic-porchlight-logo.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Disable sticky header on pricing page to prevent z-index conflicts with Clerk's PricingTable
  const isPricingPage = pathname === "/pricing";

  return (
    <header
      className={
        isPricingPage
          ? "w-full border-b border-border/50 bg-background"
          : "sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      }
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-80"
          >
            <Image
              src={porchlightLogo}
              alt="LIC Porchlight"
              sizes="(min-width: 1024px) 224px, (min-width: 640px) 192px, 176px"
              className="h-auto w-44 sm:w-48 lg:w-56"
              loading="eager"
            />
          </Link>

          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            <Link
              href="/properties"
              className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-accent transition-[color,background-color] duration-200"
            >
              Browse Properties
            </Link>
            <Show when="signed-in">
              <Show
                when={{ plan: "agent" }}
                fallback={
                  <Link
                    href="/pricing"
                    className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-accent transition-[color,background-color] duration-200"
                  >
                    Become an Agent
                  </Link>
                }
              >
                <Link
                  href="/dashboard"
                  className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-accent transition-[color,background-color] duration-200"
                >
                  Dashboard
                </Link>
              </Show>
            </Show>
            <Show when="signed-out">
              <Link
                href="/pricing"
                className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-lg hover:text-foreground hover:bg-accent transition-[color,background-color] duration-200"
              >
                Become an Agent
              </Link>
            </Show>
          </nav>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          <Show when="signed-in">
            <Link
              href="/saved"
              aria-label="Saved properties"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-[color,background-color] duration-200"
            >
              <Heart className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/profile"
              aria-label="My profile"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-[color,background-color] duration-200"
            >
              <User className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Show when={{ plan: "agent" }}>
              <Link
                href="/dashboard"
                aria-label="Agent dashboard"
                className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-[color,background-color] duration-200"
              >
                <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
              </Link>
            </Show>
            <div className="ml-2">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
            </div>
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button size="sm">Get Started</Button>
            </SignUpButton>
          </Show>
        </div>

        {/* Mobile Menu */}
        <div className="flex md:hidden items-center gap-2">
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </Show>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isOpen}
                />
              }
            >
              {isOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[350px] overscroll-contain"
            >
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src={porchlightLogo}
                    alt="LIC Porchlight"
                    sizes="192px"
                    className="h-auto w-48"
                  />
                </SheetTitle>
              </SheetHeader>
              <nav
                className="flex flex-col gap-2 mt-8"
                aria-label="Mobile navigation"
              >
                <Link
                  href="/properties"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg hover:bg-accent transition-[background-color] duration-200"
                >
                  Browse Properties
                </Link>
                <Show when="signed-in">
                  <Show
                    when={{ plan: "agent" }}
                    fallback={
                      <Link
                        href="/pricing"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg hover:bg-accent transition-[background-color] duration-200"
                      >
                        Become an Agent
                      </Link>
                    }
                  >
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg hover:bg-accent transition-[background-color] duration-200"
                    >
                      <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
                      Agent Dashboard
                    </Link>
                  </Show>
                </Show>
                <Show when="signed-out">
                  <Link
                    href="/pricing"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg hover:bg-accent transition-[background-color] duration-200"
                  >
                    Become an Agent
                  </Link>
                </Show>
                <Show when="signed-in">
                  <div className="h-px bg-border my-2" />
                  <Link
                    href="/saved"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg hover:bg-accent transition-[background-color] duration-200"
                  >
                    <Heart className="h-5 w-5" aria-hidden="true" />
                    Saved Properties
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg hover:bg-accent transition-[background-color] duration-200"
                  >
                    <User className="h-5 w-5" aria-hidden="true" />
                    My Profile
                  </Link>
                </Show>
                <Show when="signed-out">
                  <div className="h-px bg-border my-2" />
                  <div className="flex flex-col gap-2 px-4 mt-2">
                    <SignInButton mode="modal">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                      >
                        Get Started
                      </Button>
                    </SignUpButton>
                  </div>
                </Show>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
