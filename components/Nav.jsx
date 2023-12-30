import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
export default async function Nav() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isLogged = await isAuthenticated();
  const user = await getUser();
  return (
    <nav className="fixed w-full py-4 border-b-[0.7px] border-black bg-theme-yellow">
      <div className="flex items-center justify-between px-4 md:px-16 ">
        <Image
          width={124}
          height={40}
          src="/medium.png"
          className="w-24 h-4"
          alt="logo"
        />
        <div className="flex items-center gap-6">
          {isLogged ? (
            <>
              <Link href="/dashboard" className="btn btn-primary">
                Dashboard
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center justify-center w-6 h-6 text-white bg-black rounded-full btn btn-primary"
              >
                {user?.given_name[0]}
              </Link>
            </>
          ) : (
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

              <LoginLink className="hidden btn btn-secondary md:block">
                Sign in
              </LoginLink>
              <Link
                href="/write"
                className="px-2 py-1 text-base text-white bg-black rounded-full md:px-6 md:py-2 btn btn-primary"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
