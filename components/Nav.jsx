"use client";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { SignIn, SignInButton } from "@clerk/clerk-react";

export default function Nav() {
  return (
    <nav className="fixed w-full py-4 border-b-[0.7px] z-40 border-black bg-theme-yellow">
      <div className="flex items-center justify-between px-4 md:px-16 ">
        <Link href="/">
          <Image
            width={124}
            height={40}
            src="/medium.png"
            className="w-24 h-4"
            alt="logo"
          />
        </Link>
        {/* <button onClick={() => signIn()}>Sign in</button> */}
        <div className="flex items-center gap-6">
          <SignedIn>
            <>
              <Link href="/dashboard" className="btn btn-primary">
                Dashboard
              </Link>
              <Link href="/profile" className="btn btn-primary">
                Profile
              </Link>
              <Link href="/write" className="hidden btn btn-primary md:block">
                Write
              </Link>

              <Link
                href="/dashboard"
                className="flex items-center justify-center w-6 h-6 text-white bg-black rounded-full btn btn-primary"
              >
                <UserButton afterSignOutUrl="/" />
              </Link>
            </>
          </SignedIn>

          <SignedOut>
            <>
              <Link
                href="/our-story"
                className="hidden btn btn-primary md:block"
              >
                Our Story
              </Link>
              <Link
                href="/membership"
                className="hidden btn btn-primary md:block"
              >
                Membership
              </Link>
              <Link href="/write" className="hidden btn btn-primary md:block">
                Write
              </Link>

              <SignInButton>
                <button className="hidden btn btn-secondary md:block">
                  Sign in
                </button>
              </SignInButton>
              <SignInButton>
                <button
                  onCanPlay={SignIn}
                  className="px-2 py-1 text-base text-white bg-black rounded-full md:px-6 md:py-2 btn btn-primary"
                >
                  Get Started
                </button>
              </SignInButton>
            </>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}
