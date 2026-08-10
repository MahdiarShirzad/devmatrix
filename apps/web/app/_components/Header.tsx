"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import Image from "next/image";

import { useMe } from "@/hooks/useMe";
import { useLogout } from "@/hooks/useAuth";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: user, isLoading } = useMe();
  const logoutMutation = useLogout();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    window.location.href = "/";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl transition-all duration-500 ${
          isScrolled
            ? "w-[92%] rounded-2xl border border-white/10 bg-white/[0.03] px-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-xl md:w-[85%]"
            : "w-full border-transparent bg-transparent px-6"
        }`}
      >
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2">
            <Image src="/logo2.png" alt="logo" width={170} height={50} />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-[#e5e5e5] transition-colors hover:text-white"
            >
              Features
            </Link>
            <Link
              href="/docs"
              className="text-sm font-medium text-[#e5e5e5] transition-colors hover:text-white"
            >
              Docs
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-[#e5e5e5] transition-colors hover:text-white"
            >
              Pricing
            </Link>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            {isLoading ? (
              <div className="h-9 w-32 animate-pulse rounded-xl bg-white/10" />
            ) : user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-[#e5e5e5] transition-colors hover:text-white"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-white/10 hover:shadow-[0_0_20px_rgba(239,83,80,0.15)] active:scale-95"
                  disabled={logoutMutation.isPending}
                >
                  <LogOut size={16} />
                  {logoutMutation.isPending ? "Logging out..." : "Log out"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-[#e5e5e5] transition-colors hover:text-white"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl border border-transparent bg-[#fca311] px-5 py-2 text-sm font-bold text-black transition-all hover:bg-[#e89610] hover:shadow-[0_0_20px_rgba(252,163,17,0.3)] active:scale-95"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button
            className="flex items-center justify-center rounded-lg p-2 text-[#e5e5e5] transition-colors hover:bg-white/10 hover:text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`absolute left-4 right-4 top-20 overflow-hidden rounded-2xl border border-white/10 bg-[#000000]/90 px-6 backdrop-blur-2xl transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "visible max-h-[500px] py-6 opacity-100 shadow-2xl"
            : "invisible max-h-0 py-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4">
          <Link
            href="#features"
            className="text-base font-medium text-[#e5e5e5] hover:text-white"
          >
            Features
          </Link>
          <Link
            href="/docs"
            className="text-base font-medium text-[#e5e5e5] hover:text-white"
          >
            Docs
          </Link>
          <Link
            href="#"
            className="text-base font-medium text-[#e5e5e5] hover:text-white"
          >
            Pricing
          </Link>
          <div className="my-2 h-px w-full bg-white/10" />

          {isLoading ? (
            <div className="h-12 w-full animate-pulse rounded-xl bg-white/10" />
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-base font-medium text-[#e5e5e5] hover:text-white"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-sm font-medium text-white transition-colors hover:bg-red-500/20 hover:text-red-400"
                disabled={logoutMutation.isPending}
              >
                <LogOut size={18} />
                {logoutMutation.isPending ? "Logging out..." : "Log out"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-base font-medium text-[#e5e5e5] hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="mt-2 flex w-full justify-center rounded-xl bg-[#fca311] py-3 text-sm font-bold text-black hover:bg-[#e89610] transition-colors"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
